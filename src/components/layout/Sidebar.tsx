"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useUI } from "@/context/UIContext";
import { 
  Home, 
  History, 
  Flame, 
  Star, 
  Gamepad2, 
  Plane, 
  ArrowUpCircle, 
  Music, 
  Layout, 
  Activity,
  Shuffle
} from "lucide-react";

const sidebarLinks = [
  { name: "Home", href: "/", icon: Home, color: "var(--text-secondary)" },
  { name: "History", href: "/history", icon: History, color: "var(--text-secondary)" },
  { type: "separator" },
  { name: "Hot Games", href: "/hot-games", icon: Flame, color: "#EF4444", badge: "HOT" },
  { name: "New Games", href: "/new-games", icon: Star, color: "#F59E0B", badge: "NEW" },
  { name: "Flying Games", href: "/flying-games", icon: Plane, color: "#94A3B8" },
  { name: "Jumping Games", href: "/jumping-games", icon: ArrowUpCircle, color: "var(--text-primary)" },
  { name: "Music Games", href: "/music-games", icon: Music, color: "var(--text-primary)" },
  { name: "Platform Game", href: "/platformer-games", icon: Layout, color: "#A855F7" },
  { name: "Rhythm Games", href: "/rhythm-games", icon: Activity, color: "#6366F1" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const { sidebarOpen, closeSidebar } = useUI();

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div 
          onClick={closeSidebar}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(4px)',
            zIndex: 49
          }}
          className="mobile-only"
        />
      )}

      <aside 
        className={`sidebar-nav ${isHovered ? 'is-expanded' : ''} ${sidebarOpen ? 'is-open' : ''}`}
        style={{ 
          width: isHovered ? '260px' : '80px',
          boxShadow: isHovered ? '10px 0 30px rgba(0,0,0,0.08)' : 'none'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '0 12px' }}>
        {sidebarLinks.map((item, idx) => {
          if (item.type === "separator") {
            return (
              <div 
                key={`sep-${idx}`} 
                style={{ 
                  height: '1px', 
                  background: 'var(--border-standard)', 
                  margin: '12px 16px',
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.2s'
                }} 
              />
            );
          }

          const isActive = pathname === item.href;
          const Icon = item.icon!;

          return (
            <Link 
              key={item.name} 
              href={item.href!}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                padding: '10px 16px',
                borderRadius: '8px',
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                background: isActive ? 'var(--bg-input)' : 'transparent',
                fontWeight: isActive ? 700 : 500,
                fontSize: '14px',
                transition: 'all 0.2s ease',
                textDecoration: 'none',
                position: 'relative',
                overflow: 'hidden',
                height: '48px'
              }}
            >
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '16px', 
                minWidth: '24px',
                justifyContent: isHovered ? 'flex-start' : 'center',
                width: isHovered ? 'auto' : '100%'
              }}>
                <div style={{ color: item.color, display: 'flex', alignItems: 'center' }}>
                    <Icon size={24} strokeWidth={isActive ? 2.5 : 2} fill={isActive && item.color.startsWith('#') ? `${item.color}33` : 'none'} />
                </div>
                <span style={{ 
                  opacity: isHovered ? 1 : 0, 
                  transition: 'opacity 0.2s ease',
                  whiteSpace: 'nowrap',
                  display: isHovered ? 'inline' : 'none',
                  color: 'var(--text-secondary)'
                }}>
                  {item.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

    </aside>
    </>
  );
}
