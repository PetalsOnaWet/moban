"use client";

import { MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { getComments } from "@/lib/core/games";

export function DiscussionBox({ slug, title }: { slug: string, title: string }) {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchComments() {
      try {
        const data = await getComments(slug);
        setComments(data || []);
      } catch (e) {
        console.error("Failed to fetch comments", e);
      } finally {
        setLoading(false);
      }
    }
    fetchComments();
  }, [slug]);

  return (
    <div style={{ 
      marginTop: '64px', 
      padding: '40px', 
      background: 'var(--bg-panel)', 
      borderRadius: '16px', 
      border: '1px solid var(--border-standard)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
    }}>
      <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '24px', color: 'var(--text-primary)' }}>
        Discuss: {title}
      </h2>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', fontWeight: 700, color: 'var(--text-secondary)' }}>
          Comments ({comments.length})
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '14px', color: 'var(--text-tertiary)', fontWeight: 600 }}>Sort by</span>
          <select style={{ 
            padding: '8px 16px', 
            borderRadius: '8px', 
            border: '1px solid var(--border-standard)', 
            background: 'var(--bg-site)',
            color: 'var(--text-primary)',
            fontSize: '14px',
            outline: 'none',
            cursor: 'pointer'
          }}>
            <option>Newest</option>
            <option>Popular</option>
            <option>Oldest</option>
          </select>
        </div>
      </div>

      {comments.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-tertiary)' }}>
           <MessageSquare size={48} style={{ margin: '0 auto 16px', opacity: 0.2 }} />
           <p style={{ fontSize: '16px' }}>No comments yet. Be the first to start the discussion!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Real comments would be mapped here */}
          {comments.map((comment, i) => (
             <div key={i} style={{ padding: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
                {comment.content}
             </div>
          ))}
        </div>
      )}

      {/* Input Placeholder */}
      <div style={{ 
        display: 'flex', 
        gap: '16px', 
        marginTop: '40px',
        padding: '24px',
        background: 'var(--bg-site)',
        borderRadius: '12px',
        border: '1px dashed var(--border-standard)'
      }}>
        <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--bg-panel)', border: '1px solid var(--border-subtle)' }} />
        <div style={{ flex: 1, paddingTop: '10px', color: 'var(--text-tertiary)', fontSize: '15px' }}>
          Write a comment...
        </div>
      </div>
    </div>
  );
}
