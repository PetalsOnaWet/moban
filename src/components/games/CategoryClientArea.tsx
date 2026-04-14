"use client";

import { useState } from "react";
import { BentoGrid } from "./BentoGrid";
import { Pagination } from "../layout/Pagination";

interface Game {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  category: string;
}

interface CategoryClientAreaProps {
  initialGames: Game[];
  title: string;
  currentPage: number;
  totalGames: number;
}

export function CategoryClientArea({ initialGames, title, currentPage, totalGames }: CategoryClientAreaProps) {
  const gamesPerPage = 20;
  const totalPages = Math.ceil(totalGames / gamesPerPage);

  return (
    <>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ 
            fontSize: '28px', 
            fontWeight: 800, 
            color: 'var(--text-primary)',
            textTransform: 'capitalize'
        }}>
            {title}
        </h2>
      </div>

      {/* BENTO GRID */}
      <BentoGrid games={initialGames} />

      {/* PAGINATION */}
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
      />
    </>
  );
}
