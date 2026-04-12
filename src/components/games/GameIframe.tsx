"use client";

import { useState } from "react";
import { Maximize, Loader2, Share2, Monitor } from "lucide-react";
import { ShareModal } from "./ShareModal";

export function GameIframe({ title, url }: { title: string; url: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const toggleFullScreen = () => {
    const iframe = document.getElementById("game-iframe");
    if (iframe?.requestFullscreen) {
      iframe.requestFullscreen();
    }
  };

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      background: 'var(--bg-panel)', 
      borderRadius: '2px', // Sharper edges matching screenshot
      overflow: 'hidden',
      border: '1px solid var(--border-subtle)'
    }}>
      {/* Game Area */}
      <div style={{ 
        position: 'relative', 
        width: '100%',
        height: '600px', // Custom height matching screenshot
        background: '#000' 
      }}>
        {isLoading && (
          <div className="util-flex-center" style={{ position: 'absolute', inset: 0, zIndex: 10, background: '#000' }}>
            <Loader2 className="animate-spin" size={32} color="var(--accent-cyan)" />
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

      {/* Control Bar - Grey background matching screenshot */}
      <div style={{ 
        padding: '12px 24px', 
        background: '#F1F5F9', // Solid light grey
        display: 'flex',
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderTop: '1px solid #E2E8F0'
      }}>
        <div style={{ fontSize: '15px', fontWeight: 700, color: '#1E293B' }}>{title}</div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <button 
            onClick={() => setIsShareOpen(true)}
            style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', display: 'flex' }} 
            title="Share"
          >
            <Share2 size={20} />
          </button>
          <button 
            style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', display: 'flex' }} 
            title="Theater Mode"
          >
            <Monitor size={20} />
          </button>
          <button 
            onClick={toggleFullScreen} 
            style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', display: 'flex' }} 
            title="Fullscreen"
          >
            <Maximize size={20} />
          </button>
        </div>
      </div>

      <ShareModal 
        isOpen={isShareOpen} 
        onClose={() => setIsShareOpen(false)} 
        title={title} 
      />
    </div>
  );
}
