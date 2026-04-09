"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

export function SearchBox({ className = "", placeholder = "Search for games..." }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className={`util-flex-center ${className}`} 
      style={{ 
        position: 'relative', 
        width: '100%', 
        maxWidth: '400px' 
      }}
    >
      <div style={{ position: 'absolute', left: '12px', color: 'var(--text-tertiary)' }}>
        <Search size={18} />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="util-glass"
        style={{
          width: '100%',
          padding: '10px 12px 10px 40px',
          borderRadius: 'var(--radius-pill)',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid var(--border-standard)',
          color: 'var(--text-primary)',
          fontSize: '14px',
          outline: 'none',
          transition: 'all 0.2s ease'
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent-violet)';
          e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-standard)';
          e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
        }}
      />
      {query && (
        <button 
          type="button" 
          onClick={() => setQuery("")}
          style={{ 
            position: 'absolute', 
            right: '12px', 
            background: 'none', 
            border: 'none', 
            color: 'var(--text-tertiary)', 
            cursor: 'pointer' 
          }}
        >
          <X size={16} />
        </button>
      )}
    </form>
  );
}
