export default function TermsPage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using Unblocked Games 76, you agree to comply with and be bound by these Terms of Service. This agreement constitutes a legally binding contract between you and our platform regarding your use of the site."
    },
    {
      title: "2. Intellectual Property",
      content: "All games, trademarks, service marks, and logos contained on the site are owned by or licensed to us. You are granted a limited license to access and use the site for personal, non-commercial entertainment purposes only."
    },
    {
      title: "3. User Responsibilities",
      content: "You agree not to use the site for any purpose that is unlawful or prohibited by these terms. You may not use the site in any manner that could damage, disable, overburden, or impair our servers or networks."
    },
    {
      title: "4. Third-Party Links",
      content: "Our website contains links to third-party websites or services (such as game providers) that are not owned or controlled by Unblocked Games 76. We assume no responsibility for the content or practices of any third-party sites."
    },
    {
      title: "5. Limitation of Liability",
      content: "In no event shall Unblocked Games 76 be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your access to or use of the services."
    }
  ];

  return (
    <div className="animate-fade-in" style={{ padding: '0 0 80px' }}>
      <div style={{ 
        background: 'linear-gradient(180deg, var(--bg-panel) 0%, transparent 100%)',
        padding: '60px 0',
        borderBottom: '1px solid var(--border-subtle)',
        marginBottom: '48px'
      }}>
        <div className="util-container" style={{ textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: 'clamp(32px, 6vw, 48px)', 
            fontWeight: 900, 
            marginBottom: '16px', 
            color: 'var(--text-primary)', 
            letterSpacing: '-0.02em'
          }}>
            Terms of <span style={{ color: 'var(--accent-cyan)' }}>Service</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
            Last Updated: April 18, 2026
          </p>
        </div>
      </div>

      <div className="util-container" style={{ maxWidth: '800px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {sections.map((section, idx) => (
            <section key={idx}>
              <h2 style={{ color: 'var(--text-primary)', fontSize: '22px', fontWeight: 800, marginBottom: '16px' }}>{section.title}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.8' }}>{section.content}</p>
            </section>
          ))}
        </div>

        <div style={{ marginTop: '64px', padding: '32px', background: 'var(--bg-panel)', borderRadius: '24px', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
           <p style={{ color: 'var(--text-tertiary)', fontSize: '14px', margin: 0 }}>
             Questions about our terms? Please contact us at <a href="mailto:support@unblockedgames76.com" style={{ color: 'var(--accent-cyan)', textDecoration: 'none', fontWeight: 600 }}>support@unblockedgames76.com</a>
           </p>
        </div>
      </div>
    </div>
  );
}
