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
  const discoveryGames = games.slice(1, 4);
  const horizontalGridGames = games.slice(4, 14);
  
  // Balance remaining games between sidebars
  const remainingGames = games.slice(14);
  const sidebarCount = Math.min(Math.floor(remainingGames.length / 2), 6);
  const leftSidebarGames = remainingGames.slice(0, sidebarCount);
  const rightSidebarGames = remainingGames.slice(sidebarCount, sidebarCount * 2);
  
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
            <div className="grid-discovery-inner desktop-only">
                {games.slice(1, 4).map(g => (
                    <CompactGameCard key={g.id} game={g} />
                ))}
            </div>
        </div>

        {/* ROW 3: FULL HORIZONTAL GRID (9 Icons for Desktop, 6 for Mobile) */}
        <div className="grid-mobile-2 desktop-only" style={{ marginBottom: '32px' }}>
            {horizontalGridGames.map(g => (
                <CompactGameCard key={g.id} game={g} />
            ))}
        </div>

        {/* Mobile Top Grid (2x3 = 6 icons) */}
        <div className="grid-mobile-2 mobile-only" style={{ marginBottom: '32px' }}>
            {horizontalGridGames.slice(0, 6).map(g => (
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

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '20px', color: '#111827' }}>How to Play Geometry Dash Lite</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                            <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>1. Basic Controls</h3>
                                <p style={{ fontSize: '14px', color: '#6b7280' }}>Simply click or tap anywhere on the screen to make your character jump. Timing is everything!</p>
                            </div>
                            <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>2. Avoid Obstacles</h3>
                                <p style={{ fontSize: '14px', color: '#6b7280' }}>Dodge spikes, sawblades, and other dangerous traps. One wrong move and you'll have to restart the level.</p>
                            </div>
                            <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>3. Follow the Rhythm</h3>
                                <p style={{ fontSize: '14px', color: '#6b7280' }}>Each level features a unique soundtrack. Let the music guide your jumps and transitions.</p>
                            </div>
                        </div>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '20px', color: '#111827' }}>Key Features of Geometry Dash Online</h2>
                        <ul style={{ paddingLeft: '20px', color: '#4b5563', fontSize: '15px', display: 'grid', gap: '12px' }}>
                            <li><strong>Rhythm-based Action:</strong> Experience the perfect fusion of music and gameplay.</li>
                            <li><strong>Dynamic Levels:</strong> From easy starters to near-impossible challenges for pro players.</li>
                            <li><strong>Unique Icons:</strong> Unlock new colors and icons to customize your character as you progress.</li>
                            <li><strong>Practice Mode:</strong> Sharpen your skills with checkpoints before attempting the full run.</li>
                            <li><strong>No Download Required:</strong> Play directly in your browser on any device.</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '20px', color: '#111827' }}>Game Modes and Difficulty</h2>
                        <p style={{ fontSize: '15px', color: '#4B5563', marginBottom: '16px' }}>
                            Geometry Dash Lite offers a variety of levels, each with its own difficulty rating. 
                            Whether you are a beginner looking for "Easy" or "Normal" levels, or a veteran seeking "Insane" or "Demon" challenges, 
                            our platform has something for everyone. The difficulty increases as you move through levels like Stereo Madness, 
                            Back on Track, and Polargeist.
                        </p>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '20px', color: '#111827' }}>Expert Tips & Strategies</h2>
                        <div style={{ color: '#4b5563', fontSize: '15px', lineHeight: '1.8' }}>
                            <p style={{ marginBottom: '12px' }}><strong>1. Don't Give Up:</strong> Geometry Dash is famous for its difficulty. Expect to fail many times before succeeding.</p>
                            <p style={{ marginBottom: '12px' }}><strong>2. Use Practice Mode:</strong> Use green gems to drop checkpoints. This allows you to learn the hardest parts of a level without restarting from the beginning.</p>
                            <p style={{ marginBottom: '12px' }}><strong>3. Focus on the Audio:</strong> The obstacles often appear in sync with the beat. If you can master the rhythm, the jumping becomes much more intuitive.</p>
                        </div>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '20px', color: '#111827' }}>Frequently Asked Questions (FAQ)</h2>
                        <div style={{ display: 'grid', gap: '24px' }}>
                            <div>
                                <h4 style={{ fontWeight: 700, color: '#111827', marginBottom: '8px' }}>Is Geometry Dash Lite free to play?</h4>
                                <p style={{ fontSize: '14px', color: '#6b7280' }}>Yes, the online version of Geometry Dash Lite provided here is completely free to play in your browser.</p>
                            </div>
                            <div>
                                <h4 style={{ fontWeight: 700, color: '#111827', marginBottom: '8px' }}>Can I play on mobile devices?</h4>
                                <p style={{ fontSize: '14px', color: '#6b7280' }}>Absolutely! The game is optimized for both desktop and mobile browsers. Just make sure you have a stable internet connection.</p>
                            </div>
                            <div>
                                <h4 style={{ fontWeight: 700, color: '#111827', marginBottom: '8px' }}>How many levels are available?</h4>
                                <p style={{ fontSize: '14px', color: '#6b7280' }}>We offer all the classic levels from the Lite version, plus several community-favorite rhythm platformers.</p>
                            </div>
                        </div>
                    </section>
                </article>

                <GameTags game={featuredGame} />
                <DiscussionBox slug={featuredGame.slug} title={featuredGame.title} />

                {/* Mobile Bottom Grid (Remaining games) */}
                <div className="grid-mobile-2 mobile-only" style={{ marginTop: '32px' }}>
                    {remainingGames.map(g => (
                        <CompactGameCard key={g.id} game={g} />
                    ))}
                    {/* If remaining is too small, fallback to some from sidebars */}
                    {remainingGames.length < 4 && rightSidebarGames.map(g => (
                        <CompactGameCard key={g.id} game={g} />
                    ))}
                </div>
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
