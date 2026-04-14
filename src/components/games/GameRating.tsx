"use client";

import { useState, useTransition, useEffect } from "react";
import { Star } from "lucide-react";
import { submitRating } from "@/lib/core/actions";

interface GameRatingProps {
  slug: string;
  votes: number;
  rating: number;
}

export function GameRating({ slug, votes, rating }: GameRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleVote = (value: number) => {
    if (hasVoted || isPending) return;

    startTransition(async () => {
      const res = await submitRating(slug, value);
      if (res.success) {
        setHasVoted(true);
      } else {
        alert(res.error || "Failed to submit rating");
      }
    });
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((s) => {
      // Determine fill state
      // Current behavior: if hoverRating is 3.5, stars 1-3 are full, star 4 is half, star 5 is empty.
      const isFull = hoverRating ? s <= Math.floor(hoverRating) : s <= Math.floor(rating);
      const isHalf = hoverRating 
        ? s === Math.ceil(hoverRating) && !Number.isInteger(hoverRating)
        : s === Math.ceil(rating) && !Number.isInteger(rating);

      return (
        <button
          key={s}
          onClick={() => handleVote(hoverRating || s)}
          onMouseMove={(e) => {
            if (hasVoted) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const value = x < rect.width / 2 ? s - 0.5 : s;
            setHoverRating(value);
          }}
          onMouseLeave={() => !hasVoted && setHoverRating(0)}
          disabled={hasVoted || isPending}
          style={{ 
            background: 'none', 
            border: 'none', 
            padding: 0, 
            cursor: hasVoted ? 'default' : 'pointer',
            opacity: isPending ? 0.6 : 1,
            transition: 'transform 0.1s',
            transform: !hasVoted && Math.ceil(hoverRating) === s ? 'scale(1.15)' : 'scale(1)'
          }}
        >
          <Star 
            size={24}
            fill={isFull ? "#FFB800" : isHalf ? "url(#grad1)" : "#E5E7EB"}
            stroke={isFull || isHalf ? "#FFB800" : "none"}
            strokeWidth={isHalf ? 1 : 0}
            style={{ transition: 'fill 0.1s' }}
          />
        </button>
      );
    });
  };

  const getGradientOffset = () => {
    if (hoverRating) {
      return Number.isInteger(hoverRating) ? "100%" : "50%";
    }
    return `${(rating % 1) * 100}%`;
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        {renderStars()}
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset={getGradientOffset()} style={{ stopColor: '#FFB800', stopOpacity: 1 }} />
              <stop offset={getGradientOffset()} style={{ stopColor: '#E5E7EB', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '8px' }}>
        <span style={{ fontSize: '18px', fontWeight: 600, color: '#111827' }}>
          {votes.toLocaleString()} {votes <= 1 ? 'vote' : 'votes'} {rating > 0 ? rating.toFixed(1) : "0"}/5
          {hasVoted && <span style={{ color: '#10B981', marginLeft: '6px', fontSize: '14px' }}>(Voted)</span>}
        </span>
      </div>
    </div>
  );
}
