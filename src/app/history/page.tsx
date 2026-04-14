"use client";

import { useState, useEffect, useRef } from "react";
import { getHistory, GameHistoryItem } from "@/lib/core/history";
import { BentoGrid } from "@/components/games/BentoGrid";

export default function HistoryPage() {
  const [historyItems, setHistoryItems] = useState<GameHistoryItem[]>([]);
  const [visibleItems, setVisibleItems] = useState<GameHistoryItem[]>([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;
  
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const allHistory = getHistory();
    setHistoryItems(allHistory);
    setVisibleItems(allHistory.slice(0, itemsPerPage));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleItems.length < historyItems.length) {
          const nextPage = page + 1;
          const nextItems = historyItems.slice(0, nextPage * itemsPerPage);
          setVisibleItems(nextItems);
          setPage(nextPage);
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [historyItems, visibleItems, page]);

  return (
    <div className="animate-fade-in" style={{ padding: '0 0 64px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 48px' }}>
        <main style={{ minWidth: 0 }}>
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ 
              fontSize: '32px', 
              fontWeight: 900, 
              color: 'var(--text-primary)',
              marginBottom: '8px'
            }}>
              Play History
            </h1>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '14px' }}>
              Your recently played games are saved here locally.
            </p>
          </div>

          {visibleItems.length > 0 ? (
            <>
              <BentoGrid games={visibleItems} />
              {/* Infinite Scroll Trigger */}
              <div ref={loaderRef} style={{ height: '40px', background: 'transparent' }} />
            </>
          ) : (
            <div style={{ 
              padding: '100px 0', 
              textAlign: 'center', 
              background: 'var(--bg-input)', 
              borderRadius: '12px',
              border: '2px dashed var(--border-standard)'
            }}>
              <p style={{ color: 'var(--text-tertiary)', fontSize: '16px' }}>
                You haven't played any games yet. Start exploring!
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
