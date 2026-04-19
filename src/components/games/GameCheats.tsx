"use client";

import { Sparkles, CheckCircle2, AlertCircle } from "lucide-react";

interface GameCheatsProps {
  expert_tips?: string;
  secrets?: string[];
  title: string;
}

export function GameCheats({ expert_tips, secrets, title }: GameCheatsProps) {
  if (!expert_tips && (!secrets || secrets.length === 0)) return null;

  return (
    <div style={{ marginTop: '48px', marginBottom: '48px' }}>
      <div style={{ 
        background: 'linear-gradient(135deg, var(--bg-panel) 0%, var(--bg-input) 100%)',
        borderRadius: '24px',
        padding: '32px',
        border: '1px solid var(--border-subtle)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{ 
            background: 'var(--accent-cyan)', 
            padding: '8px', 
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sparkles color="white" size={20} />
          </div>
          <h3 style={{ fontSize: '22px', fontWeight: 900, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
            Expert Guide: Tips & Secrets
          </h3>
        </div>

        {expert_tips && (
          <div style={{ marginBottom: '32px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={16} color="var(--accent-cyan)" /> Pro Strategy
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.8', margin: 0 }}>
              {expert_tips}
            </p>
          </div>
        )}

        {secrets && secrets.length > 0 && (
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={16} color="#F59E0B" /> Hidden Secrets & Codes
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '12px' }}>
              {secrets.map((secret, idx) => (
                <li 
                  key={idx}
                  style={{ 
                    padding: '12px 16px', 
                    background: 'var(--bg-panel)', 
                    borderRadius: '12px',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '14px',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6'
                  }}
                >
                  {secret}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
