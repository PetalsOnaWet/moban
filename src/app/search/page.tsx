import Link from "next/link";
import { searchGames } from "@/lib/core/games";
import { GameGrid } from "@/components/games/GameGrid";
import { SearchBox } from "@/components/games/SearchBox";
import { Metadata } from "next";


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
        
        <div style={{ marginTop: '100px', borderTop: '1px solid var(--border-subtle)', paddingTop: '64px' }}>
          <article style={{ color: 'var(--text-secondary)', lineHeight: '1.9', fontSize: '15px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '32px' }}>Find Your Next Favorite Title on Unblocked Games 76</h2>
            <p style={{ marginBottom: '20px' }}>
              With a library of over 1,000 hand-picked titles, finding exactly what you want to play is essential. Our <strong>Search Games</strong> feature is designed to be fast, intuitive, and comprehensive. Whether you are looking for a specific title like <em>Slope</em> or just want to explore a genre like <em>Rhythm</em>, our search engine helps you navigate the vast world of unblocked entertainment with ease.
            </p>
            
            <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px', color: 'var(--text-primary)' }}>Tips for Effective Searching</h3>
            <p style={{ marginBottom: '20px' }}>
              To get the most out of our search tool, we recommend using specific keywords. Instead of just searching for "game," try typing in the genre or a part of the title. Our system uses advanced matching algorithms to find the most relevant results. If you don't find what you're looking for immediately, try a related term. For example, if you're looking for racing games, try searching for "car," "moto," or "speed."
            </p>
            
            <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px', color: 'var(--text-primary)' }}>The Importance of a Curated Library</h3>
            <p style={{ marginBottom: '20px' }}>
              At <strong>Unblocked Games 76</strong>, we don't just dump every game we find onto our platform. Every title in our search results has been carefully vetted by our team of curators. We look for games that offer high engagement, smooth performance, and, most importantly, are safe for our users. This commitment to quality means that when you search for a game on our site, you can trust that you're getting one of the best experiences available on the web.
            </p>

            <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px', color: 'var(--text-primary)' }}>Unblocked Access Anywhere, Anytime</h3>
            <p style={{ marginBottom: '20px' }}>
              Our search feature is optimized to work even on restrictive networks. We know that schools and workplaces often implement filters that can make it difficult to find gaming content. By hosting our own search index and using optimized edge servers, we ensure that your search results load quickly and reliably, regardless of your location. This is part of our mission to remain the #1 destination for unblocked entertainment.
            </p>

            <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px', color: 'var(--text-primary)' }}>Join the Community and Suggest New Games</h3>
            <p style={{ marginBottom: '20px' }}>
              Can't find a specific game? We want to know! Our library is constantly growing, and many of our additions come directly from user suggestions. If our search results are missing your favorite title, head over to our <Link href="/contact" style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>Contact Page</Link> and let us know. We prioritize adding high-demand games that our community loves.
            </p>

            <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px', color: 'var(--text-primary)' }}>Continuous Innovation in Browser Gaming</h3>
            <p style={{ marginBottom: '20px' }}>
              The technology behind our search engine is part of a larger ecosystem of innovation at Unblocked Games 76. Built with Next.js 16, our platform utilizes the latest in web development to provide a "native" feel. We are committed to staying at the forefront of the industry, ensuring that our search, game playback, and overall user experience are second to none.
            </p>
            
            <p style={{ marginBottom: '20px' }}>
              In conclusion, whether you're a long-time fan or a new visitor, our search feature is here to help you dive into the fun. Explore our collection, find your next challenge, and discover why millions of gamers choose Unblocked Games 76. Happy searching!
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}
