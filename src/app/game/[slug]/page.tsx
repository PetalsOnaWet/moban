import { getGameBySlug, getRelatedGames } from "@/lib/core/games";
import { GameIframe } from "@/components/games/GameIframe";
import { GameGrid } from "@/components/games/GameGrid";
import { VoteSection } from "@/components/games/VoteSection";
import { CommentSection } from "@/components/games/CommentSection";
import { getPageStats, getComments } from "@/lib/core/actions";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { TagCloud } from "@/components/games/TagCloud";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { Star } from "lucide-react";

export const runtime = "edge";
export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = await getGameBySlug(slug);

  if (!game) return { title: "Game Not Found" };

  return {
    title: `${game.title} - Play Online`,
    description: game.description,
    openGraph: {
      title: game.title,
      description: game.description,
      images: [game.thumbnail],
    },
  };
}

export default async function GamePage({ params }: Props) {
  const { slug } = await params;
  const game = await getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  const relatedGames = await getRelatedGames(game.slug, game.category);
  const stats = await getPageStats(game.slug);
  const comments = await getComments(game.slug);

  // JSON-LD for Google Rich Snippets (AggregateRating)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": game.title,
    "description": game.description,
    "image": game.thumbnail,
    "url": `https://yourdomain.com/game/${game.slug}`,
    "genre": game.category,
    "aggregateRating": stats.total > 0 ? {
      "@type": "AggregateRating",
      "ratingValue": stats.avgRating?.toFixed(1) || "5.0",
      "bestRating": "5",
      "ratingCount": stats.total || "1"
    } : {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "bestRating": "5",
      "ratingCount": "1"
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '2rem 0' }}>
      <div className="util-container">
        <Breadcrumbs items={[
          { label: game.category, href: `/category/${encodeURIComponent(game.category)}` },
          { label: game.title }
        ]} />

        <div className="util-grid" style={{ gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '32px', alignItems: 'start' }}>
          {/* Main Content */}
          <main style={{ minWidth: 0 }}>
            {/* JSON-LD Structured Data */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <GameIframe title={game.title} url={game.iframe_url} />
            
            <div style={{ marginTop: '32px' }}>
              <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{game.title}</h1>
              <div className="util-flex" style={{ gap: '24px', alignItems: 'center', marginBottom: '32px' }}>
                <div style={{ color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Star size={20} fill="currentColor" />
                  <span style={{ fontWeight: 600, fontSize: '18px' }}>{stats.avgRating?.toFixed(1) || "5.0"}</span>
                  <span style={{ color: 'var(--text-tertiary)', fontSize: '14px', fontWeight: 400 }}>({stats.total} votes)</span>
                </div>
                <div style={{ color: 'var(--text-tertiary)', fontSize: '14px' }}>
                  Category: <Link href={`/category/${encodeURIComponent(game.category)}`} style={{ color: 'var(--accent-violet)', fontWeight: 510 }}>{game.category}</Link>
                </div>
              </div>
              
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', lineHeight: 1.6 }}>
                {game.description}
              </p>

              <TagCloud tags={game.tags} />
              
              <div className="util-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', margin: '48px 0' }}>
                <VoteSection pageId={game.slug} initialStats={stats} />
                <div className="util-card" style={{ background: 'var(--bg-panel)' }}>
                  <h2 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>How to Play</h2>
                  <p style={{ color: 'var(--text-tertiary)', fontSize: '14px', lineHeight: 1.6 }}>
                    Use your mouse or keyboard controls as specified within the game iframe. 
                    Most rhythm-based games use Space or Left Click to jump. 
                    For better performance, we recommend using a modern browser and keeping the game in focus.
                  </p>
                </div>
              </div>

              {/* Discussion Section */}
              <CommentSection pageId={game.slug} initialComments={comments} />
            </div>
          </main>

          {/* Sidebar */}
          <aside>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>Related Games</h2>
            <div className="util-grid" style={{ gridTemplateColumns: '1fr', gap: '20px' }}>
              {relatedGames.map(related => (
                <a key={related.id} href={`/game/${related.slug}`} className="util-flex" style={{ gap: '12px', padding: '8px', borderRadius: 'var(--radius-m)', transition: 'background 0.2s' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={related.thumbnail} alt={related.title} style={{ width: '80px', height: '60px', borderRadius: '4px', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 510, color: 'var(--text-primary)', marginBottom: '4px' }}>{related.title}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{related.category}</div>
                  </div>
                </a>
              ))}
            </div>
          </aside>
        </div>

        {/* Discovery Grid Below */}
        <div style={{ marginTop: '64px', borderTop: '1px solid var(--border-standard)', paddingTop: '48px' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '32px' }}>More Games You Might Like</h2>
          <GameGrid games={relatedGames} />
        </div>
      </div>
    </div>
  );
}
