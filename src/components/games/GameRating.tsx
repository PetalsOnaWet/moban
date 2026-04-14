"use client";

import { Star } from "lucide-react";

interface GameRatingProps {
  votes: number;
  rating: number;
}

export function GameRating({ votes, rating }: GameRatingProps) {
  // Generate 5 stars
  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((s) => (
      <Star 
        key={s}
        size={24}
        fill={s <= Math.floor(rating) ? "#FFB800" : s - 1 < rating ? "url(#grad1)" : "#E5E7EB"}
        stroke="none"
      />
    ));
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ display: 'flex', gap: '2px' }}>
        {renderStars()}
        {/* Simple gradient for partial stars if needed */}
        <svg width="0" height="0">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" style={{ stopColor: '#FFB800', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#E5E7EB', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <span style={{ fontSize: '18px', fontWeight: 600, color: '#111827', marginLeft: '8px' }}>
        {votes.toLocaleString()} votes {rating.toFixed(1)}/5
      </span>
    </div>
  );
}
