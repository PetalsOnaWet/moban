import { siteConfig } from "@/config/site";
import Script from "next/script";

export function GoogleAnalytics() {
  if (!siteConfig.analytics.google) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.analytics.google}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${siteConfig.analytics.google}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
