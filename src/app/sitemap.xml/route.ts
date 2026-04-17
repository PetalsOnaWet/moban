import { siteConfig } from "@/config/site";
import gamesData from "@/config/games-data.json";

export async function GET() {
  const staticPages = ["", "/features", "/wiki", "/faq"];
  const dynamicPages = gamesData.map(game => `/game/${game.slug}`);
  const allPages = [...staticPages, ...dynamicPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages
    .map((page) => {
      const url = `${siteConfig.url}${page}${page.endsWith("/") ? "" : "/"}`;
      return `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${page === "" ? "1.0" : "0.8"}</priority>
  </url>`;
    })
    .join("")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
