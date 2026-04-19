"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Game } from "@/lib/core/games";
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
      <div className="util-container" style={{ padding: '32px 16px' }}>
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
              <BentoGrid games={visibleItems as Game[]} />
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

        <div style={{ marginTop: '80px', borderTop: '1px solid var(--border-subtle)', paddingTop: '64px' }}>
          <article style={{ color: 'var(--text-secondary)', lineHeight: '1.9', fontSize: '15px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '32px' }}>Track Your Gaming Journey on Unblocked Games 76</h2>
            <p style={{ marginBottom: '20px' }}>
              Your <strong>Play History</strong> is more than just a list of games; it's a record of your achievements, your favorite moments, and your growth as a gamer. At <strong>Unblocked Games 76</strong>, we understand that finding that one perfect game you played yesterday shouldn't be a challenge. That's why we've implemented this local history tracking system, designed to keep your favorite titles just a click away.
            </p>
            
            <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px', color: 'var(--text-primary)' }}>How Local History Works</h3>
            <p style={{ marginBottom: '20px' }}>
              Unlike other platforms that require you to create an account and store your data on their servers, our history system is 100% local. We use your browser's <code>localStorage</code> technology to save the metadata of the games you play. This means your data stays on your device, ensuring maximum privacy and near-instant load times. Whether you're switching between classes or taking a break at work, your most recent sessions are always preserved right here on this page.
            </p>
            
            <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px', color: 'var(--text-primary)' }}>The Benefits of Tracking Your Playtime</h3>
            <p style={{ marginBottom: '20px' }}>
              Maintaining a play history offers several advantages for the dedicated gamer:
            </p>
            <ul style={{ marginBottom: '24px', paddingLeft: '20px', listStyleType: 'disc', lineHeight: '1.8' }}>
              <li style={{ marginBottom: '12px' }}><strong>Quick Access:</strong> Don't waste time searching for that addictive platformer or intense racing game. It's right here.</li>
              <li style={{ marginBottom: '12px' }}><strong>Discover Patterns:</strong> See which genres you enjoy the most. Are you a fan of high-speed arcade games or strategic puzzles?</li>
              <li style={{ marginBottom: '12px' }}><strong>Never Lose a Gem:</strong> Sometimes you stumble upon a hidden masterpiece. Our history ensures it doesn't get lost in our vast library of over 1,000 games.</li>
            </ul>

            <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px', color: 'var(--text-primary)' }}>Our Commitment to Privacy and Security</h3>
            <p style={{ marginBottom: '20px' }}>
              At <strong>Unblocked Games 76</strong>, we take your privacy seriously. By utilizing local storage rather than server-side databases for your history, we eliminate the need for accounts and personal data collection. Your gaming habits are your business. We only provide the tools to help you manage them. This local-first approach also makes our site faster and more resilient, especially on restrictive networks where external database calls might be throttled.
            </p>

            <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px', color: 'var(--text-primary)' }}>Building the Best Unblocked Gaming Experience</h3>
            <p style={{ marginBottom: '20px' }}>
              The history page is just one of the many features that set <strong>Unblocked Games 76</strong> apart. We are constantly innovating to provide a premium, "app-like" experience within your browser. From our high-speed edge hosting to our curated library of HTML5 titles, every aspect of our site is optimized for performance and ease of use. If you have suggestions on how we can improve the history feature—perhaps by adding categories or sorting options—we'd love to hear from you via our <Link href="/contact" style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>Contact Page</Link>.
            </p>

            <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px', color: 'var(--text-primary)' }}>Mastering Your Favorites</h3>
            <p style={{ marginBottom: '20px' }}>
              The more you play, the better you get. Use your history to return to challenging levels in games like <em>Slope</em> or <em>Moto X3M</em>. Consistency is key to mastering the mechanics of our high-skill titles. We are proud to be your home for unblocked entertainment and are excited to see where your gaming journey takes you next.
            </p>
            
            <p style={{ marginBottom: '20px' }}>
              In conclusion, whether you're here to beat your high score or just to kill a few minutes, Unblocked Games 76 is dedicated to making your experience as smooth as possible. Dive back into your history, find your favorites, and keep the fun going!
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}
