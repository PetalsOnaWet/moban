"use client";

import { GameIframe } from "./GameIframe";

interface GamePlayerAreaProps {
  title: string;
  url: string;
}

export function GamePlayerArea({ title, url }: GamePlayerAreaProps) {
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: '1fr 340px', 
      gap: '12px', 
      marginTop: '0',
      marginBottom: '6px',
      alignItems: 'start'
    }}>
      {/* LEFT: Game Player Area */}
      <section style={{ minWidth: 0 }}>
        <GameIframe title={title} url={url} />
      </section>

      {/* RIGHT: Top Ad Sidebar (Static) */}
      <aside style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border-subtle)', textAlign: 'center', padding: '10px 0' }}>
          <div style={{ 
              background: '#4AB7D8', 
              padding: '2px 12px', 
              textAlign: 'center', 
              color: '#000', 
              fontWeight: 600, 
              fontSize: '10px',
              borderRadius: '4px',
              display: 'inline-block',
              margin: '0 auto 8px',
              width: 'auto'
          }}>
              Advertisement
          </div>
          <div style={{ height: 'calc(75vh + 18px)', background: 'transparent' }} />
        </div>
      </aside>
    </div>
  );
}
