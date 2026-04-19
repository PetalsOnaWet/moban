"use client";

import { useState } from "react";
import { GameIframe } from "./GameIframe";
import { Server, Zap, Info } from "lucide-react";

interface GamePlayerAreaProps {
  title: string;
  url: string;
  mirror_urls?: string[];
}

export function GamePlayerArea({ title, url, mirror_urls = [] }: GamePlayerAreaProps) {
  const [activeUrl, setActiveUrl] = useState(url);
  const allUrls = [url, ...mirror_urls];

  return (
    <div className="layout-player-grid" style={{ 
      marginTop: '0',
      marginBottom: '24px'
    }}>
      {/* LEFT: Game Player Area */}
      <section style={{ minWidth: 0 }}>
        <GameIframe title={title} url={activeUrl} />
        
        {/* Server Switcher - Premium Gaming Style */}
        {allUrls.length > 1 && (
          <div style={{ 
            marginTop: '20px', 
            padding: '24px', 
            background: 'var(--bg-panel)', 
            borderRadius: '16px',
            border: '1px solid var(--border-subtle)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Background Accent */}
            <div style={{ 
              position: 'absolute', 
              top: 0, 
              right: 0, 
              width: '150px', 
              height: '150px', 
              background: 'var(--accent-cyan)', 
              opacity: 0.03, 
              filter: 'blur(60px)',
              pointerEvents: 'none'
            }} />

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '20px' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Server size={18} color="var(--accent-cyan)" />
                <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
                  Unblocked NODE SELECTOR
                </span>
              </div>
              <div style={{ 
                fontSize: '11px', 
                fontWeight: 700, 
                color: 'var(--accent-cyan)', 
                background: 'rgba(34, 211, 238, 0.1)', 
                padding: '4px 10px', 
                borderRadius: '6px',
                textTransform: 'uppercase'
              }}>
                {allUrls.length} Unblocked Nodes Available
              </div>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', 
              gap: '10px' 
            }}>
              {allUrls.map((u, idx) => {
                const isSelected = activeUrl === u;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveUrl(u)}
                    style={{
                      padding: '12px',
                      borderRadius: '12px',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      border: isSelected ? '2px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                      background: isSelected ? 'rgba(34, 211, 238, 0.08)' : 'var(--bg-input)',
                      color: isSelected ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                      boxShadow: isSelected ? '0 0 15px rgba(34, 211, 238, 0.2)' : 'none',
                      position: 'relative'
                    }}
                  >
                    <div style={{ 
                      width: '6px', 
                      height: '6px', 
                      borderRadius: '50%', 
                      background: isSelected ? 'var(--accent-cyan)' : '#4ade80',
                      boxShadow: isSelected ? '0 0 8px var(--accent-cyan)' : 'none'
                    }} />
                    <span style={{ flex: 1, textAlign: 'left' }}>
                      Unblocked server #{idx + 1}
                    </span>
                    {idx === 0 && <Zap size={12} fill="currentColor" opacity={0.6} />}
                  </button>
                );
              })}
            </div>

            <div style={{ 
              marginTop: '16px', 
              padding: '12px', 
              borderRadius: '8px', 
              background: 'rgba(0,0,0,0.02)', 
              fontSize: '12px', 
              color: 'var(--text-tertiary)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Info size={14} />
              <span>Experiencing lag or a 404 error? Switch to a different node for a better unblocked experience.</span>
            </div>
          </div>
        )}
      </section>

      {/* RIGHT: Top Ad Sidebar (Static) */}
      <aside className="desktop-only" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
