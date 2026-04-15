"use client";

import { useState } from "react";
import { BentoGrid } from "./BentoGrid";
import { Pagination } from "../layout/Pagination";

import { Game } from "@/lib/core/games";

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

      {/* BENTO GRID OR EMPTY STATE */}
      {initialGames.length > 0 ? (
        <>
          <BentoGrid games={initialGames} />
          {/* PAGINATION */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </>
      ) : (
        <div style={{
          padding: '80px 0',
          textAlign: 'center',
          background: 'var(--bg-input)',
          borderRadius: '12px',
          border: '2px dashed var(--border-standard)',
          margin: '40px 0'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>
            No games found
          </h3>
          <p style={{ color: 'var(--text-muted)' }}>
            We couldn't find any games matching this category yet.
          </p>
        </div>
      )}
    </>
  );
}
