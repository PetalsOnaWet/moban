"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Sun, Moon } from "lucide-react";

export function Navbar() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  if (!mounted) return (
     <header style={{ height: '70px', background: 'var(--bg-panel)', borderBottom: '1px solid var(--border-standard)' }} />
  );

  return (
    <header style={{ 
      height: '70px', 
      background: 'var(--bg-panel)', 
      borderBottom: '1px solid var(--border-standard)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      padding: '0 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      transition: 'all 0.3s ease'
    }}>
      {/* Left: Multicolored Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
        <div style={{ position: 'relative', width: '38px', height: '38px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-standard)' }}>
          <img 
            src="/logo.webp" 
            alt="Logo" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover'
            }} 
          />
        </div>
        <div style={{ display: 'flex', fontSize: '20px', fontWeight: 900, letterSpacing: '-0.02em' }}>
          <span style={{ color: '#FFB400' }}>GEOMETRY</span>
          <span style={{ color: 'var(--text-primary)', marginLeft: '4px' }}>DASH</span>
          <span style={{ color: '#00E5FF', marginLeft: '4px' }}>LITE</span>
        </div>
      </Link>

      {/* Center: Rounded Search Bar */}
      <div style={{ flex: 1, maxWidth: '600px', margin: '0 48px', position: 'relative' }}>
        <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }}>
          <Search size={18} />
        </div>
        <input 
          type="text" 
          placeholder="Search for games..." 
          style={{ 
            width: '100%', 
            height: '42px', 
            background: 'var(--bg-input)', 
            border: 'none', 
            borderRadius: '99px', 
            padding: '0 16px 0 48px',
            fontSize: '14px',
            outline: 'none',
            color: 'var(--text-primary)',
            transition: 'background 0.3s ease'
          }}
        />
      </div>

      {/* Right: Actions */}
      <div className="util-flex" style={{ gap: '20px', alignItems: 'center' }}>
        {/* Fancy Theme Switcher */}
        <div 
          onClick={toggleTheme}
          style={{ 
            width: '68px', 
            height: '34px', 
            background: 'rgba(0,0,0,0.05)', 
            borderRadius: '99px', 
            display: 'flex', 
            alignItems: 'center', 
            padding: '0 4px', 
            cursor: 'pointer',
            position: 'relative',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '0 6px', color: '#94A3B8' }}>
            <Moon size={14} fill={theme === 'dark' ? 'currentColor' : 'none'} />
            <Sun size={14} fill={theme === 'light' ? 'currentColor' : 'none'} />
          </div>
          <div style={{ 
            position: 'absolute',
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366F1, #D946EF)',
            left: theme === 'light' ? 'calc(100% - 30px)' : '4px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(99, 102, 241, 0.4)'
          }}>
            {theme === 'light' ? <Sun size={14} color="#FFF" fill="currentColor" /> : <Moon size={14} color="#FFF" fill="currentColor" />}
          </div>
        </div>
      </div>
    </header>
  );
}
