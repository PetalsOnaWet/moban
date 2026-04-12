"use client";

import Link from "next/link";
import { Game } from "@/lib/core/games";
import { Play } from "lucide-react";

export function GameCard({ game }: { game: Game }) {
  return (
    <Link href={`/game/${game.slug}`} className="util-card animate-fade-in" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={game.thumbnail} 
          alt={game.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)', display: 'flex', alignItems: 'flex-end', padding: '12px' }}>
          <div className="util-glass" style={{ padding: '4px 10px', borderRadius: '4px', fontSize: '10px', color: 'var(--text-primary)', fontWeight: 600, backdropFilter: 'blur(4px)' }}>
            {game.category}
          </div>
        </div>
        <div className="util-flex-center" style={{ position: 'absolute', inset: 0, opacity: 0, background: 'rgba(0,0,0,0.3)', transition: 'opacity 0.2s ease' }} onMouseOver={(e) => e.currentTarget.style.opacity = '1'} onMouseOut={(e) => e.currentTarget.style.opacity = '0'}>
           <div style={{ background: 'var(--accent-violet)', borderRadius: '50%', padding: '12px', color: 'white', transform: 'scale(1)', transition: 'transform 0.2s ease' }}>
             <Play size={24} fill="white" />
           </div>
        </div>
      </div>
      <div style={{ padding: '16px' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{game.title}</h3>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {game.description}
        </p>
      </div>
    </Link>
  );
}

export function GameGrid({ games }: { games: Game[] }) {
  return (
    <div className="util-grid" style={{ 
      gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
      gap: '24px' 
    }}>
      {games.map((game) => (
        <GameCard key={game.slug || game.id} game={game} />
      ))}
    </div>
  );
}
