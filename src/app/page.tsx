import { getGames, getRelatedGames } from "@/lib/core/games";
import { GameGrid, CompactGameCard } from "@/components/games/GameGrid";
import { GameTags } from "@/components/games/GameTags";
import { DiscussionBox } from "@/components/games/DiscussionBox";
import Link from "next/link";
import { Play } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Home() {
  const games = await getGames(60) || [];
  const featuredGame = games.find(g => g.is_featured) || games[0] || { title: "Geometry Dash Lite", slug: "geometry-dash-lite", thumbnail: "/og.png" };
  
  // Layout Slicing (Unifying with Detail Page Layout)
  const adHeaderGames = games.slice(1, 4);
  const horizontalGridGames = games.slice(4, 13);
  const leftSidebarGames = games.slice(13, 19);
  const rightSidebarGames = games.slice(19, 25);
  const mainGridGames = games.slice(0, 48);

  return (
    <div className="animate-fade-in" style={{ padding: '0 32px 64px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        
        {/* Row 1: Ad Header Slit */}
        <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '16px',
            marginTop: '24px'
        }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-tertiary)', paddingLeft: '240px' }}>
                Advertisement
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 160px)', gap: '12px' }}>
                {adHeaderGames.map(g => (
                    <CompactGameCard key={g.id} game={g} />
                ))}
            </div>
        </div>

        {/* Row 2: Full-Width Horizontal Grid (9 Icons) */}
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(9, 1fr)', 
            gap: '12px', 
            marginBottom: '32px' 
        }}>
            {horizontalGridGames.map(g => (
                <CompactGameCard key={g.id} game={g} />
            ))}
        </div>

        {/* Row 3: The Surround Box Section */}
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '160px 1fr 160px', 
            gap: '24px', 
            alignItems: 'start' 
        }}>
          {/* Left Sticky Sidebar */}
          <aside style={{ 
              position: 'sticky', 
              top: '90px', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '12px' 
          }}>
             {leftSidebarGames.map(g => (
                 <CompactGameCard key={g.id} game={g} />
             ))}
          </aside>

          {/* Main Content Flow */}
          <main style={{ minWidth: 0 }}>
            {/* Cyan Ad Area Placeholder */}
            <div style={{ borderRadius: '4px', overflow: 'hidden', marginBottom: '32px' }}>
                <div style={{ 
                    background: '#4AB7D8', 
                    padding: '8px', 
                    textAlign: 'center', 
                    color: '#000', 
                    fontWeight: 800, 
                    fontSize: '12px' 
                }}>
                    Advertisement
                </div>
                <div style={{ height: '90px', background: 'transparent' }} />
            </div>

            {/* Featured Hero */}
            <section style={{ marginBottom: '48px' }}>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '21/8', minHeight: '320px', borderRadius: '16px', overflow: 'hidden', background: '#000' }}>
                <img 
                  src={featuredGame.thumbnail} 
                  alt={featuredGame.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
                />
                <div style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center', 
                  padding: '48px',
                  background: 'linear-gradient(to right, rgba(0,0,0,0.85), transparent)'
                }}>
                  <h1 style={{ fontSize: '48px', color: 'white', marginBottom: '12px', fontWeight: 800 }}>{featuredGame.title}</h1>
                  <p style={{ color: '#CBD5E1', marginBottom: '32px', fontSize: '16px', maxWidth: '500px', lineHeight: 1.6 }}>
                    Join millions of players in the ultimate rhythm-based challenge. Navigate dangerous obstacles and master the beat!
                  </p>
                  <Link href={`/game/${featuredGame.slug}`} style={{ 
                    background: 'var(--accent-cyan)', 
                    color: '#000', 
                    padding: '14px 40px', 
                    borderRadius: '99px', 
                    fontWeight: 800,
                    fontSize: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    width: 'fit-content',
                    textDecoration: 'none',
                    transition: 'transform 0.2s'
                  }}>
                    <Play size={22} fill="currentColor" /> PLAY NOW
                  </Link>
                </div>
              </div>
            </section>

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '32px', overflowX: 'auto', paddingBottom: '8px' }}>
              {['All', 'Geometry Dash', 'Rhythm', 'Action', 'Arcade', 'Simulation', 'Sandbox'].map((cat, idx) => (
                <button key={cat} style={{ 
                  padding: '10px 24px', 
                  borderRadius: '99px', 
                  background: idx === 0 ? 'var(--text-primary)' : 'var(--bg-panel)',
                  color: idx === 0 ? 'var(--bg-panel)' : 'var(--text-secondary)',
                  border: '1px solid var(--border-standard)',
                  fontSize: '14px',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer'
                }}>
                  {cat}
                </button>
              ))}
            </div>

            {/* Main Game Grid */}
            <section style={{ marginBottom: '64px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>Recommended Games</h2>
                    <Link href="/category/all" style={{ color: 'var(--accent-cyan)', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}>View All</Link>
                </div>
                <GameGrid games={mainGridGames} />
            </section>

            {/* Site SEO/About Info */}
            <section style={{ 
              background: 'var(--bg-panel)', 
              padding: '48px', 
              borderRadius: '20px', 
              border: '1px solid var(--border-standard)', 
              marginBottom: '64px'
            }}>
              <h2 style={{ fontSize: '32px', marginBottom: '24px', color: 'var(--text-primary)', fontWeight: 800 }}>Best Browser Games Portal</h2>
              <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '16px' }}>
                <p style={{ marginBottom: '20px' }}>
                  Welcome to our premium gaming portal! We collect the highest quality rhythm and action games for you to play for free. 
                  Whether you like the intense challenges of Geometry Dash or the endless fun of Subway Surfers, we have something for everyone.
                </p>
                <div style={{ fontWeight: 700, marginBottom: '12px', color: 'var(--text-primary)' }}>Why Play Here?</div>
                <ul style={{ listStyleType: 'disc', paddingLeft: '24px' }}>
                    <li>100% Free online games</li>
                    <li>No installation required</li>
                    <li>Optimized for all browsers and devices</li>
                    <li>Regularly updated with new challenges</li>
                </ul>
              </div>
            </section>

            {/* Portal-wide Tags */}
            <GameTags />

            {/* General Discussion */}
            <DiscussionBox slug="home" title="the Community" />
          </main>

          {/* Right Sticky Sidebar */}
          <aside style={{ 
              position: 'sticky', 
              top: '90px', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '12px' 
          }}>
             {rightSidebarGames.map(g => (
                 <CompactGameCard key={g.id} game={g} />
             ))}
          </aside>
        </div>

        <footer style={{ textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '14px', padding: '64px 0' }}>
          <p>© 2026 Geometry Dash Lite Clone - Immersion Box Edition</p>
        </footer>
      </div>
    </div>
  );
}
