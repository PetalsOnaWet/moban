"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Maximize, Loader2, Share2, X as CloseIcon } from "lucide-react";
import { ShareModal } from "./ShareModal";

export function GameIframe({ title, url }: { title: string; url: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleFullScreen = () => {
    const iframe = document.getElementById(isPopupOpen ? "game-iframe-popup" : "game-iframe");
    if (iframe?.requestFullscreen) {
      iframe.requestFullscreen();
    }
  };

  const PopupIcon = ({ size = 20, color = 'currentColor' }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <rect x="7" y="9" width="10" height="6" />
    </svg>
  );

  const ControlBar = ({ inPopup = false }: { inPopup?: boolean }) => (
    <div style={{ 
      padding: '12px 24px', 
      background: inPopup ? '#FFFFFF' : '#F1F5F9',
      display: 'flex',
      justifyContent: 'space-between', 
      alignItems: 'center',
      borderTop: inPopup ? 'none' : '1px solid #E2E8F0',
      borderBottomLeftRadius: inPopup ? '12px' : '0',
      borderBottomRightRadius: inPopup ? '12px' : '0',
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
          onClick={() => setIsPopupOpen(!isPopupOpen)}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: isPopupOpen ? 'var(--accent-cyan)' : '#64748B', 
            cursor: 'pointer', 
            display: 'flex' 
          }} 
          title={isPopupOpen ? "Close Window" : "Pop-out Window"}
        >
          <PopupIcon size={20} color={isPopupOpen ? 'var(--accent-cyan)' : '#64748B'} />
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
  );

  const IframeContent = ({ id }: { id: string }) => (
    <iframe
      id={id}
      src={url}
      title={title}
      style={{ width: '100%', height: '100%', border: 'none' }}
      allow="fullscreen; autoplay; encrypted-media"
      onLoad={() => setIsLoading(false)}
    />
  );

  // Focus Overlay UI
  const renderPopup = () => {
    if (!isPopupOpen || !mounted) return null;
    return createPortal(
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 5000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(8px)',
        padding: '24px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          height: '85vh',
          background: '#000',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}>
          {/* Close Button Top Right */}
          <button 
            onClick={() => setIsPopupOpen(false)}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              zIndex: 100,
              background: 'rgba(0,0,0,0.5)',
              border: 'none',
              borderRadius: '50%',
              padding: '8px',
              color: '#FFF',
              cursor: 'pointer'
            }}
          >
            <CloseIcon size={24} />
          </button>

          <div style={{ flex: 1, position: 'relative', background: '#000' }}>
             <IframeContent id="game-iframe-popup" />
          </div>
          <ControlBar inPopup={true} />
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        background: 'var(--bg-panel)', 
        borderRadius: '2px',
        overflow: 'hidden',
        border: '1px solid var(--border-subtle)'
      }}>
        {/* Regular Game Area */}
        <div style={{ 
          position: 'relative', 
          width: '100%',
          height: '75vh', 
          background: '#000' 
        }}>
          {isLoading && (
            <div className="util-flex-center" style={{ position: 'absolute', inset: 0, zIndex: 10, background: '#000' }}>
              <Loader2 className="animate-spin" size={32} color="var(--accent-cyan)" />
            </div>
          )}
          <IframeContent id="game-iframe" />
        </div>

        <ControlBar />

        <ShareModal 
          isOpen={isShareOpen} 
          onClose={() => setIsShareOpen(false)} 
          title={title} 
        />
      </div>

      {renderPopup()}
    </>
  );
}
