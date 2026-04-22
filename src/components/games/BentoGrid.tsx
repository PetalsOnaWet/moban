"use client";

import Link from "next/link";
import { CompactGameCard } from "./GameGrid";

import { Game } from "@/lib/core/games";

export function BentoGrid({ games }: { games: Game[] }) {
  // We need to carefully map games to grid positions
  // Special positions for Big Cards: index 0 and index 3 (based on 1-based logic)
  // But in a flat list, we need to handle the flow

  return (
    <div 
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gridAutoRows: '140px',
        gridAutoFlow: 'dense',
        gap: '12px',
        width: '100%',
        marginBottom: '40px'
      }}
    >
      {games.map((game, index) => {
        // Dynamic Bento Distribution Logic
        let spanClass = { gridColumn: 'span 1', gridRow: 'span 1' };
        
        const position = index % 12;
        
        if (position === 0 || position === 11) {
           spanClass = { gridColumn: 'span 2', gridRow: 'span 2' };
        } else if (position === 3 || position === 8) {
           spanClass = { gridColumn: 'span 2', gridRow: 'span 1' };
        } else if (position === 5) {
           spanClass = { gridColumn: 'span 1', gridRow: 'span 2' };
        }

        return (
          <div
            key={game.id}
            style={{
              ...spanClass,
              transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <CompactGameCard
              game={game}
              isBentoBig={spanClass.gridColumn === 'span 2' && spanClass.gridRow === 'span 2'}
              isBentoWide={spanClass.gridColumn === 'span 2' && spanClass.gridRow === 'span 1'}
              isBentoTall={spanClass.gridColumn === 'span 1' && spanClass.gridRow === 'span 2'}
              showCategory={true}
            />
          </div>
        );
      })}
    </div>
  );
}
