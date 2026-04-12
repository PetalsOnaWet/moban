"use client";

import Link from "next/link";
import { Star } from "lucide-react";

interface Game {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  category: string;
  rating?: number;
  votes?: number;
}

export function GameCard({ game }: { game: Game }) {
  const isNew = game.id.length % 7 === 0;
  const isHot = game.id.length % 3 === 0;

  return (
    <Link 
      href={`/game/${game.slug}`}
      style={{ 
        display: 'flex', 
        flexDirection: 'column',
        textDecoration: 'none',
        color: 'inherit',
        background: 'var(--bg-panel)',
        borderRadius: '8px', // Slightly sharper corners
        overflow: 'hidden',
        border: '1px solid var(--border-standard)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.3s ease'
      }}
      className="game-card-hover"
    >
      <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
        <img 
          src={game.thumbnail} 
          alt={game.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        
        {/* Badges - Matching Screenshot style */}
        {isNew && (
          <div style={{ 
            position: 'absolute', top: '8px', left: '8px', 
            background: 'linear-gradient(135deg, #6366F1, #A855F7)', 
            color: 'white', fontSize: '10px', fontWeight: 800, padding: '3px 8px', borderRadius: '4px',
            display: 'flex', alignItems: 'center', gap: '4px'
          }}>
            NEW ✨
          </div>
        )}
        {isHot && !isNew && (
          <div style={{ 
            position: 'absolute', top: '8px', left: '8px', 
            background: 'linear-gradient(135deg, #F59E0B, #EF4444)', 
            color: 'white', fontSize: '10px', fontWeight: 800, padding: '3px 8px', borderRadius: '4px',
            display: 'flex', alignItems: 'center', gap: '4px'
          }}>
            HOT 🔥
          </div>
        )}
      </div>
      <div style={{ padding: '12px' }}>
        <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {game.title}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--text-tertiary)' }}>
          <Star size={12} fill="#FFB400" color="#FFB400" />
          <span>{game.rating?.toFixed(1) || '4.5'}</span>
        </div>
      </div>
    </Link>
  );
}

export function CompactGameCard({ game }: { game: Game }) {
    const isNew = game.id.length % 7 === 0;
    const isHot = game.id.length % 3 === 0;
  
    return (
      <Link 
        href={`/game/${game.slug}`}
        style={{ 
          display: 'block',
          textDecoration: 'none',
          color: 'inherit',
          background: 'var(--bg-panel)',
          borderRadius: '6px',
          overflow: 'hidden',
          border: '1px solid var(--border-subtle)',
          width: '100%',
          aspectRatio: '16/10',
          position: 'relative'
        }}
        className="game-card-hover"
      >
        <img 
          src={game.thumbnail} 
          alt={game.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        
        {/* Badges Scale down for compact */}
        {isNew && (
          <div style={{ 
            position: 'absolute', top: '6px', left: '6px', 
            background: 'linear-gradient(135deg, #6366F1, #A855F7)', 
            color: 'white', fontSize: '9px', fontWeight: 800, padding: '2px 5px', borderRadius: '3px'
          }}>
            NEW
          </div>
        )}
        {isHot && !isNew && (
          <div style={{ 
            position: 'absolute', top: '6px', left: '6px', 
            background: 'linear-gradient(135deg, #F59E0B, #EF4444)', 
            color: 'white', fontSize: '9px', fontWeight: 800, padding: '2px 5px', borderRadius: '3px'
          }}>
            HOT
          </div>
        )}
      </Link>
    );
  }

export function GameGrid({ games }: { games: Game[] }) {
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', 
      gap: '20px' 
    }}>
      {games.map(game => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
