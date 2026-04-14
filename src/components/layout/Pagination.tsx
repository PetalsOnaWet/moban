"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (totalPages <= 1) return null;

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      gap: '8px',
      marginTop: '40px'
    }}>
      {/* Previous Page */}
      {currentPage > 1 && (
        <Link href={createPageURL(currentPage - 1)} style={btnStyle}>
          <ChevronLeft size={18} />
        </Link>
      )}

      {/* Pages */}
      {pages.map(page => (
        <Link
          key={page}
          href={createPageURL(page)}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: 700,
            transition: 'all 0.2s ease',
            background: page === currentPage ? '#6366F1' : 'transparent',
            color: page === currentPage ? '#FFFFFF' : '#4B5563',
          }}
        >
          {page}
        </Link>
      ))}

      {/* Next Page */}
      {currentPage < totalPages && (
        <Link href={createPageURL(currentPage + 1)} style={btnStyle}>
          <ChevronRight size={18} />
        </Link>
      )}
    </div>
  );
}

const btnStyle = {
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  background: 'transparent',
  color: '#4B5563',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none'
};
