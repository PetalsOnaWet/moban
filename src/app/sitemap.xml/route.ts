import { siteConfig } from "@/config/site";

/**
 * 动态 Sitemap 生成器 (Next.js 16 App Router)
 * -----------------------------------------
 * 此路由将生成符合 Google 规范的 sitemap.xml
 */
export async function GET() {
  const staticPages = ["", "/features", "/wiki", "/faq"];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
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
