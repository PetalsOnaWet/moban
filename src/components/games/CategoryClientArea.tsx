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
}

export function CategoryClientArea({ initialGames, title }: CategoryClientAreaProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 20; // Example count per page

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // In a real implementation, you would fetch new data here
    // or slice the initialGames if all data is passed.
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
        totalPages={5} 
        onPageChange={handlePageChange} 
      />
    </>
  );
}
