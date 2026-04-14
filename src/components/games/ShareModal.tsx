"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Check, Copy } from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export function ShareModal({ isOpen, onClose, title }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper to render a social button with a protection layer against :visited styles
  const renderSocialLink = (platform: string, href: string, bg: string, icon: React.ReactNode) => (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="share-btn-hover"
      style={{ 
        display: 'block', 
        textDecoration: 'none',
        borderRadius: '50%',
        width: '48px',
        height: '48px'
      }}
      title={`Share on ${platform}`}
    >
      <div style={{
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        background: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s ease-in-out'
      }}>
        {icon}
      </div>
    </a>
  );

  return createPortal(
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(4px)',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: '#FFF',
          borderRadius: '24px',
          padding: '40px',
          width: '100%',
          maxWidth: '600px',
          position: 'relative',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          animation: 'fadeIn 0.3s ease-out'
        }}
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#9CA3AF'
          }}
        >
          <X size={24} />
        </button>

        <h2 style={{ 
          fontSize: '28px', 
          fontWeight: 800, 
          textAlign: 'center', 
          marginBottom: '32px',
          color: '#111827',
          lineHeight: 1.2
        }}>
          Spread the Fun, Share {title} with Friends!
        </h2>

        <div style={{ 
          position: 'relative',
          marginBottom: '40px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: '#F9FAFB',
            border: '1px solid #E5E7EB',
            borderRadius: '99px',
            padding: '12px 24px',
            justifyContent: 'space-between'
          }}>
            <span style={{ 
              fontSize: '15px', 
              color: '#374151', 
              overflow: 'hidden', 
              textOverflow: 'ellipsis', 
              whiteSpace: 'nowrap',
              marginRight: '12px'
            }}>
              {shareUrl}
            </span>
            <button 
              onClick={handleCopy}
              style={{
                background: 'none',
                border: 'none',
                color: '#6366F1',
                fontWeight: 700,
                fontSize: '15px',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {copied ? 'Copied!' : 'Copy link'}
            </button>
          </div>
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '16px' 
        }}>
          {renderSocialLink(
            'Facebook',
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            '#1877F2',
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          )}

          {renderSocialLink(
            'X',
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`Check out ${title}!`)}`,
            '#000000',
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          )}

          {renderSocialLink(
            'WhatsApp',
            `https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out ${title}! ${shareUrl}`)}`,
            '#25D366',
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
               <path d="M17.472 14.382c-.301-.15-1.767-.872-2.036-.969-.269-.099-.465-.15-.659.15-.194.298-.758.969-.928 1.158-.173.188-.344.209-.644.059-.3-.15-1.268-.467-2.414-1.488-.891-.793-1.492-1.772-1.667-2.071-.176-.299-.019-.461.13-.61.135-.133.301-.351.451-.527.151-.176.201-.299.301-.497.101-.199.05-.373-.025-.523-.075-.15-.659-1.587-.903-2.174-.239-.574-.48-.496-.659-.505-.168-.008-.362-.01-.555-.011-.194 0-.51.073-.777.363-.267.289-1.02 1.002-1.02 2.441s1.047 2.827 1.192 3.025c.145.199 2.059 3.144 4.986 4.406.695.299 1.239.479 1.662.614.698.222 1.332.191 1.834.116.56-.083 1.767-.721 2.016-1.417.25-.696.25-1.293.175-1.417-.075-.124-.275-.199-.575-.349z"/>
               <path d="M12.004 0C5.378 0 0 5.378 0 12.004c0 2.113.548 4.174 1.587 6.004L0 24l6.162-1.621c1.782.972 3.791 1.487 5.838 1.487 6.626 0 12.004-5.378 12.004-12.004C24.008 5.378 18.63 0 12.004 0zm0 21.87c-1.921 0-3.804-.516-5.45-1.492l-.391-.233-3.665.962.979-3.574-.255-.406c-1.074-1.71-1.64-3.708-1.64-5.76C2.582 6.811 6.811 2.582 12.004 2.582s9.422 4.229 9.422 9.422-4.229 9.422-9.422 9.422z"/>
            </svg>
          )}

          {renderSocialLink(
            'LinkedIn',
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
            '#0077B5',
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zM20.45 20.45h-3.56v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.15 1.46-2.15 2.96v5.7h-3.56V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z"/>
            </svg>
          )}

          {renderSocialLink(
            'Reddit',
            `https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`,
            '#FF4500',
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
               <path d="M24 11.779c0-1.459-1.192-2.645-2.657-2.645-.715 0-1.363.285-1.84.746-2.031-1.383-4.721-2.288-7.7-2.428l1.636-5.127 4.49 1.042c.041.876.772 1.576 1.666 1.576 1.109 0 2.012-.897 2.012-1.999s-.903-1.999-2.012-1.999c-.832 0-1.543.504-1.847 1.229l-4.994-1.159c-.279-.065-.558.106-.639.387l-1.895 5.928c-3.042.069-5.83.98-7.901 2.401-.47-.442-1.103-.717-1.803-.717-1.465 0-2.657 1.186-2.657 2.645 0 .973.535 1.817 1.323 2.275-.034.254-.055.51-.055.769 0 3.84 4.708 6.965 10.51 6.965 5.803 0 10.511-3.125 10.511-6.965 0-.251-.02-.497-.051-.741.819-.452 1.369-1.31 1.369-2.303zm-17.708 2.399c0-1.104.903-1.999 2.012-1.999s2.012.895 2.012 1.999-.903 1.999-2.012 1.999-2.012-.895-2.012-1.999zm10.701 4.545c-2.316 2.301-7.234 2.313-9.565 0-.224-.222-.224-.582 0-.804.225-.224.588-.224.812 0 1.83 1.817 6.131 1.841 7.941 0 .225-.224.588-.224.812 0 .224.222.224.582 0 .804zm.014-2.546c-1.109 0-2.012-.895-2.012-1.999s.903-1.999 2.012-1.999 2.012.895 2.012 1.999-.903 1.999-2.012 1.999z"/>
            </svg>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
