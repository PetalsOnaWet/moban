"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Star, Flame, Zap, Sparkles } from "lucide-react";
import { Game } from "@/lib/core/games";

const DEFAULT_ICON = "/images/default-game.webp";

export function GameCard({ game, showCategory = true }: { game: Game; showCategory?: boolean }) {
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
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        width: '160px',
        height: '100px',
        zIndex: isHovered ? 1000 : 1,
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
      }}
    >
      <Link
        href={`/${game.slug}`}
        style={{
          display: 'block',
          textDecoration: 'none',
          color: 'inherit',
          background: 'var(--bg-panel)',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid var(--border-subtle)',
          width: '100%',
          height: '100%',
          boxShadow: isHovered ? '0 12px 24px -5px rgba(0,0,0,0.3)' : '0 4px 6px -1px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
          <img
            src={imgSrc}
            alt={game.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />

          {/* Title on Hover */}
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
            zIndex: 2,
            whiteSpace: 'nowrap',
          }}>
            {game.title}
          </div>
        </div>
      </Link>

      {/* Overlay with Combined Category/Tags */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
        padding: '8px 12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        zIndex: 10,
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none', // Simplified: No interaction needed for the text
        borderBottomLeftRadius: '12px',
        borderBottomRightRadius: '12px',
      }}>
        <div style={{
          color: 'rgba(255,255,255,0.85)',
          fontSize: '10px',
          fontWeight: 800,
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          flex: 1
        }}>
          {showCategory && (
            <>
              {game.category} {game.tags ? ` / ${game.tags.split(',')[0]}` : ''}
            </>
          )}
        </div>
        <div style={{ color: 'white', fontSize: '11px', fontWeight: 800, marginLeft: '8px' }}>
          ★ {game.rating?.toFixed(1) || '4.5'}
        </div>
      </div>

      {/* Badges */}
      <div style={{ pointerEvents: 'none' }}>
        {isNew && (
          <div style={{
            position: 'absolute', top: '8px', left: '8px',
            background: 'linear-gradient(135deg, #6366F1, #A855F7)',
            color: 'white', fontSize: '9px', fontWeight: 900,
            padding: '3px 8px', borderRadius: '4px',
            zIndex: 15,
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
          }}>
            NEW
          </div>
        )}
        {isHot && !isNew && (
          <div style={{
            position: 'absolute', top: '8px', left: '8px',
            background: 'linear-gradient(135deg, #F59E0B, #EF4444)',
            color: 'white', fontSize: '9px', fontWeight: 900,
            padding: '3px 8px', borderRadius: '4px',
            zIndex: 15,
          }}>
            HOT
          </div>
        )}
      </div>
    </div>
  );
}

export function CompactGameCard({ game, isBentoBig = false, showCategory = true }: { game: Game; isBentoBig?: boolean; showCategory?: boolean }) {
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
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        zIndex: isHovered ? 1000 : 1,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
      }}
    >
      <Link
        href={`/${game.slug}`}
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
          boxShadow: isHovered ? '0 12px 24px -5px rgba(0,0,0,0.3)' : 'none',
        }}
      >
        <img
          src={imgSrc}
          alt={game.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Link>

      {/* Info Overlay */}
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
        pointerEvents: 'none',
      }}>
        <div style={{
          color: 'white',
          fontSize: isBentoBig ? '24px' : '14px',
          fontWeight: 900,
          marginBottom: '4px',
          textShadow: '0 1px 2px rgba(0,0,0,0.8)'
        }}>
          {game.title}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: isBentoBig ? '13px' : '10px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            flex: 1
          }}>
            {showCategory && (
              <>
                {game.category} {game.tags ? ` / ${game.tags.split(',')[0]}` : ''}
              </>
            )}
          </div>
          <div style={{
            color: 'white',
            fontSize: isBentoBig ? '14px' : '11px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            marginLeft: '8px'
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
            color: 'white', fontSize: isBentoBig ? '10px' : '8px', fontWeight: 900,
            padding: '2px 6px', borderRadius: '4px',
            zIndex: 15,
          }}>
            {isBentoBig ? 'NEW RELEASE' : 'NEW'}
          </div>
        )}
        {isHot && !isNew && (
          <div style={{
            position: 'absolute', top: isBentoBig ? '12px' : '8px', left: isBentoBig ? '12px' : '8px',
            background: 'linear-gradient(135deg, #EE4444, #F59E0B)',
            color: 'white', fontSize: isBentoBig ? '10px' : '8px', fontWeight: 900,
            padding: '2px 6px', borderRadius: '4px',
            zIndex: 15,
          }}>
            {isBentoBig ? 'TRENDING HOT' : 'HOT'}
          </div>
        )}
      </div>
    </div>
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
