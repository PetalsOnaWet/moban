"use client";

import { Tag, Globe } from "lucide-react";
import Link from "next/link";
import { Game } from "@/lib/core/games";

interface GameTagsProps {
  game?: Game;
}

export function GameTags({ game }: GameTagsProps) {
  // We strictly show tags for the provided game. 
  // If no game is provided (e.g. during a loading state), we show nothing or a small set of defaults.
  // But based on user feedback, the homepage IS a game page, so it should have a game.
  
  if (!game) return null;

  const rawTags = game.tags ? game.tags.split(',').map(t => t.trim()) : [];
  const allTags = Array.from(new Set([game.category, ...rawTags])).filter(Boolean);
  const sectionTitle = "Categories & Tags";

  return (
    <div style={{ marginTop: '48px', marginBottom: '48px' }}>
      <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '24px', color: 'var(--text-primary)' }}>{sectionTitle}</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        {allTags.map((tagName, idx) => {
          const isCategory = game ? (tagName.toLowerCase() === game.category.toLowerCase()) : false;
          
          return (
            <Link 
              key={idx}
              href={`/${tagName.toLowerCase().replace(/\s+/g, '-')}-games`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 20px',
                background: isCategory ? 'var(--bg-input)' : 'var(--bg-panel)',
                borderRadius: '99px',
                textDecoration: 'none',
                transition: 'all 0.2s',
                fontSize: '14px',
                fontWeight: 600,
                color: isCategory ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                border: isCategory ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)'
              }}
            >
              {isCategory ? (
                  <Globe size={16} color="var(--accent-cyan)" />
              ) : (
                  <Tag size={16} color="var(--text-tertiary)" />
              )}
              {tagName}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
