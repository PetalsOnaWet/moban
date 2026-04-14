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
    "url": `${siteConfig.url}/game/${game.slug}`,
    "image": game.thumbnail,
    "author": {
      "@type": "Organization",
      "name": siteConfig.name
    },
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
