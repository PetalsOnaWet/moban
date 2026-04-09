"use client";

import { useState } from "react";
import { MessageSquare, Send, User, Loader2 } from "lucide-react";
import { submitComment } from "@/lib/core/actions";

interface Comment {
  id: number;
  user_name: string;
  content: string;
  created_at: string;
}

interface CommentSectionProps {
  pageId: string;
  initialComments: Comment[];
}

export function CommentSection({ pageId, initialComments }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [userName, setUserName] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !content) {
      setError("Please enter your name and message.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    const formData = new FormData();
    formData.append("pageId", pageId);
    formData.append("userName", userName);
    formData.append("content", content);

    const res = await submitComment(formData);

    if (res.success) {
      const newComment: Comment = {
        id: Math.random(), // Temporary ID for UI
        user_name: userName,
        content: content,
        created_at: new Date().toISOString()
      };
      setComments([newComment, ...comments]);
      setContent("");
      // In a real app, you might want to revalidate or fetch from DB again
    } else {
      setError(res.error || "Failed to submit comment.");
    }
    setIsSubmitting(false);
  };

  return (
    <div style={{ marginTop: '48px' }}>
      <h2 className="util-flex" style={{ gap: '12px', alignItems: 'center', fontSize: '1.75rem', marginBottom: '32px' }}>
        <MessageSquare size={24} color="var(--accent-violet)" />
        Discussion ({comments.length})
      </h2>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="util-card" style={{ marginBottom: '40px', background: 'var(--bg-panel)' }}>
        <div className="util-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: '16px' }}>
          <div style={{ position: 'relative' }}>
            <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
            <input
              type="text"
              placeholder="Your Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="util-glass"
              style={{ width: '100%', padding: '10px 12px 10px 36px', background: 'rgba(0,0,0,0.2)', color: 'var(--text-primary)', outline: 'none' }}
            />
          </div>
        </div>
        <textarea
          placeholder="What do you think about this game?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          className="util-glass"
          style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', color: 'var(--text-primary)', outline: 'none', marginBottom: '16px', resize: 'vertical' }}
        />
        {error && <p style={{ color: '#ef4444', fontSize: '14px', marginBottom: '16px' }}>{error}</p>}
        <div className="util-flex" style={{ justifyContent: 'flex-end' }}>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="util-btn-primary util-flex-center" 
            style={{ gap: '8px', padding: '10px 24px' }}
          >
            {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
            Post Comment
          </button>
        </div>
      </form>

      {/* Comment List */}
      <div className="util-grid" style={{ gap: '20px' }}>
        {comments.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-tertiary)', padding: '40px 0' }}>No comments yet. Be the first to share your thoughts!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="util-card animate-fade-in" style={{ padding: '20px', borderLeft: '3px solid var(--accent-violet)' }}>
              <div className="util-flex" style={{ justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{comment.user_name}</span>
                <span style={{ fontSize: '12px', color: 'var(--text-quaternary)' }}>
                  {new Date(comment.created_at).toLocaleDateString()}
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
