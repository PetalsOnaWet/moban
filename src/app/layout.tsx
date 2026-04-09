import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { getThemeVariables, ThemeName } from "@/config/theme-manager";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#08090a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@yourusername",
  },
  alternates: {
    canonical: siteConfig.url.endsWith("/") ? siteConfig.url : `${siteConfig.url}/`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeVars = getThemeVariables(siteConfig.theme as ThemeName);

  return (
    <html lang="zh-CN">
      <head>
        <style dangerouslySetInnerHTML={{ __html: `:root { ${themeVars} }` }} />
        {/* Tracking Scripts */}
        {siteConfig.analytics.google && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.analytics.google}`}></script>
            <script id="ga-init" dangerouslySetInnerHTML={{ __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${siteConfig.analytics.google}');
            `}} />
          </>
        )}
        {siteConfig.analytics.clarity && (
          <script id="clarity-init" dangerouslySetInnerHTML={{ __html: `
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${siteConfig.analytics.clarity}");
          `}} />
        )}
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
