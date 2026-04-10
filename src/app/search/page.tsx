import { searchGames } from "@/lib/core/games";
import { GameGrid } from "@/components/games/GameGrid";
import { SearchBox } from "@/components/games/SearchBox";
import { Metadata } from "next";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ q?: string }> }): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Search results for "${q}"` : "Search Games",
    description: `Search for your favorite games and play online for free.`,
  };
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const query = q || "";
  const results = query ? await searchGames(query) : [];

  return (
    <div className="animate-fade-in" style={{ padding: '4rem 0' }}>
      <div className="util-container">
        <div className="util-flex-center" style={{ flexDirection: 'column', marginBottom: '64px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '24px' }}>Search Games</h1>
          <SearchBox className="hero-search" placeholder="Enter game name..." />
        </div>

        {query ? (
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '32px', color: 'var(--text-secondary)' }}>
              Showing results for &quot;<span style={{ color: 'var(--text-primary)' }}>{query}</span>&quot; ({results.length})
            </h2>
            {results.length > 0 ? (
              <GameGrid games={results} />
            ) : (
              <div className="util-card util-flex-center" style={{ padding: '80px 0', textAlign: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>No games found</h3>
                  <p style={{ color: 'var(--text-tertiary)' }}>Try another keyword or category.</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="util-flex-center" style={{ padding: '80px 0' }}>
            <p style={{ color: 'var(--text-tertiary)' }}>Enter a search term above to find games.</p>
          </div>
        )}
      </div>
    </div>
  );
}
