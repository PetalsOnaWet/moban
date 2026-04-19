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
  Music, 
  Activity, 
  Car, 
  Ghost, 
  Sword, 
  Trophy, 
  Box, 
  Terminal, 
  History as ClassicIcon
} from "lucide-react";

import { getCategories } from "@/lib/core/games";

const iconMap: Record<string, any> = {
  "Rhythm": Activity,
  "Racing": Car,
  "Arcade": Gamepad2,
  "Horror": Ghost,
  "Action": Sword,
  "Sports": Trophy,
  "Sandbox": Box,
  "Simulation": Terminal,
  "Classic": ClassicIcon,
};

const staticLinks = [
  { name: "Home", href: "/", icon: Home, color: "var(--text-secondary)" },
  { name: "History", href: "/history", icon: History, color: "var(--text-secondary)" },
  { type: "separator" },
  { name: "Hot Games", href: "/hot-games", icon: Flame, color: "#EF4444", badge: "HOT" },
  { name: "New Games", href: "/new-games", icon: Star, color: "#F59E0B", badge: "NEW" },
];

const categoryColorMap: Record<string, string> = {
  "Rhythm": "#A855F7",   // Purple
  "Racing": "#22D3EE",   // Cyan
  "Arcade": "#FACC15",   // Yellow
  "Horror": "#EF4444",   // Red
  "Action": "#F97316",   // Orange
  "Sports": "#10B981",   // Green
  "Sandbox": "#6366F1",  // Indigo
  "Simulation": "#EC4899", // Pink
  "Classic": "#8B5CF6",   // Violet
};

export function Sidebar() {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const { sidebarOpen, closeSidebar } = useUI();
  
  const categories = getCategories();
  const dynamicLinks = categories.map(cat => ({
    name: `${cat.name} Games`,
    href: `/${cat.slug}`,
    icon: iconMap[cat.name] || Gamepad2,
    color: categoryColorMap[cat.name] || "var(--accent-cyan)"
  }));

  const sidebarLinks = [...staticLinks, ...dynamicLinks];

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
        {sidebarLinks.map((item: any, idx) => {
          if ('type' in item && item.type === "separator") {
            return (
              <div 
                key={`sep-${idx}`} 
                style={{ 
                  height: '1px', 
                  background: 'var(--border-subtle)', 
                  margin: '12px 12px',
                  opacity: 0.5
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
