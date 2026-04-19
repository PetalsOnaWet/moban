"use client";

import Link from 'next/link';
import { Gamepad2, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div style={{ 
      minHeight: '80vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      textAlign: 'center',
      padding: '24px'
    }}>
      {/* 404 Graphic */}
      <div style={{ position: 'relative', marginBottom: '40px' }}>
        <div style={{
          position: 'absolute',
          inset: '-20px',
          background: 'var(--accent-cyan)',
          opacity: 0.1,
          filter: 'blur(40px)',
          borderRadius: '50%'
        }} />
        <Gamepad2 size={120} style={{ color: 'var(--accent-cyan)', position: 'relative', zIndex: 1 }} />
      </div>

      <h1 style={{ 
        fontSize: 'clamp(48px, 8vw, 120px)', 
        fontWeight: 900, 
        color: 'var(--text-primary)',
        lineHeight: 1,
        marginBottom: '16px',
        letterSpacing: '-0.04em'
      }}>
        404
      </h1>
      
      <h2 style={{ 
        fontSize: '24px', 
        fontWeight: 700, 
        color: 'var(--text-primary)',
        marginBottom: '12px' 
      }}>
        Level Not Found
      </h2>
      
      <p style={{ 
        fontSize: '16px', 
        color: 'var(--text-secondary)', 
        maxWidth: '400px', 
        lineHeight: 1.6,
        marginBottom: '40px'
      }}>
        It seems you've wandered into an unmapped area of the game world. This level hasn't been unlocked yet!
      </p>

      <Link href="/" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: 'var(--text-primary)',
        color: 'var(--bg-panel)',
        padding: '16px 32px',
        borderRadius: '16px',
        fontSize: '18px',
        fontWeight: 800,
        textDecoration: 'none',
        transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
      onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <Home size={20} />
        Back to Home Base
      </Link>
    </div>
  );
}
