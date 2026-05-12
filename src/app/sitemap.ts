import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://persistentengineer.com";

const POST_SLUGS = ["hello-world"];
const TIL_SLUGS = ["duckdb-httpfs-pushdown"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, priority: 1.0, changeFrequency: "monthly" },
    { url: `${SITE_URL}/about`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${SITE_URL}/writing`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${SITE_URL}/til`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${SITE_URL}/projects`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${SITE_URL}/now`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${SITE_URL}/uses`, priority: 0.5, changeFrequency: "yearly" },
    { url: `${SITE_URL}/cv`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${SITE_URL}/dashboard`, priority: 0.4, changeFrequency: "daily" },
  ];

  const postRoutes: MetadataRoute.Sitemap = POST_SLUGS.map((slug) => ({
    url: `${SITE_URL}/writing/${slug}`,
    priority: 0.7,
    changeFrequency: "monthly",
  }));

  const tilRoutes: MetadataRoute.Sitemap = TIL_SLUGS.map((slug) => ({
    url: `${SITE_URL}/til/${slug}`,
    priority: 0.5,
    changeFrequency: "never",
  }));

  return [...staticRoutes, ...postRoutes, ...tilRoutes];
}
