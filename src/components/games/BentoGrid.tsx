"use client";

import Link from "next/link";
import { CompactGameCard } from "./GameGrid";

import { Game } from "@/lib/core/games";

export function BentoGrid({ games }: { games: Game[] }) {
  // We need to carefully map games to grid positions
  // Special positions for Big Cards: index 0 and index 3 (based on 1-based logic)
  // But in a flat list, we need to handle the flow

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, 160px)',
      gridAutoRows: '100px',
      gap: '6px',
      marginBottom: '40px'
    }}>
      {games.map((game, index) => {
        // First big card: Item 1 (Position 1-2, 1-3)
        const isBig1 = index === 0;
        // Second big card: Item 4 (Position 5-6, 1-3)
        const isBig2 = index === 3;

        return (
          <div
            key={game.id}
            style={{
              gridColumn: isBig1 || isBig2 ? 'span 2' : 'span 1',
              gridRow: isBig1 || isBig2 ? 'span 3' : 'span 1'
            }}
          >
            <CompactGameCard
              game={game}
              isBentoBig={isBig1 || isBig2}
            />
          </div>
        );
      })}
    </div>
  );
}
