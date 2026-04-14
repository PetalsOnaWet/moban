"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Star, Flame, Zap, Sparkles } from "lucide-react";

interface Game {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  category: string;
  rating?: number;
  votes?: number;
  is_featured?: boolean;
  created_at: string;
}

const DEFAULT_ICON = "/images/default-game.png?v=1";

export function GameCard({ game }: { game: Game }) {
  // Use DEFAULT_ICON as initial state to prevent any broken image showing during load/hydration
  const [imgSrc, setImgSrc] = useState(DEFAULT_ICON);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    // Only attempt to load the real thumbnail on the client after mount
    if (game.thumbnail) {
      const img = new Image();
      img.src = game.thumbnail;
      img.onload = () => setImgSrc(game.thumbnail);
      img.onerror = () => setImgSrc(DEFAULT_ICON);
    }
  }, [game.thumbnail]);

  const ratingValue = game.rating || 0;
  const isHot = ratingValue > 4.5;
  
  const createdDate = new Date(game.created_at).getTime();
  const now = new Date().getTime();
  const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
  const isNew = (now - createdDate) < thirtyDaysInMs;

  return (
    <Link 
      href={`/game/${game.slug}`}
      title=""
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
        background: 'var(--bg-panel)',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid var(--border-subtle)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        width: '160px',
        height: '100px',
        boxShadow: isHovered ? '0 12px 24px -5px rgba(0,0,0,0.3)' : '0 4px 6px -1px rgba(0,0,0,0.1)',
        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        zIndex: isHovered ? 50 : 1
      }}
    >
      <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
        <img 
          key={imgSrc}
          src={imgSrc} 
          alt={game.title} 
          title=""
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        />
        
        {/* Center Hover Label (Grey Box) */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(215, 215, 195, 0.95)',
          color: '#333',
          padding: '4px 12px',
          borderRadius: '2px',
          fontSize: '13px',
          fontWeight: 600,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.2s ease',
          zIndex: 20,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none'
        }}>
          {game.title}
        </div>

        {/* Bottom Info Overlay (Matching Screenshot) - Now Hover Only */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 10,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none'
        }}>
          {/* Row 1: Title */}
          <div style={{ 
              color: 'white', 
              fontSize: '18px', 
              fontWeight: 900, 
              marginBottom: '2px',
              textShadow: '0 1px 2px rgba(0,0,0,0.5)'
          }}>
            {game.title}
          </div>
          
          {/* Row 2: Categories & Rating */}
          <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              gap: '8px'
          }}>
            <div style={{ 
                color: 'rgba(255,255,255,0.85)', 
                fontSize: '11px', 
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                flex: 1
            }}>
              {game.category || 'General'} Games / Unblocked Games
            </div>
            <div style={{ 
                color: 'white', 
                fontSize: '12px', 
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
            }}>
              <span style={{ color: 'white' }}>★</span> {game.rating?.toFixed(1) || '4.5'}
            </div>
          </div>
        </div>

        {/* Badges */}
        <div style={{ pointerEvents: 'none' }}>
          {isNew && (
            <div style={{ 
              position: 'absolute', top: '10px', left: '10px', 
              background: 'linear-gradient(135deg, #6366F1, #A855F7)', 
              color: 'white', fontSize: '10px', fontWeight: 900, 
              padding: '4px 10px', borderRadius: '6px',
              zIndex: 15,
              display: 'flex', alignItems: 'center', gap: '4px',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
              border: '1px solid rgba(255,255,255,0.2)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              <Sparkles size={11} strokeWidth={3} />
              NEW
            </div>
          )}
          {isHot && !isNew && (
            <div style={{ 
              position: 'absolute', top: '10px', left: '10px', 
              background: 'linear-gradient(135deg, #F59E0B, #EF4444)', 
              color: 'white', fontSize: '10px', fontWeight: 900, 
              padding: '4px 10px', borderRadius: '6px',
              zIndex: 15,
              display: 'flex', alignItems: 'center', gap: '4px',
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)',
              border: '1px solid rgba(255,255,255,0.2)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              <Flame size={11} strokeWidth={3} />
              HOT
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export function CompactGameCard({ game, isBentoBig = false }: { game: Game; isBentoBig?: boolean }) {
    const [imgSrc, setImgSrc] = useState(DEFAULT_ICON);
    const [isHovered, setIsHovered] = useState(false);
    
    useEffect(() => {
      if (game.thumbnail) {
        const img = new Image();
        img.src = game.thumbnail;
        img.onload = () => setImgSrc(game.thumbnail);
        img.onerror = () => setImgSrc(DEFAULT_ICON);
      }
    }, [game.thumbnail]);

    const ratingValue = game.rating || 0;
    const isHot = ratingValue > 4.5;
    
    const createdDate = new Date(game.created_at).getTime();
    const now = new Date().getTime();
    const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
    const isNew = (now - createdDate) < thirtyDaysInMs;
  
    return (
      <Link 
        href={`/game/${game.slug}`}
        title=""
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ 
          display: 'block',
          textDecoration: 'none',
          color: 'inherit',
          background: 'var(--bg-panel)',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid var(--border-subtle)',
          width: '100%',
          height: '100%',
          position: 'relative',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: isHovered ? '0 12px 24px -5px rgba(0,0,0,0.3)' : 'none',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          zIndex: isHovered ? 50 : 1
        }}
      >
        <img 
          key={imgSrc}
          src={imgSrc} 
          alt={game.title} 
          title=""
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        />

        {/* Center Hover Label (Grey Box) */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(230, 230, 210, 0.95)',
          color: '#333',
          padding: '4px 10px',
          borderRadius: '1px',
          fontSize: isBentoBig ? '14px' : '11px',
          fontWeight: 600,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.2s ease',
          zIndex: 20,
          whiteSpace: 'nowrap',
          pointerEvents: 'none'
        }}>
          {game.title}
        </div>

        {/* Info Overlay (Matching Screenshot) - Now Hover Only */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.45) 60%, transparent 100%)',
          padding: isBentoBig ? '16px' : '8px',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 10,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none'
        }}>
           <div style={{ 
               color: 'white', 
               fontSize: isBentoBig ? '24px' : '15px', 
               fontWeight: 900, 
               marginBottom: '1px',
               textShadow: '0 1px 2px rgba(0,0,0,0.8)'
           }}>
             {game.title}
           </div>
           <div style={{ 
               display: 'flex', 
               justifyContent: 'space-between', 
               alignItems: 'center',
               gap: '6px'
           }}>
             <div style={{ 
                 color: 'rgba(255,255,255,0.8)', 
                 fontSize: isBentoBig ? '13px' : '10px', 
                 whiteSpace: 'nowrap',
                 overflow: 'hidden',
                 textOverflow: 'ellipsis',
                 flex: 1
             }}>
               {game.category || 'Game'} / Unblocked Games / More
             </div>
             <div style={{ 
                 color: 'white', 
                 fontSize: isBentoBig ? '14px' : '11px', 
                 fontWeight: 800,
                 display: 'flex',
                 alignItems: 'center',
                 gap: '3px'
             }}>
               <span>★</span> {game.rating?.toFixed(1) || '4.0'}
             </div>
           </div>
        </div>
        
        {/* Badges */}
        <div style={{ pointerEvents: 'none' }}>
          {isNew && (
            <div style={{ 
              position: 'absolute', top: isBentoBig ? '12px' : '8px', left: isBentoBig ? '12px' : '8px', 
              background: 'linear-gradient(135deg, #6366F1, #A855F7)', 
              color: 'white', fontSize: isBentoBig ? '11px' : '8.5px', fontWeight: 900, 
              padding: isBentoBig ? '4px 10px' : '2px 8px', borderRadius: '4px',
              zIndex: 15,
              display: 'flex', alignItems: 'center', gap: isBentoBig ? '4px' : '3px',
              boxShadow: '0 4px 10px rgba(99, 102, 241, 0.3)',
              border: '1px solid rgba(255,255,255,0.2)',
              textTransform: 'uppercase'
            }}>
              <Sparkles size={isBentoBig ? 12 : 9} strokeWidth={3} />
              {isBentoBig ? 'NEW RELEASE' : 'NEW'}
            </div>
          )}
          {isHot && !isNew && (
            <div style={{ 
              position: 'absolute', top: isBentoBig ? '12px' : '8px', left: isBentoBig ? '12px' : '8px', 
              background: 'linear-gradient(135deg, #EE4444, #F59E0B)', 
              color: 'white', fontSize: isBentoBig ? '11px' : '8.5px', fontWeight: 900, 
              padding: isBentoBig ? '4px 10px' : '2px 8px', borderRadius: '4px',
              zIndex: 15,
              display: 'flex', alignItems: 'center', gap: isBentoBig ? '4px' : '3px',
              boxShadow: '0 4px 10px rgba(238, 68, 68, 0.3)',
              border: '1px solid rgba(255,255,255,0.2)',
              textTransform: 'uppercase'
            }}>
              <Flame size={isBentoBig ? 12 : 9} strokeWidth={3} />
              {isBentoBig ? 'TRENDING HOT' : 'HOT'}
            </div>
          )}
        </div>
      </Link>
    );
  }

export function GameGrid({ games }: { games: Game[] }) {
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', 
      gap: '12px' 
    }}>
      {games.map(game => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
