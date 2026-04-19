"use client";

import { useState } from "react";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

interface GameGalleryProps {
  screenshots?: string[];
  title: string;
}

export function GameGallery({ screenshots, title }: GameGalleryProps) {
  const [activeImg, setActiveImg] = useState<number | null>(null);

  if (!screenshots || screenshots.length === 0) return null;

  const nextImg = () => {
    if (activeImg === null) return;
    setActiveImg((activeImg + 1) % screenshots.length);
  };

  const prevImg = () => {
    if (activeImg === null) return;
    setActiveImg((activeImg - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <section style={{ marginTop: '48px', marginBottom: '48px' }}>
      <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '24px', color: 'var(--text-primary)' }}>
        {title} Screenshots
      </h3>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', 
        gap: '16px' 
      }}>
        {screenshots.map((src, idx) => (
          <div 
            key={idx}
            onClick={() => setActiveImg(idx)}
            style={{
              position: 'relative',
              aspectRatio: '16/9',
              borderRadius: '12px',
              overflow: 'hidden',
              cursor: 'pointer',
              border: '1px solid var(--border-subtle)',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <img 
              src={src} 
              alt={`${title} Screenshot ${idx + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                // If the user hasn't added the screenshot yet, show a nice placeholder
                (e.target as HTMLImageElement).src = `https://placehold.co/600x400/111/fff?text=${encodeURIComponent(title)}+Screenshot`;
              }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.2)',
              opacity: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'opacity 0.2s'
            }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}>
              <Maximize2 color="white" size={24} />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {activeImg !== null && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.9)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(8px)'
          }}
          onClick={() => setActiveImg(null)}
        >
          <button 
            onClick={(e) => { e.stopPropagation(); setActiveImg(null); }}
            style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
          >
            <X size={32} />
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); prevImg(); }}
            style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '12px', borderRadius: '50%', cursor: 'pointer' }}
          >
            <ChevronLeft size={32} />
          </button>

          <img 
            src={screenshots[activeImg]} 
            alt="Fullscreen View"
            style={{ maxWidth: '90%', maxHeight: '85%', borderRadius: '8px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}
            onClick={(e) => e.stopPropagation()}
            onError={(e) => {
               (e.target as HTMLImageElement).src = `https://placehold.co/1200x800/111/fff?text=${encodeURIComponent(title)}+Screenshot`;
            }}
          />

          <button 
            onClick={(e) => { e.stopPropagation(); nextImg(); }}
            style={{ position: 'absolute', right: '24px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '12px', borderRadius: '50%', cursor: 'pointer' }}
          >
            <ChevronRight size={32} />
          </button>

          <div style={{ position: 'absolute', bottom: '24px', color: 'white', fontSize: '14px', fontWeight: 600 }}>
            {activeImg + 1} / {screenshots.length}
          </div>
        </div>
      )}
    </section>
  );
}
