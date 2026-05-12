#!/usr/bin/env tsx
// scripts/sync-data.ts
// Fetches GitHub + WakaTime + last.fm stats and writes to data/stats.json
// Run: pnpm tsx scripts/sync-data.ts

import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const GITHUB_USERNAME = process.env.GITHUB_USERNAME ?? "alealandreev";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? "";
const WAKATIME_API_KEY = process.env.WAKATIME_API_KEY ?? "";
const LASTFM_API_KEY = process.env.LASTFM_API_KEY ?? "";
const LASTFM_USERNAME = process.env.LASTFM_USERNAME ?? "alealandreev";

async function fetchGitHub() {
  if (!GITHUB_TOKEN) {
    console.warn("[sync] No GITHUB_TOKEN — skipping GitHub stats");
    return null;
  }

  const headers = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
  };

  const [user, repos] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers }).then(
      (r) => r.json()
    ),
    fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`,
      { headers }
    ).then((r) => r.json()),
  ]);

  const totalStars = Array.isArray(repos)
    ? (repos as Array<{ stargazers_count: number }>).reduce(
        (sum, r) => sum + r.stargazers_count,
        0
      )
    : 0;

  return {
    repos: user.public_repos ?? 0,
    followers: user.followers ?? 0,
    stars: totalStars,
    updated_at: new Date().toISOString(),
  };
}

async function fetchWakaTime() {
  if (!WAKATIME_API_KEY) {
    console.warn("[sync] No WAKATIME_API_KEY — skipping");
    return null;
  }

  const res = await fetch(
    `https://wakatime.com/api/v1/users/current/stats/last_year?api_key=${WAKATIME_API_KEY}`
  );
  if (!res.ok) return null;

  const data = (await res.json()) as {
    data: {
      total_seconds: number;
      languages: Array<{ name: string; percent: number }>;
    };
  };

  return {
    hours_this_year: Math.round(data.data.total_seconds / 3600),
    top_languages: data.data.languages.slice(0, 6).map((l) => ({
      name: l.name,
      percent: Math.round(l.percent),
    })),
    updated_at: new Date().toISOString(),
  };
}

async function main() {
  const [github, wakatime] = await Promise.all([
    fetchGitHub(),
    fetchWakaTime(),
  ]);

  const stats = {
    github: github ?? { repos: 0, followers: 0, stars: 0, updated_at: null },
    wakatime: wakatime ?? { hours_this_year: 0, top_languages: [], updated_at: null },
    generated_at: new Date().toISOString(),
  };

  mkdirSync(join(process.cwd(), "data"), { recursive: true });
  writeFileSync(
    join(process.cwd(), "data/stats.json"),
    JSON.stringify(stats, null, 2)
  );

  console.log("[sync] data/stats.json written:", JSON.stringify(stats, null, 2));
}

main().catch((err) => {
  console.error("[sync] Fatal:", err);
  process.exit(1);
});
