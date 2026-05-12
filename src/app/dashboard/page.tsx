import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Public stats — GitHub activity, writing output, coding hours.",
};

// In production: fetched from GitHub/WakaTime APIs via ISR (revalidate: 3600)
// For now: placeholder structure to validate the UI
const STATS = {
  github: {
    repos: 42,
    stars: 128,
    contributions_this_year: 847,
    followers: 63,
  },
  writing: {
    total_posts: 1,
    total_tils: 1,
    total_words: 800,
  },
  wakatime: {
    hours_this_year: 1240,
    top_languages: [
      { name: "Python", percent: 48 },
      { name: "SQL", percent: 22 },
      { name: "TypeScript", percent: 14 },
      { name: "Scala", percent: 11 },
      { name: "YAML", percent: 5 },
    ],
  },
};

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div
      style={{ border: "1px solid var(--border)", borderRadius: "6px" }}
      className="p-4"
    >
      <div
        style={{ color: "var(--fg-muted)", fontFamily: "var(--font-mono)" }}
        className="text-xs uppercase tracking-widest"
      >
        {label}
      </div>
      <div
        style={{ color: "var(--fg)", fontFamily: "var(--font-mono)" }}
        className="mt-1 text-2xl font-semibold tabular-nums"
      >
        {value}
      </div>
      {sub && (
        <div
          style={{ color: "var(--fg-muted)" }}
          className="mt-0.5 text-xs"
        >
          {sub}
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1
        style={{ color: "var(--fg)", fontFamily: "var(--font-mono)" }}
        className="text-sm font-semibold uppercase tracking-widest"
      >
        Dashboard
      </h1>
      <p style={{ color: "var(--fg-muted)" }} className="mt-2 text-sm">
        Public stats, updated daily via GitHub Actions.
      </p>

      {/* GitHub */}
      <section className="mt-10">
        <h2
          style={{
            color: "var(--fg)",
            fontFamily: "var(--font-mono)",
            borderBottom: "1px solid var(--border)",
          }}
          className="mb-4 pb-1 text-xs font-semibold uppercase tracking-widest"
        >
          GitHub
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="Repos" value={STATS.github.repos} />
          <StatCard label="Stars" value={STATS.github.stars} />
          <StatCard
            label="Contributions"
            value={STATS.github.contributions_this_year}
            sub="this year"
          />
          <StatCard label="Followers" value={STATS.github.followers} />
        </div>
      </section>

      {/* Writing */}
      <section className="mt-10">
        <h2
          style={{
            color: "var(--fg)",
            fontFamily: "var(--font-mono)",
            borderBottom: "1px solid var(--border)",
          }}
          className="mb-4 pb-1 text-xs font-semibold uppercase tracking-widest"
        >
          Writing
        </h2>
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="Posts" value={STATS.writing.total_posts} />
          <StatCard label="TIL" value={STATS.writing.total_tils} />
          <StatCard
            label="Words"
            value={STATS.writing.total_words.toLocaleString()}
            sub="published"
          />
        </div>
      </section>

      {/* Coding time */}
      <section className="mt-10">
        <h2
          style={{
            color: "var(--fg)",
            fontFamily: "var(--font-mono)",
            borderBottom: "1px solid var(--border)",
          }}
          className="mb-4 pb-1 text-xs font-semibold uppercase tracking-widest"
        >
          Coding time (WakaTime)
        </h2>

        <div className="mb-4">
          <StatCard
            label="Hours this year"
            value={STATS.wakatime.hours_this_year.toLocaleString()}
            sub="via WakaTime"
          />
        </div>

        <div
          style={{ border: "1px solid var(--border)", borderRadius: "6px" }}
          className="p-4"
        >
          <div
            style={{ color: "var(--fg-muted)", fontFamily: "var(--font-mono)" }}
            className="mb-3 text-xs uppercase tracking-widest"
          >
            Top languages
          </div>
          <div className="space-y-2.5">
            {STATS.wakatime.top_languages.map(({ name, percent }) => (
              <div key={name}>
                <div className="flex justify-between text-xs mb-1">
                  <span
                    style={{
                      color: "var(--fg)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {name}
                  </span>
                  <span
                    style={{
                      color: "var(--fg-muted)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {percent}%
                  </span>
                </div>
                <div
                  style={{
                    background: "var(--border)",
                    borderRadius: "2px",
                    height: "4px",
                  }}
                >
                  <div
                    style={{
                      background: "var(--accent)",
                      width: `${percent}%`,
                      height: "100%",
                      borderRadius: "2px",
                      transition: "width 0.6s ease",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <p
        style={{ color: "var(--fg-muted)", fontFamily: "var(--font-mono)" }}
        className="mt-8 text-xs"
      >
        // data is placeholder — wire up GitHub Actions ETL to populate
        real-time stats
      </p>
    </div>
  );
}
