import { getCategories } from "@/lib/core/games";
import Link from "next/link";

export function Footer() {
  const categories = getCategories();
  
  return (
    <footer style={{ 
      background: 'var(--bg-panel)', 
      borderTop: '1px solid var(--border-standard)', 
      padding: '64px 24px',
      marginTop: '64px'
    }}>
      <div className="util-container">
        {/* Footer Top: Logo & Disclaimer */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', fontSize: '24px', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '16px' }}>
            <span style={{ color: '#FFB400' }}>UNBLOCKED</span>
            <span style={{ color: 'var(--text-primary)', marginLeft: '6px' }}>GAMES</span>
            <span style={{ color: '#00E5FF', marginLeft: '6px' }}>76</span>
          </div>
          <p style={{ 
            color: 'var(--text-tertiary)', 
            maxWidth: '600px', 
            margin: '0 auto', 
            fontSize: '14px',
            lineHeight: '1.6'
          }}>
            Disclaimer: <span style={{ fontWeight: 600 }}>Unblocked Games 76</span> is an independent website providing free access to browser-based games. We are not affiliated with any specific game developers.
          </p>
        </div>

        {/* Footer Grid: 4 Balanced Columns */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '48px',
          textAlign: 'left'
        }}>
          {/* Col 1: Categories (A-M) */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '24px', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Popular Categories</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {categories.slice(0, Math.ceil(categories.length / 2)).map(cat => (
                <li key={cat.slug}>
                  <Link href={`/${cat.slug}`} style={{ color: 'var(--text-secondary)', fontSize: '14px', transition: 'color 0.2s' }} className="footer-link">
                    {cat.name} Games
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Categories (N-Z) */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '24px', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>More Genres</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {categories.slice(Math.ceil(categories.length / 2)).map(cat => (
                <li key={cat.slug}>
                  <Link href={`/${cat.slug}`} style={{ color: 'var(--text-secondary)', fontSize: '14px', transition: 'color 0.2s' }} className="footer-link">
                    {cat.name} Games
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company & Legal */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '20px', fontSize: '16px', fontWeight: 800 }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link href="/about" style={{ color: 'var(--text-secondary)', fontSize: '14px', textDecoration: 'none' }}>About Us</Link></li>
              <li><Link href="/contact" style={{ color: 'var(--text-secondary)', fontSize: '14px', textDecoration: 'none' }}>Contact Support</Link></li>
              <li><Link href="/privacy-policy" style={{ color: 'var(--text-secondary)', fontSize: '14px', textDecoration: 'none' }}>Privacy Policy</Link></li>
              <li><Link href="/terms" style={{ color: 'var(--text-secondary)', fontSize: '14px', textDecoration: 'none' }}>Terms of Service</Link></li>
            </ul>
          </div>

          {/* Col 4: Platform */}
          <div style={{ gridColumn: 'span 2' }}>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '20px', fontSize: '16px', fontWeight: 800 }}>Platform</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
              Unblocked Games 76 is a dedicated portal providing high-performance, browser-based entertainment. We curate the best titles to ensure seamless gameplay anywhere, anytime.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
