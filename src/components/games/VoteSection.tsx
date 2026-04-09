"use client";

import { useState, useEffect } from "react";
import { Star, Loader2, Check } from "lucide-react";
import { submitRating, getPageStats } from "@/lib/core/actions";

interface VoteSectionProps {
  pageId: string;
  initialStats?: { avgRating: number | null; total: number };
}

export function VoteSection({ pageId, initialStats }: VoteSectionProps) {
  const [stats, setStats] = useState(initialStats || { avgRating: 0, total: 0 });
  const [userRating, setUserRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!initialStats) {
      getPageStats(pageId).then(setStats);
    }
  }, [pageId, initialStats]);

  const handleVote = async (rating: number) => {
    if (isSubmitting || isSuccess) return;
    setIsSubmitting(true);
    const res = await submitRating(pageId, rating);
    if (res.success) {
      setIsSuccess(true);
      setUserRating(rating);
      // Refresh stats
      const newStats = await getPageStats(pageId);
      setStats(newStats);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="util-card" style={{ background: 'var(--bg-panel)', padding: '24px' }}>
      <div className="util-flex" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1.25rem' }}>Rate this Game</h3>
        <div className="util-flex" style={{ gap: '8px', alignItems: 'baseline' }}>
          <span style={{ fontSize: '24px', fontWeight: 600, color: 'var(--text-primary)' }}>
            {stats.avgRating?.toFixed(1) || "0.0"}
          </span>
          <span style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>({stats.total} votes)</span>
        </div>
      </div>

      <div className="util-flex-center" style={{ gap: '8px', padding: '12px 0' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            disabled={isSubmitting || isSuccess}
            onMouseEnter={() => !isSuccess && setHoverRating(star)}
            onMouseLeave={() => !isSuccess && setHoverRating(null)}
            onClick={() => handleVote(star)}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: isSuccess ? 'default' : 'pointer',
              color: (hoverRating || userRating || 0) >= star ? '#fbbf24' : 'var(--border-secondary)',
              transition: 'transform 0.1s ease'
            }}
          >
            <Star 
              size={36} 
              fill={(hoverRating || userRating || 0) >= star ? "currentColor" : "none"} 
              strokeWidth={1.5}
            />
          </button>
        ))}
      </div>

      <div style={{ textAlign: 'center', height: '24px', marginTop: '12px' }}>
        {isSubmitting && <Loader2 className="animate-spin" size={16} style={{ margin: '0 auto' }} />}
        {isSuccess && (
          <div style={{ color: 'var(--accent-violet)', fontSize: '14px', fontWeight: 510 }}>
            <Check size={14} style={{ display: 'inline', marginRight: '4px' }} />
            Thanks for voting!
          </div>
        )}
        {!isSubmitting && !isSuccess && (
          <p style={{ color: 'var(--text-tertiary)', fontSize: '14px' }}>
            {hoverRating ? `Rate ${hoverRating} out of 5` : "Click a star to vote"}
          </p>
        )}
      </div>
    </div>
  );
}
