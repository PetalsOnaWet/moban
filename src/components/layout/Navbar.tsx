import Link from "next/link";
import { siteConfig } from "@/config/site";
import { SearchBox } from "@/components/games/SearchBox";

export function Navbar() {
  return (
    <nav className="util-glass" style={{ position: 'sticky', top: 0, zIndex: 100, padding: '0.75rem 0' }}>
      <div className="util-container util-flex" style={{ justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
        <Link href="/" style={{ fontWeight: 590, fontSize: '1.25rem', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
          {siteConfig.name}
        </Link>
        
        <div className="util-flex" style={{ flex: 1, justifyContent: 'center', maxWidth: '400px' }}>
          <SearchBox />
        </div>

        <div className="util-flex" style={{ gap: '24px', fontSize: '14px', fontWeight: 510, color: 'var(--text-secondary)', alignItems: 'center' }}>
          <Link href="/#features" className="util-hide-mobile">Categories</Link>
          <Link href="/#faq" className="util-hide-mobile">FAQ</Link>
          <button className="util-btn-primary" style={{ padding: '6px 16px' }}>Play Now</button>
        </div>
      </div>
    </nav>
  );
}
