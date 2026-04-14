"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      gap: '8px',
      marginTop: '40px'
    }}>
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            background: page === currentPage ? '#6366F1' : 'transparent',
            color: page === currentPage ? '#FFFFFF' : '#4B5563',
          }}
        >
          {page}
        </button>
      ))}
      
      <button style={btnStyle}><ChevronRight size={18} /></button>
      <button style={btnStyle}><span style={{ fontWeight: 800 }}>&gt;|</span></button>
    </div>
  );
}

const btnStyle = {
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  border: 'none',
  background: 'transparent',
  color: '#4B5563',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer'
};
