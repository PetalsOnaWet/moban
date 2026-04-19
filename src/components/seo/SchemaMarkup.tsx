import { Game } from "@/lib/core/games";
import { siteConfig } from "@/config/site";

interface GameSchemaProps {
  game: Game;
}

export function GameSchema({ game }: GameSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": game.title,
    "description": game.description,
    "applicationCategory": "Game",
    "operatingSystem": "Web, Browser",
    "url": `${siteConfig.url}/${game.slug}`,
    "image": game.screenshots && game.screenshots.length > 0 
      ? [game.thumbnail, ...game.screenshots.map(s => `${siteConfig.url}${s}`)]
      : game.thumbnail,
    "author": {
      "@type": "Organization",
      "name": siteConfig.name
    },
    ...(game.expert_tips ? {
      "review": {
        "@type": "Review",
        "reviewBody": game.expert_tips,
        "author": { "@type": "Person", "name": "Editor" }
      }
    } : {}),
    // Only include rating if there are votes to avoid validation warnings
    ...(game.votes && game.votes > 0 ? {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": game.rating,
        "ratingCount": game.votes,
        "bestRating": "5",
        "worstRating": "1"
      }
    } : {})
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; item: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${siteConfig.url}${item.item}`
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "logo": `${siteConfig.url}/logo.png`,
    "sameAs": [
      siteConfig.links.twitter,
      siteConfig.links.github,
      siteConfig.links.discord
    ].filter(Boolean)
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteConfig.url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
