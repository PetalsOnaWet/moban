import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="util-flex" style={{ fontSize: '14px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
      <Link href="/" className="util-flex-center" style={{ color: 'var(--text-tertiary)', gap: '4px' }}>
        <Home size={14} />
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="util-flex-center" style={{ gap: '8px' }}>
          <ChevronRight size={14} color="var(--text-quaternary)" />
          {item.href ? (
            <Link href={item.href} style={{ color: 'var(--text-tertiary)' }}>
              {item.label}
            </Link>
          ) : (
            <span style={{ color: 'var(--text-primary)', fontWeight: 510 }}>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
