import { getGames } from "@/lib/core/games";
import { GameGrid, CompactGameCard } from "@/components/games/GameGrid";
import { GameTags } from "@/components/games/GameTags";
import { DiscussionBox } from "@/components/games/DiscussionBox";
import { DiscoveryAds } from "@/components/layout/DiscoveryAds";
import { GamePlayerArea } from "@/components/games/GamePlayerArea";
import { Breadcrumbs } from "@/components/games/Breadcrumbs";
import { GameRating } from "@/components/games/GameRating";
import Link from "next/link";

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
      <div style={{ margin: '0 auto' }}>
        
        {/* ROW 1: FIRST SCREEN (Hero & Ad) */}
        <GamePlayerArea 
          title="Geometry Dash" 
          url="https://ozgames.io/geo-dash.embed" 
        />

        {/* ROW 2: DISCOVERY ADS (2/3) + GAME ICONS (1/3) */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '32px', alignItems: 'flex-start' }}>
            <DiscoveryAds />
            <div style={{ flex: '1', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                {games.slice(1, 4).map(g => (
                    <CompactGameCard key={g.id} game={g} />
                ))}
            </div>
        </div>

        {/* ROW 3: FULL HORIZONTAL GRID (9 Icons) */}
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(9, 1fr)', 
            gap: '6px', 
            marginBottom: '32px' 
        }}>
            {horizontalGridGames.map(g => (
                <CompactGameCard key={g.id} game={g} />
            ))}
        </div>

        {/* ROW 4: THE SURROUND BOX (SECOND SCREEN ONWARDS) */}
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '160px 1fr 160px', 
            gap: '24px', 
            alignItems: 'start' 
        }}>
          {/* LEFT STICKY SIDEBAR */}
          <aside style={{ 
              position: 'sticky', 
              top: '90px', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '6px' 
          }}>
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
             <div style={{ background: '#FFF', borderRadius: '4px', padding: '32px', border: '1px solid var(--border-subtle)', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
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
                      categorySlug={(featuredGame.category || "all").toLowerCase()} 
                    />
                    <GameRating votes={15280} rating={4.8} />
                </div>

                <article style={{ color: '#374151', lineHeight: '1.7' }}>
                    <h1 style={{ 
                        fontSize: '36px', 
                        fontWeight: 900, 
                        color: '#111827', 
                        marginBottom: '32px',
                        letterSpacing: '-0.02em'
                    }}>
                        Geometry Dash Lite - The Ultimate Rhythm Platformer Portal
                    </h1>
                    
                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '16px', color: '#111827' }}>
                            Welcome to the World of Geometry Dash
                        </h2>
                        <p style={{ fontSize: '16px', color: '#4B5563', marginBottom: '20px' }}>
                            Jump and fly your way through danger in this rhythm-based action platformer! 
                            Our portal provides the smoothest Geometry Dash Lite experience online. 
                            Prepare for a near impossible challenge in the world of Geometry Dash. 
                            Push your skills to the limit as you jump, fly and flip your way through dangerous passages and spiky obstacles.
                        </p>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '16px', color: '#111827' }}>
                            How to Play
                        </h2>
                        <p style={{ fontSize: '16px', color: '#4B5563', marginBottom: '20px' }}>
                            Simple one touch game play with lots of levels that will keep you entertained for hours! 
                            Explore various game modes including Classic, Rhythm, and the community-created Geometry Dash Subzero, Meltdown, and World editions.
                        </p>
                    </section>
                </article>

                <GameTags />
                <DiscussionBox slug="home" title="the Portal" />
             </div>
          </main>

          {/* RIGHT STICKY SIDEBAR */}
          <aside style={{ 
              position: 'sticky', 
              top: '90px', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '6px' 
          }}>
             {rightSidebarGames.map(g => (
                 <CompactGameCard key={g.id} game={g} />
             ))}
          </aside>
        </div>
      </div>
    </div>
  );
}
