"use client";

import { MessageSquare, Reply, ThumbsUp, ThumbsDown, ChevronDown, Loader2 } from "lucide-react";
import { useEffect, useState, useTransition, useMemo } from "react";
import { getComments, voteComment, submitComment } from "@/lib/core/actions";
import Script from "next/script";

// Random color generator for avatars
const COLORS = [
  '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#6366F1',
  '#EC4899', '#8B5CF6', '#14B8A6', '#F97316'
];

function getAvatarColor(name: string) {
  const charCode = name.charCodeAt(0) || 0;
  return COLORS[charCode % COLORS.length];
}

function timeAgo(dateParam: string) {
  const date = new Date(dateParam);
  const now = new Date();
  const seconds = Math.round((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'Just now';
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days} days ago`;
  return date.toLocaleDateString();
}

export function DiscussionBox({ slug, title }: { slug: string, title: string }) {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();
  const [sortBy, setSortBy] = useState('newest');

  const loadComments = async (isNew = false, currentSort = sortBy) => {
    try {
      if (isNew) setLoading(true);
      else setLoadingMore(true);

      const newOffset = isNew ? 0 : offset;
      const data = await getComments(slug, 10, newOffset, currentSort);

      if (data.length < 10) setHasMore(false);
      else setHasMore(true);

      if (isNew) {
        setComments(data);
        setOffset(10);
      } else {
        setComments(prev => [...prev, ...data]);
        setOffset(prev => prev + 10);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadComments(true);
  }, [slug]);

  const groupedComments = useMemo(() => {
    const roots = comments.filter(c => !c.parent_id);
    const replies = comments.filter(c => c.parent_id);
    
    return roots.map(root => ({
      ...root,
      replies: replies.filter(r => r.parent_id === root.id)
    }));
  }, [comments]);

  const handleVote = async (id: number, type: 'like' | 'dislike') => {
    setComments(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, [type + 's']: (c[type + 's'] || 0) + 1 };
      }
      return c;
    }));
    await voteComment(id, type);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("slug", slug);
    if (replyTo) formData.append("parentId", replyTo.toString());

    startTransition(async () => {
      const res = await submitComment(formData);
      if (res.success) {
        (e.target as HTMLFormElement).reset();
        setReplyTo(null);
        loadComments(true); // Reload to show new comment
      } else {
        alert(res.error);
      }
    });
  };

  const CommentItem = ({ comment, isReply = false }: { comment: any, isReply?: boolean }) => (
    <div style={{ 
      display: 'flex', 
      gap: '16px',
      paddingLeft: isReply ? '56px' : '0',
      position: 'relative'
    }}>
      {isReply && (
        <div style={{
          position: 'absolute',
          left: '28px',
          top: '-16px',
          bottom: '20px',
          width: '2px',
          background: '#E5E7EB',
          borderRadius: '1px'
        }} />
      )}
      
      {/* Avatar */}
      <div style={{
        width: isReply ? '32px' : '40px',
        height: isReply ? '32px' : '40px',
        borderRadius: '50%',
        background: getAvatarColor(comment.user_name),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: isReply ? '14px' : '18px',
        fontWeight: 700,
        flexShrink: 0,
        zIndex: 1
      }}>
        {comment.user_name.charAt(0).toUpperCase()}
      </div>

      {/* Content Area */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span style={{ fontWeight: 700, color: '#374151', textDecoration: 'underline', cursor: 'pointer', fontSize: isReply ? '14px' : '15px' }}>
            {comment.user_name}
          </span>
          <span style={{ color: '#9CA3AF', fontSize: '13px' }}>{timeAgo(comment.created_at)}</span>
        </div>

        <p style={{ color: '#4B5563', fontSize: isReply ? '14px' : '15px', lineHeight: '1.6', marginBottom: '12px' }}>
          {comment.content}
        </p>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {!isReply && (
            <button
              onClick={() => {
                setReplyTo(comment.id);
                // Scroll to form or focus
                document.getElementById('comment-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 700, color: '#111827', cursor: 'pointer', padding: 0 }}
            >
              <Reply size={14} /> Reply
            </button>
          )}
          <button
            onClick={() => handleVote(comment.id, 'like')}
            style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 600, color: '#6B7280', cursor: 'pointer', padding: 0 }}
          >
            <ThumbsUp size={14} fill={comment.likes > 0 ? "var(--accent-cyan)" : "none"} stroke={comment.likes > 0 ? "none" : "currentColor"} /> {comment.likes || 0}
          </button>
          <button
            onClick={() => handleVote(comment.id, 'dislike')}
            style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 600, color: '#6B7280', cursor: 'pointer', padding: 0 }}
          >
            <ThumbsDown size={14} fill={comment.dislikes > 0 ? "#EF4444" : "none"} stroke={comment.dislikes > 0 ? "none" : "currentColor"} /> {comment.dislikes || 0}
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) return <div style={{ textAlign: 'center', padding: '40px' }}><Loader2 className="animate-spin" /></div>;

  return (
    <div style={{
      marginTop: '64px',
      padding: '40px',
      background: 'var(--bg-panel)',
      borderRadius: '24px',
      border: '1px solid var(--border-standard)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
      maxWidth: '800px',
      margin: '64px auto'
    }}>
      <h2 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '24px', color: '#111827', letterSpacing: '-0.02em' }}>
        Discuss: {title}
      </h2>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', borderBottom: '1px solid #F3F4F6', paddingBottom: '16px' }}>
        <div style={{ fontSize: '18px', fontWeight: 700, color: '#111827' }}>
          Comments ({comments.length})
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px', color: '#6B7280', fontWeight: 600 }}>Sort by</span>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <select
              onChange={handleSortChange}
              value={sortBy === 'newest' ? 'Newest' : sortBy === 'popular' ? 'Popular' : 'Oldest'}
              style={{
                appearance: 'none',
                padding: '6px 32px 6px 16px',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                background: '#fff',
                color: '#374151',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option>Newest</option>
              <option>Popular</option>
              <option>Oldest</option>
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', right: '12px', pointerEvents: 'none', color: '#6B7280' }} />
          </div>
        </div>
      </div>

      {/* COMMENTS LIST */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {groupedComments.map((thread) => (
          <div key={thread.id} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <CommentItem comment={thread} />
            
            {/* Thread Replies */}
            {thread.replies && thread.replies.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {thread.replies.map((reply: any) => (
                  <CommentItem key={reply.id} comment={reply} isReply />
                ))}
              </div>
            )}
          </div>
        ))}

        {hasMore && (
          <button
            onClick={() => loadComments()}
            disabled={loadingMore}
            style={{
              width: '100%',
              padding: '12px',
              background: '#2563EB',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 700,
              cursor: 'pointer',
              marginTop: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            {loadingMore ? <Loader2 size={18} className="animate-spin" /> : `Load more ${comments.length > 5 ? '5' : ''} comments`}
          </button>
        )}
      </div>

      {/* POST COMMENT FORM */}
      <form onSubmit={handleFormSubmit} style={{ marginTop: '48px', padding: '32px', background: '#F9FAFB', borderRadius: '16px', border: '1px solid #E5E7EB' }}>
        {replyTo && (
          <div style={{ marginBottom: '16px', fontSize: '14px', color: '#6B7280', display: 'flex', justifyContent: 'space-between' }}>
            Replying to comment #{replyTo}
            <button type="button" onClick={() => setReplyTo(null)} style={{ background: 'none', border: 'none', color: '#EF4444', fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <input
            name="userName"
            placeholder="Name"
            required
            style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #E5E7EB', background: '#fff', fontSize: '15px' }}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #E5E7EB', background: '#fff', fontSize: '15px' }}
          />
        </div>
        <textarea
          name="content"
          placeholder="Content"
          required
          rows={4}
          style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #E5E7EB', background: '#fff', fontSize: '15px', marginBottom: '16px', resize: 'vertical' }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
          <input type="checkbox" id="terms" required />
          <label htmlFor="terms" style={{ fontSize: '14px', color: '#4B5563' }}>I'd read and agree to the terms and conditions.</label>
        </div>

        <button
          type="submit"
          disabled={isPending}
          style={{
            background: '#2563EB',
            color: '#fff',
            padding: '10px 24px',
            borderRadius: '6px',
            border: 'none',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '15px',
            opacity: isPending ? 0.7 : 1
          }}
        >
          {isPending ? 'Posting...' : 'Comment'}
        </button>
      </form>
    </div>
  );
}
