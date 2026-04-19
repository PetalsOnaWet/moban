"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, Sun, Moon, Menu, X } from "lucide-react";
import { useUI } from "@/context/UIContext";

export function Navbar() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { toggleSidebar, sidebarOpen } = useUI();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
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
      padding: '0 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      transition: 'all 0.3s ease'
    }}>
      {/* Left: Hamburger & Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button 
          onClick={toggleSidebar}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: 'var(--text-primary)', 
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center'
          }}
          className="mobile-only"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <Link href="/" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          textDecoration: 'none',
          gap: '10px'
        }}>
          <Image 
            src="/logo.png" 
            alt="Unblocked Games 76 Logo" 
            width={40} 
            height={40} 
            style={{ objectFit: 'contain', height: '32px', width: 'auto' }}
            priority
          />
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '22px', fontWeight: 900, letterSpacing: '-0.02em' }}>
            <span style={{ color: '#FFB400' }}>UNBLOCKED</span>
            <span style={{ color: 'var(--text-primary)', marginLeft: '6px' }}>GAMES</span>
            <span style={{ color: '#00E5FF', marginLeft: '6px' }}>76</span>
          </div>
        </Link>
      </div>

      {/* Center: Rounded Search Bar (Desktop Only) */}
      <div style={{ flex: 1, maxWidth: '600px', margin: '0 24px', position: 'relative' }} className="desktop-only">
        <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent-cyan)' }}>
          <Search size={18} strokeWidth={2.5} />
        </div>
        <input 
          type="text" 
          placeholder="Search for games..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && searchQuery.trim()) {
              router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            }
          }}
          style={{ 
            width: '100%', 
            height: '42px', 
            background: 'var(--bg-input)', 
            border: '1px solid var(--border-subtle)',
            borderRadius: '99px',
            padding: '0 16px 0 48px',
            fontSize: '14px',
            color: 'var(--text-primary)',
            outline: 'none',
            transition: 'all 0.2s'
          }}
          className="search-input-focus"
        />
      </div>

      {/* Right: Actions */}
      <div className="util-flex" style={{ gap: '12px', alignItems: 'center' }}>
        <button 
          className="mobile-only" 
          style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', padding: '8px', cursor: 'pointer' }}
          onClick={() => router.push('/search')}
        >
            <Search size={22} />
        </button>
        
        {/* Fancy Theme Switcher */}
        <div 
          onClick={toggleTheme}
          style={{ 
            width: '60px', 
            height: '30px', 
            background: 'var(--bg-input)', 
            borderRadius: '99px', 
            display: 'flex', 
            alignItems: 'center', 
            padding: '0 4px', 
            cursor: 'pointer',
            position: 'relative',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <div style={{ 
            position: 'absolute',
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366F1, #D946EF)',
            left: theme === 'light' ? 'calc(100% - 26px)' : '4px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(99, 102, 241, 0.4)'
          }}>
            {theme === 'light' ? <Sun size={12} color="#FFF" fill="currentColor" /> : <Moon size={12} color="#FFF" fill="currentColor" />}
          </div>
        </div>
      </div>
    </header>
  );
}
