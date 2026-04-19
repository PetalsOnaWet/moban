"use client";

import { BentoGrid } from "./BentoGrid";
import { Pagination } from "../layout/Pagination";
import { Game } from "@/lib/core/games";

interface CategoryClientAreaProps {
  initialGames: Game[];
  totalCount: number;
  currentPage: number;
  categorySlug: string;
}

export function CategoryClientArea({ initialGames, totalCount, currentPage, categorySlug }: CategoryClientAreaProps) {
  const gamesPerPage = 24; 
  const totalPages = Math.ceil(totalCount / gamesPerPage);

  return (
    <>
      {initialGames.length > 0 ? (
        <>
          <BentoGrid games={initialGames} />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              baseUrl={`/${categorySlug}`}
            />
          )}
        </>
      ) : (
        <div style={{
          padding: '80px 0',
          textAlign: 'center',
          background: 'var(--bg-panel)',
          borderRadius: '16px',
          border: '2px dashed var(--border-subtle)',
          margin: '40px 0'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>
            No games found
          </h3>
          <p style={{ color: 'var(--text-tertiary)' }}>
            We couldn't find any games matching this category yet.
          </p>
        </div>
      )}
    </>
  );
}
