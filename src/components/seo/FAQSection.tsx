import { siteConfig } from "@/config/site";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export function FAQSection({ items }: FAQProps) {
  // Generate JSON-LD for Search Engines
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };

  return (
    <section id="faq" style={{ padding: '6rem 0' }}>
      <div className="util-container" style={{ maxWidth: '800px' }}>
        <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '48px' }}>常见问题</h2>
        
        {/* Schema.org JSON-LD Injection */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="util-grid">
          {items.map((item, index) => (
            <div key={index} className="util-card">
              <h4 style={{ marginBottom: '12px', color: 'var(--text-primary)' }}>{item.question}</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
