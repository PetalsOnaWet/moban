import { getGamesByTag } from "@/lib/core/games";
import { GameGrid } from "@/components/games/GameGrid";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Metadata } from "next";


export const runtime = "edge";
export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const decodedTag = decodeURIComponent(slug);
  return {
    title: `Play ${decodedTag} Games Online`,
    description: `Explore the best online games tagged with ${decodedTag}. Free unblocked games for everyone.`,
  };
}

export default async function TagPage({ params }: Props) {
  const { slug } = await params;
  const decodedTag = decodeURIComponent(slug);
  const games = await getGamesByTag(decodedTag);

  return (
    <div className="animate-fade-in" style={{ padding: '2rem 0' }}>
      <div className="util-container">
        <Breadcrumbs items={[{ label: `Tag: ${decodedTag}` }]} />

        <div style={{ marginBottom: '48px' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '12px' }}>#{decodedTag} Games</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: '800px' }}>
            All games tagged with <span style={{ color: 'var(--accent-violet)' }}>{decodedTag}</span>. 
            Enjoy our collection of highly-rated games in this niche.
          </p>
        </div>

        {games.length > 0 ? (
          <GameGrid games={games} />
        ) : (
          <div className="util-card util-flex-center" style={{ padding: '80px 0', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-tertiary)' }}>No games found with this tag yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
