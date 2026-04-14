"use client";

/**
 * Text Ads Placeholder Area
 * Reserved for dynamic text link advertisements.
 * Takes up 2/3 of the row as requested.
 */
export function DiscoveryAds() {
  return (
    <div style={{ flex: '2', minWidth: 0 }}>
      <div style={{ textAlign: 'center', marginBottom: '4px' }}>
        <div style={{ 
            display: 'inline-block',
            background: '#4AB7D8', 
            padding: '2px 12px', 
            color: '#000', 
            fontWeight: 600, 
            fontSize: '10px',
            borderRadius: '4px',
        }}>
          Advertisement
        </div>
      </div>
      <div style={{ 
        minHeight: '124px', // Increased slightly to match icon row height better
        background: 'transparent', 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '10px', 
        alignItems: 'center',
        border: '1px dashed var(--border-standard)', 
        borderRadius: '8px',
        padding: '12px',
        color: 'var(--text-tertiary)',
        fontSize: '13px'
      }}>
        Reserved for Text Ads
      </div>
    </div>
  );
}
