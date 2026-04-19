export default function PrivacyPage() {
  const policies = [
    {
      title: "Information We Collect",
      content: "We do not require users to create accounts or provide personal information such as names or email addresses to play games. We may collect non-personal data such as browser type and language preference to improve our service."
    },
    {
      title: "Cookies and Tracking",
      content: "We use essential cookies to maintain your game progress and local settings. Third-party advertisers may also use cookies to provide personalized advertisements."
    },
    {
      title: "Data Security",
      content: "We implement industry-standard security measures to protect against unauthorized access or alteration of your local data."
    },
    {
      title: "Children's Privacy",
      content: "Unblocked Games 76 is a safe environment for all ages. We do not knowingly collect personal information from children under the age of 13."
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
            Privacy <span style={{ color: 'var(--accent-cyan)' }}>Policy</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
            Your privacy is our top priority.
          </p>
        </div>
      </div>

      <div className="util-container" style={{ maxWidth: '800px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {policies.map((policy, idx) => (
            <section key={idx}>
              <h2 style={{ color: 'var(--text-primary)', fontSize: '22px', fontWeight: 800, marginBottom: '16px' }}>{policy.title}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.8' }}>{policy.content}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
