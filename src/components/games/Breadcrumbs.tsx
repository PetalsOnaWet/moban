"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbsProps {
  gameTitle?: string;
  categoryName?: string;
  categorySlug?: string;
}

export function Breadcrumbs({ gameTitle, categoryName, categorySlug }: BreadcrumbsProps) {
  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', color: '#6B7280' }}>
      <Link href="/" style={{ color: categoryName ? '#9CA3AF' : '#6B7280', textDecoration: 'none', fontWeight: categoryName ? 400 : 700 }}>Home</Link>
      
      {categoryName && (
        <>
          <ChevronRight size={14} />
          <Link href={`/${categorySlug || categoryName.toLowerCase().replace(/\s+/g, '-')}`} style={{ color: '#6366F1', textDecoration: 'none', fontWeight: 500 }}>
            {categoryName}
          </Link>
        </>
      )}

      {gameTitle && (
        <>
          <ChevronRight size={14} />
          <span style={{ color: '#9CA3AF' }}>{gameTitle}</span>
        </>
      )}
    </nav>
  );
}
