import Link from "next/link";

export function TagCloud({ tags }: { tags: string | null }) {
  if (!tags) return null;

  const tagList = tags.split(",").map(t => t.trim()).filter(Boolean);

  return (
    <div style={{ marginTop: '24px' }}>
      <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-quaternary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Tags
      </div>
      <div className="util-flex" style={{ gap: '8px', flexWrap: 'wrap' }}>
        {tagList.map((tag) => (
          <Link 
            key={tag} 
            href={`/tag/${encodeURIComponent(tag)}`}
            className="util-glass"
            style={{ 
              padding: '4px 12px', 
              borderRadius: 'var(--radius-pill)', 
              fontSize: '12px', 
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-standard)',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-violet)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-standard)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            # {tag}
          </Link>
        ))}
      </div>
    </div>
  );
}
