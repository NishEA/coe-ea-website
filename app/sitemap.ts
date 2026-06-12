import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://coe-ea-website.vercel.app";

  const routes = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/startup-program", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/apply", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/events", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/governance", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/book", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  return routes.map((r) => ({
    url: `${base}${r.url}`,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
