import { siteConfig } from "@/config/site";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
}

export function SEOHead({ title, description, canonical }: SEOProps) {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const fullDescription = description || siteConfig.description;
  const url = canonical || siteConfig.url;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={siteConfig.keywords.join(", ")} />
      
      {/* Canonical URL (SEO Expert requirement: end with trailing slash) */}
      <link rel="canonical" href={url.endsWith("/") ? url : `${url}/`} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={siteConfig.ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={siteConfig.ogImage} />

      {/* Tracking Scripts (Config-driven) */}
      {siteConfig.analytics.google && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.analytics.google}`}></script>
          <script dangerouslySetInnerHTML={{ __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${siteConfig.analytics.google}');
          `}} />
        </>
      )}

      {siteConfig.analytics.clarity && (
        <script dangerouslySetInnerHTML={{ __html: `
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${siteConfig.analytics.clarity}");
        `}} />
      )}

      {/* AdSense (Config-driven) */}
      {siteConfig.monetization.adsense.client && (
        <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.monetization.adsense.client}`} crossOrigin="anonymous"></script>
      )}
    </>
  );
}
