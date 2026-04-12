"use client";

import { PlusCircle } from "lucide-react";

const ads = [
  "Video Games", "Games", "Game", "Computer & Video Games",
  "Casual Games", "Browser Games", "Action & Platform Games"
];

export function DiscoveryAds() {
  return (
    <div style={{ margin: '32px 0 24px' }}>
      <div style={{ 
        fontSize: '11px', 
        fontWeight: 700, 
        color: 'var(--text-tertiary)', 
        marginLeft: '140px', // Align with the start of the pills
        marginBottom: '6px'
      }}>
        Advertisement
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
        <span style={{ fontSize: '15px', color: '#6B7280', fontWeight: 500, paddingTop: '8px' }}>Discover more</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', flex: 1 }}>
          {ads.map((ad, i) => (
            <button 
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: '#FFF',
                border: '1px solid #E5E7EB',
                borderRadius: '99px',
                padding: '8px 16px',
                color: '#2563EB', // Blue link color
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}
            >
              <PlusCircle size={14} color="#3B82F6" />
              {ad}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
