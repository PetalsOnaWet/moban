"use client";

import { Tag, Globe, Download, Gamepad2, Monitor, Trophy } from "lucide-react";

const tags = [
  { name: "Rhythm Games", icon: Tag },
  { name: "Music Games", icon: Tag },
  { name: "Jumping Games", icon: Tag },
  { name: "Flying Games", icon: Tag },
  { name: "Platform Game", icon: Tag },
  { name: "Geometry Dash Levels", icon: Tag },
  { name: "Unblocked Games", icon: Globe, isSpecial: true },
  { name: "Pc", icon: Monitor },
  { name: "Download", icon: Download },
  { name: "Online", icon: Globe },
  { name: "Racing", icon: Tag },
  { name: "Obstacle", icon: Tag },
  { name: "Speed", icon: Tag },
  { name: "Survival", icon: Tag },
  { name: "Game", icon: Tag }
];

export function GameTags() {
  return (
    <div style={{ marginTop: '48px', marginBottom: '48px' }}>
      <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '24px', color: '#111827' }}>Categories & Tags</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        {tags.map((tag, idx) => {
          const Icon = tag.icon;
          return (
            <button 
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 20px',
                background: '#F3F4F6',
                borderRadius: '99px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.2s',
                fontSize: '14px',
                fontWeight: 600,
                color: '#374151',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#E5E7EB'}
              onMouseOut={(e) => e.currentTarget.style.background = '#F3F4F6'}
            >
              {tag.isSpecial ? (
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#6366F1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={14} color="#FFF" />
                  </div>
              ) : (
                  <Icon size={18} color="#9CA3AF" />
              )}
              {tag.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
