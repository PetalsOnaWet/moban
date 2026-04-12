"use client";

import { X, Check, Copy, Facebook, Twitter, Linkedin } from "lucide-react";
import { useState } from "react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export function ShareModal({ isOpen, onClose, title }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
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
          <button style={socialBtnStyle('#3B5998')} title="Facebook">
             <Facebook size={20} fill="#FFF" />
          </button>
          <button style={socialBtnStyle('#000000')} title="X">
             <span style={{ fontWeight: 900, color: '#FFF' }}>X</span>
          </button>
          <button style={socialBtnStyle('#25D366')} title="WhatsApp">
             <div style={{ color: '#FFF' }}>W</div>
          </button>
          <button style={socialBtnStyle('#0077B5')} title="LinkedIn">
             <Linkedin size={20} fill="#FFF" />
          </button>
          <button style={socialBtnStyle('#FF4500')} title="Reddit">
             <div style={{ color: '#FFF' }}>R</div>
          </button>
        </div>
      </div>
    </div>
  );
}

const socialBtnStyle = (bg: string) => ({
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  background: bg,
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'transform 0.2s',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
});
