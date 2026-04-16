"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Maximize, Loader2, Share2, X as CloseIcon } from "lucide-react";
import { ShareModal } from "./ShareModal";

export function GameIframe({ title, url }: { title: string; url: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    
    const handleFullscreenChange = () => {
      // @ts-ignore - Handle multiple browser vendors
      const isFull = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
      setIsFullscreen(isFull);
    };

    // Safety timeout: force hide loader after 5 seconds if onLoad doesn't fire
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    const events = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'msfullscreenchange'];
    events.forEach(event => document.addEventListener(event, handleFullscreenChange));
    
    return () => {
      events.forEach(event => document.removeEventListener(event, handleFullscreenChange));
      clearTimeout(timer);
    };
  }, []);

  const requestFullscreen = (element: HTMLElement) => {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if ((element as any).webkitRequestFullscreen) {
      (element as any).webkitRequestFullscreen();
    } else if ((element as any).mozRequestFullScreen) {
      (element as any).mozRequestFullScreen();
    } else if ((element as any).msRequestFullscreen) {
      (element as any).msRequestFullscreen();
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    } else if ((document as any).mozCancelFullScreen) {
      (document as any).mozCancelFullScreen();
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen();
    }
  };

  const toggleFullScreen = () => {
    const target = isPopupOpen ? document.getElementById("game-popup-container") : containerRef.current;
    if (!isFullscreen) {
      if (target) requestFullscreen(target);
    } else {
      exitFullscreen();
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
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%', 
        height: '100%', 
        border: 'none',
        zIndex: 1
      }}
      allow="fullscreen; autoplay; encrypted-media"
      onLoad={() => setIsLoading(false)}
    />
  );

  const FullscreenCloseButton = () => (
    isFullscreen && (
      <button 
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); exitFullscreen(); }}
        onTouchStart={(e) => { e.preventDefault(); e.stopPropagation(); exitFullscreen(); }}
        style={{
          position: 'absolute',
          top: '20px',
          right: '24px',
          zIndex: 99999,
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          border: '2px solid rgba(255,255,255,0.2)',
          borderRadius: '50%',
          width: '56px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
          pointerEvents: 'auto',
          touchAction: 'none'
        }}
      >
        <CloseIcon size={32} strokeWidth={2.5} />
      </button>
    )
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
        <div 
          onClick={(e) => e.stopPropagation()}
          id="game-popup-container"
          style={{
            width: '100%',
            maxWidth: '1200px',
            height: isFullscreen ? '100vh' : '85vh',
            aspectRatio: isFullscreen ? 'auto' : '16 / 9',
            background: '#000',
            borderRadius: isFullscreen ? '0' : '12px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}
        >
          {/* Close Button Top Right (Window mode only) */}
          {!isFullscreen && (
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
          )}

          <div style={{ flex: 1, position: 'relative', background: '#000' }}>
             <IframeContent id="game-iframe-popup" />
          </div>
          {!isFullscreen && <ControlBar inPopup={true} />}
          
          {/* Exit Button Rendered Last for Native Depth */}
          <FullscreenCloseButton />
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      <div 
        ref={containerRef}
        style={{ 
          position: 'relative', 
          width: '100%', 
          background: 'var(--bg-panel)', 
          borderRadius: '2px',
          overflow: isFullscreen ? 'visible' : 'hidden',
          border: isFullscreen ? 'none' : '1px solid var(--border-subtle)',
          zIndex: isFullscreen ? 10000 : 'auto'
        }}
      >
        {/* Regular Game Area */}
        <div style={{ 
          position: 'relative', 
          width: '100%',
          height: isFullscreen ? '100vh' : 'auto', 
          aspectRatio: isFullscreen ? 'auto' : '16 / 9',
          maxHeight: isFullscreen ? 'none' : '75vh',
          background: '#000' 
        }}>
          {isLoading && (
            <div className="util-flex-center" style={{ 
              position: 'absolute', 
              inset: 0, 
              zIndex: 10, 
              background: '#000',
              pointerEvents: 'none' 
            }}>
              <Loader2 className="animate-spin" size={32} color="var(--accent-cyan)" />
            </div>
          )}
          <IframeContent id="game-iframe" />
        </div>

        {!isFullscreen && <ControlBar />}

        <ShareModal 
          isOpen={isShareOpen} 
          onClose={() => setIsShareOpen(false)} 
          title={title} 
        />

        {/* Exit Button Rendered Last for Native Depth */}
        <FullscreenCloseButton />
      </div>

      {renderPopup()}
    </>
  );
}
