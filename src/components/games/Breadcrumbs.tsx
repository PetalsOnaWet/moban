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
    <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', color: 'var(--text-tertiary)' }}>
      <Link href="/" style={{ color: categoryName ? 'var(--text-tertiary)' : 'var(--text-secondary)', textDecoration: 'none', fontWeight: categoryName ? 400 : 700 }}>Home</Link>
      
      {categoryName && (
        <>
          <ChevronRight size={14} />
          <Link href={`/${categorySlug || categoryName.toLowerCase().replace(/\s+/g, '-')}`} style={{ color: 'var(--accent-cyan)', textDecoration: 'none', fontWeight: 500 }}>
            {categoryName}
          </Link>
        </>
      )}

      {gameTitle && (
        <>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--text-tertiary)' }}>{gameTitle}</span>
        </>
      )}
    </nav>
  );
}
