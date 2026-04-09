"use client";

import { useState } from "react";
import { Maximize, RotateCcw, Loader2 } from "lucide-react";

export function GameIframe({ title, url }: { title: string; url: string }) {
  const [isLoading, setIsLoading] = useState(true);

  const toggleFullScreen = () => {
    const iframe = document.getElementById("game-iframe");
    if (iframe?.requestFullscreen) {
      iframe.requestFullscreen();
    }
  };

  const reloadGame = () => {
    setIsLoading(true);
    const iframe = document.getElementById("game-iframe") as HTMLIFrameElement;
    if (iframe) iframe.src = url;
  };

  return (
    <div style={{ position: 'relative', width: '100%', borderRadius: 'var(--radius-xl)', overflow: 'hidden', background: '#000', border: '1px solid var(--border-standard)' }}>
      {/* Toolbar */}
      <div className="util-flex" style={{ 
        padding: '8px 16px', 
        background: 'var(--bg-panel)', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '1px solid var(--border-standard)'
      }}>
        <div style={{ fontSize: '14px', fontWeight: 510, color: 'var(--text-secondary)' }}>{title}</div>
        <div className="util-flex" style={{ gap: '12px' }}>
          <button onClick={reloadGame} className="util-flex-center" style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer' }} title="Reload">
            <RotateCcw size={18} />
          </button>
          <button onClick={toggleFullScreen} className="util-flex-center" style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer' }} title="Fullscreen">
            <Maximize size={18} />
          </button>
        </div>
      </div>

      {/* Game Area */}
      <div style={{ position: 'relative', aspectRatio: '16/9', background: '#000' }}>
        {isLoading && (
          <div className="util-flex-center" style={{ position: 'absolute', inset: 0, zIndex: 10, background: '#000' }}>
            <Loader2 className="animate-spin" size={32} color="var(--accent-violet)" />
          </div>
        )}
        <iframe
          id="game-iframe"
          src={url}
          title={title}
          style={{ width: '100%', height: '100%', border: 'none' }}
          allow="fullscreen; autoplay; encrypted-media"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
}
