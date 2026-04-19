import { Info, ShieldCheck, Zap, Heart, Trophy, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="animate-fade-in" style={{ padding: '0 0 80px' }}>
      {/* Hero Section */}
      <div style={{ 
        background: 'linear-gradient(180deg, var(--bg-panel) 0%, transparent 100%)',
        padding: '80px 0',
        borderBottom: '1px solid var(--border-subtle)',
        marginBottom: '64px'
      }}>
        <div className="util-container" style={{ textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: 'clamp(40px, 8vw, 72px)', 
            fontWeight: 900, 
            marginBottom: '24px', 
            color: 'var(--text-primary)', 
            letterSpacing: '-0.04em',
            lineHeight: 1.1
          }}>
            The Future of <span style={{ color: 'var(--accent-cyan)' }}>Unblocked</span> Gaming
          </h1>
          <p style={{ 
            color: 'var(--text-secondary)', 
            fontSize: '20px', 
            maxWidth: '700px', 
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Unblocked Games 76 is more than just a library; it's a sanctuary for gamers seeking high-performance, accessible entertainment without limits.
          </p>
        </div>
      </div>

      <div className="util-container">
        {/* Core Values Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '32px', 
          marginBottom: '80px' 
        }}>
          <div style={{ background: 'var(--bg-panel)', padding: '40px', borderRadius: '24px', border: '1px solid var(--border-subtle)', transition: 'transform 0.3s ease' }}>
            <div style={{ width: '56px', height: '56px', background: 'rgba(34, 211, 238, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <Zap style={{ color: 'var(--accent-cyan)' }} size={28} />
            </div>
            <h3 style={{ color: 'var(--text-primary)', fontSize: '24px', fontWeight: 800, marginBottom: '16px' }}>Lightning Fast</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.7' }}>
              Our proprietary infrastructure ensures that every game loads in milliseconds. We prioritize performance to give you a lag-free experience on any browser.
            </p>
          </div>

          <div style={{ background: 'var(--bg-panel)', padding: '40px', borderRadius: '24px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ width: '56px', height: '56px', background: 'rgba(34, 211, 238, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <ShieldCheck style={{ color: 'var(--accent-cyan)' }} size={28} />
            </div>
            <h3 style={{ color: 'var(--text-primary)', fontSize: '24px', fontWeight: 800, marginBottom: '16px' }}>Uncompromising Safety</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.7' }}>
              Every single game is hand-vetted by our curators. We block intrusive ads and harmful scripts to provide a safe haven for players of all ages.
            </p>
          </div>

          <div style={{ background: 'var(--bg-panel)', padding: '40px', borderRadius: '24px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ width: '56px', height: '56px', background: 'rgba(34, 211, 238, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <Globe style={{ color: 'var(--accent-cyan)' }} size={28} />
            </div>
            <h3 style={{ color: 'var(--text-primary)', fontSize: '24px', fontWeight: 800, marginBottom: '16px' }}>Global Accessibility</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.7' }}>
              Designed to bypass restrictive firewalls at schools and offices, our mirroring technology keeps you connected to your favorite games anywhere in the world.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '64px', 
          alignItems: 'center',
          padding: '64px',
          background: 'var(--bg-panel)',
          borderRadius: '32px',
          border: '1px solid var(--border-subtle)'
        }}>
          <div>
            <h2 style={{ color: 'var(--text-primary)', fontSize: '36px', fontWeight: 900, marginBottom: '24px', letterSpacing: '-0.02em' }}>Driven by Passion</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '18px', lineHeight: '1.8', marginBottom: '24px' }}>
              Unblocked Games 76 was born out of a simple idea: that fun should be universal. What started as a small passion project has grown into a massive community of millions of players worldwide.
            </p>
            <div style={{ display: 'flex', gap: '32px' }}>
              <div>
                <div style={{ fontSize: '32px', fontWeight: 900, color: 'var(--text-primary)' }}>1000+</div>
                <div style={{ color: 'var(--text-tertiary)', fontSize: '14px' }}>Hand-picked Games</div>
              </div>
              <div>
                <div style={{ fontSize: '32px', fontWeight: 900, color: 'var(--text-primary)' }}>24/7</div>
                <div style={{ color: 'var(--text-tertiary)', fontSize: '14px' }}>Uptime Reliability</div>
              </div>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
             <div style={{ 
               width: '100%', 
               aspectRatio: '16/9', 
               background: 'linear-gradient(135deg, #22D3EE, #6366F1)', 
               borderRadius: '24px',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center'
             }}>
                <Heart size={64} color="white" fill="white" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
