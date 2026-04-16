import Link from "next/link";

export function Footer() {
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
            <span style={{ color: '#FFB400' }}>GEOMETRY</span>
            <span style={{ color: 'var(--text-primary)', marginLeft: '6px' }}>DASH</span>
            <span style={{ color: '#00E5FF', marginLeft: '6px' }}>LITE</span>
          </div>
          <p style={{ 
            color: 'var(--text-tertiary)', 
            maxWidth: '600px', 
            margin: '0 auto', 
            fontSize: '14px',
            lineHeight: '1.6'
          }}>
            Disclaimer: <span style={{ fontWeight: 600 }}>Geometry Dash Lite</span> is an independent website and is not affiliated with any organizations.
          </p>
        </div>

        {/* Footer Grid: 3 Columns */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '40px',
          textAlign: 'left'
        }}>
          <div>
            <h4 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '20px', color: 'var(--text-primary)' }}>Developers</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link href="/about" style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>About us</Link></li>
              <li><Link href="/contact" style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Contact us</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '20px', color: 'var(--text-primary)' }}>Information</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link href="/privacy" style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Privacy policy</Link></li>
              <li><Link href="/terms" style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Term of use</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '20px', color: 'var(--text-primary)' }}>Support</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link href="/dmca" style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Copyright Infringement Notice Procedure</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
