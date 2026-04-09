import { getGamesByCategory } from "@/lib/core/games";
import { GameGrid } from "@/components/games/GameGrid";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  return {
    title: `${decodedSlug} Games - Play Online for Free`,
    description: `Browse our collection of ${decodedSlug} games. Play the best ${decodedSlug} games unblocked in your browser.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const games = await getGamesByCategory(decodedSlug);

  return (
    <div className="animate-fade-in" style={{ padding: '2rem 0' }}>
      <div className="util-container">
        <Breadcrumbs items={[{ label: decodedSlug }]} />

        <div style={{ marginBottom: '48px' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '12px' }}>{decodedSlug} Games</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '800px' }}>
            Discover the best {decodedSlug} games available online. From classic favorites to the latest hits, 
            explore our curated collection and start playing instantly.
          </p>
        </div>

        {games.length > 0 ? (
          <GameGrid games={games} />
        ) : (
          <div className="util-card util-flex-center" style={{ padding: '80px 0', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-tertiary)' }}>No games found in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
