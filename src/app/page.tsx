import { getGames } from "@/lib/core/games";
import { GameGrid, CompactGameCard } from "@/components/games/GameGrid";
import { GameTags } from "@/components/games/GameTags";
import { DiscussionBox } from "@/components/games/DiscussionBox";
import { DiscoveryAds } from "@/components/layout/DiscoveryAds";
import { GamePlayerArea } from "@/components/games/GamePlayerArea";
import { Breadcrumbs } from "@/components/games/Breadcrumbs";
import { GameRating } from "@/components/games/GameRating";
import Link from "next/link";
import { GameSchema } from "@/components/seo/SchemaMarkup";

export const dynamic = "force-dynamic";

export default async function Home() {
  const allGames = await getGames(60) || [];
  const games = Array.isArray(allGames) ? allGames : [];
  const featuredGame = games.find(g => g.is_featured) || games[0] || { title: "Geometry Dash Lite", slug: "geometry-dash-lite", thumbnail: "/og.png" };
  
  // Layout Slicing (Matching [slug]/page.tsx)
  const horizontalGridGames = games.slice(4, 13);
  const leftSidebarGames = games.slice(13, 19);
  const rightSidebarGames = games.slice(19, 25);
  const mainGridGames = games.slice(0, 48);

  return (
    <div className="animate-fade-in" style={{ padding: '0 0 64px' }}>
      <div className="util-container">
        
        {/* ROW 1: FIRST SCREEN (Hero & Ad) */}
        <GamePlayerArea 
          title="Geometry Dash" 
          url="https://ozgames.io/geo-dash.embed" 
        />

        {/* ROW 2: DISCOVERY ADS (2/3) + GAME ICONS (1/3) */}
        <div className="row-discovery" style={{ marginBottom: '32px', alignItems: 'flex-start' }}>
            <DiscoveryAds />
            <div className="grid-discovery-inner">
                {games.slice(1, 4).map(g => (
                    <CompactGameCard key={g.id} game={g} />
                ))}
            </div>
        </div>

        {/* ROW 3: FULL HORIZONTAL GRID (9 Icons or 2-column mobile) */}
        <div className="grid-mobile-2" style={{ marginBottom: '32px' }}>
            {horizontalGridGames.map(g => (
                <CompactGameCard key={g.id} game={g} />
            ))}
        </div>

        {/* ROW 4: THE SURROUND BOX (SECOND SCREEN ONWARDS) */}
        <div className="layout-surround">
          {/* LEFT STICKY SIDEBAR */}
          <aside style={{ 
              position: 'sticky', 
              top: '90px', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '6px' 
          }} className="desktop-only">
             {leftSidebarGames.map(g => (
                 <CompactGameCard key={g.id} game={g} />
             ))}
          </aside>

          {/* CENTER CONTENT - SEO & DISCUSSION */}
          <main style={{ minWidth: 0 }}>
             {/* Center Ad Placeholder */}
             <div style={{ borderRadius: '4px', overflow: 'hidden', marginBottom: '32px' }}>
                <div style={{ textAlign: 'center', padding: '6px 0' }}>
                    <div style={{ 
                        display: 'inline-block',
                        background: '#4AB7D8', 
                        padding: '2px 12px', 
                        color: '#000', 
                        fontWeight: 600, 
                        fontSize: '10px',
                        borderRadius: '4px',
                    }}>
                        Advertisement
                    </div>
                </div>
                <div style={{ height: '90px', background: 'transparent' }} />
             </div>

             {/* White Box Content Area for Homepage SEO */}
             <div style={{ background: '#FFF', borderRadius: '4px', padding: '24px', border: '1px solid var(--border-subtle)', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                {/* Content Header: Breadcrumbs & Rating */}
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginBottom: '32px',
                    flexWrap: 'wrap',
                    gap: '16px'
                }}>
                    <Breadcrumbs 
                      gameTitle={featuredGame.title} 
                      categoryName={featuredGame.category || "Online Games"} 
                      categorySlug={`${(featuredGame.category || "all").toLowerCase().replace(/\s+/g, '-')}-games`} 
                    />
                    <GameRating slug={featuredGame.slug} votes={featuredGame.votes || 0} rating={featuredGame.rating || 0} />
                </div>

                <article style={{ color: '#374151', lineHeight: '1.7' }}>
                    <h1 style={{ 
                        fontSize: '28px', 
                        fontWeight: 900, 
                        color: '#111827', 
                        marginBottom: '24px',
                        letterSpacing: '-0.02em'
                    }}>
                        {featuredGame.title} - The Ultimate Rhythm Platformer Portal
                    </h1>
                    
                    <section style={{ marginBottom: '32px' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '16px', color: '#111827' }}>
                            Welcome to the World of {featuredGame.title}
                        </h2>
                        <p style={{ fontSize: '15px', color: '#4B5563', marginBottom: '16px' }}>
                            Jump and fly your way through danger in this rhythm-based action platformer! 
                            Our portal provides the smoothest {featuredGame.title} experience online. 
                            Prepare for a near impossible challenge in the world of {featuredGame.title}. 
                            Push your skills to the limit as you jump, fly and flip your way through dangerous passages and spiky obstacles.
                        </p>
                    </section>
                </article>

                <GameTags game={featuredGame} />
                <DiscussionBox slug={featuredGame.slug} title={featuredGame.title} />
             </div>
          </main>

          {/* RIGHT STICKY SIDEBAR (TWO COLUMNS or 2x3 block) */}
          <aside style={{ 
              position: 'sticky', 
              top: '90px', 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: '6px' 
          }}>
             {rightSidebarGames.map(g => (
                 <CompactGameCard key={g.id} game={g} />
             ))}
          </aside>
        </div>
        <GameSchema game={featuredGame} />
      </div>
    </div>
  );
}
