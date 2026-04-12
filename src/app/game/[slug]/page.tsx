import { getGameBySlug, getRelatedGames } from "@/lib/core/games";
import { GameIframe } from "@/components/games/GameIframe";
import { CompactGameCard } from "@/components/games/GameGrid";
import { GameTags } from "@/components/games/GameTags";
import { DiscussionBox } from "@/components/games/DiscussionBox";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { Star, Heart } from "lucide-react";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = await getGameBySlug(slug);
  if (!game) return { title: "Game Not Found" };
  return {
    title: `${game.title} - Geometry Dash Lite`,
    description: game.description,
  };
}

export default async function GamePage({ params }: Props) {
  const { slug } = await params;
  const game = await getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  const relatedGames = await getRelatedGames(game.slug, game.category, 60);
  
  // Layout Slicing (1:1 with Screenshot Hierarchy)
  const adHeaderGames = relatedGames.slice(0, 3);
  const horizontalGridGames = relatedGames.slice(3, 12);
  const leftSidebarGames = relatedGames.slice(12, 18);
  const rightSidebarGames = relatedGames.slice(18, 24);

  return (
    <div className="animate-fade-in" style={{ padding: '0 32px 64px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        
        {/* Row 0: Player (Topmost) */}
        <div style={{ marginTop: '24px', marginBottom: '32px' }}>
            <GameIframe title={game.title} url={game.iframe_url} />
        </div>

        {/* Row 1: Ad Header Slit */}
        <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '16px' 
        }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#6B7280', paddingLeft: '240px' }}>
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
          {/* Left Sidebar (Sticky) */}
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
             {/* Sticky Trigger 1: Cyan Ad Bar */}
             <div style={{ position: 'relative', marginBottom: '24px' }}>
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
                {/* Visual Gap as seen in screenshot */}
                <div style={{ height: '110px', background: 'transparent' }} />
             </div>

             {/* Breadcrumbs & Rating Bar */}
             <div style={{ 
                 display: 'flex', 
                 justifyContent: 'space-between', 
                 alignItems: 'center', 
                 marginBottom: '32px',
                 borderTop: '1px solid #F3F4F6',
                 paddingTop: '16px'
             }}>
                <div style={{ display: 'flex', gap: '8px', fontSize: '14px', color: '#9CA3AF' }}>
                    <Link href="/" style={{ textDecoration: 'none', color: '#9CA3AF' }}>Home</Link>
                    <span>/</span>
                    <Link href={`/category/${game.category}`} style={{ textDecoration: 'none', color: '#6366F1' }}>{game.category} Games</Link>
                    <span>/</span>
                    <span style={{ color: '#E5E7EB' }}>{game.title}</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ display: 'flex', gap: '2px' }}>
                        {[1,2,3,4].map(s => (
                            <Star key={s} size={20} fill="#FFB400" color="#FFB400" />
                        ))}
                        <Star size={20} fill="none" color="#FFB400" strokeWidth={1.5} />
                    </div>
                    <span style={{ fontSize: '15px', fontWeight: 600, color: '#374151' }}>
                        4672 votes 3.9/5
                    </span>
                </div>
             </div>

             {/* Game Title */}
             <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#111827', marginBottom: '32px' }}>{game.title}</h1>

             {/* Description Sections */}
             <div style={{ color: '#4B5563', lineHeight: 1.8, fontSize: '17px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '20px', color: '#1F2937' }}>About {game.title}</h2>
                <div style={{ marginBottom: '40px' }}>{game.description}</div>

                <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '20px', color: '#1F2937' }}>What's {game.title}?</h2>
                <p style={{ marginBottom: '24px' }}>
                    Geometry Dash Lite is a free-to-play rhythm platformer version of the popular Geometry Dash game series. 
                    It offers players a taste of the challenging gameplay, iconic music tracks, and rhythmic platforming 
                    that made the original game a global sensation.
                </p>
                <div style={{ fontWeight: 700, marginBottom: '16px' }}>Key Features:</div>
                <ul style={{ listStyleType: 'disc', paddingLeft: '24px', marginBottom: '48px' }}>
                    <li>3 challenging levels with exclusive music from MDK, Bossfight, and Boom Kitty</li>
                    <li>New obstacles and gameplay mechanics</li>
                    <li>Unique winter-themed graphics and effects</li>
                    <li>Completely free to play</li>
                </ul>
             </div>

             {/* Tags & Categories */}
             <GameTags />

             {/* Discussion Section */}
             <DiscussionBox title={game.title} />
          </main>

          {/* Right Sidebar (Sticky) */}
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
      </div>
    </div>
  );
}
