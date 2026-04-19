import Link from "next/link";
import { Mail, MessageCircle, Send, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="animate-fade-in" style={{ padding: '0 0 80px' }}>
      {/* Header Section */}
      <div style={{ 
        background: 'linear-gradient(180deg, var(--bg-panel) 0%, transparent 100%)',
        padding: '80px 0',
        borderBottom: '1px solid var(--border-subtle)',
        marginBottom: '64px'
      }}>
        <div className="util-container" style={{ textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: 'clamp(40px, 8vw, 64px)', 
            fontWeight: 900, 
            marginBottom: '24px', 
            color: 'var(--text-primary)', 
            letterSpacing: '-0.04em'
          }}>
            Get in <span style={{ color: 'var(--accent-cyan)' }}>Touch</span>
          </h1>
          <p style={{ 
            color: 'var(--text-secondary)', 
            fontSize: '20px', 
            maxWidth: '600px', 
            margin: '0 auto'
          }}>
            Have feedback, a game suggestion, or need technical help? Our team is ready to assist you.
          </p>
        </div>
      </div>

      <div className="util-container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px' }}>
          {/* Contact Methods */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ background: 'var(--bg-panel)', padding: '32px', borderRadius: '24px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ width: '48px', height: '48px', background: 'rgba(34, 211, 238, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail style={{ color: 'var(--accent-cyan)' }} size={24} />
                </div>
                <div>
                  <h3 style={{ color: 'var(--text-primary)', fontSize: '18px', fontWeight: 800, margin: 0 }}>Email Us</h3>
                  <p style={{ color: 'var(--text-tertiary)', fontSize: '14px', margin: 0 }}>Response in 24-48 hours</p>
                </div>
              </div>
              <a href="mailto:support@unblockedgames76.com" style={{ color: 'var(--accent-cyan)', fontSize: '18px', fontWeight: 600, textDecoration: 'none' }}>
                support@unblockedgames76.com
              </a>
            </div>

            <div style={{ background: 'var(--bg-panel)', padding: '32px', borderRadius: '24px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ width: '48px', height: '48px', background: 'rgba(34, 211, 238, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageCircle style={{ color: 'var(--accent-cyan)' }} size={24} />
                </div>
                <div>
                  <h3 style={{ color: 'var(--text-primary)', fontSize: '18px', fontWeight: 800, margin: 0 }}>Suggestions</h3>
                  <p style={{ color: 'var(--text-tertiary)', fontSize: '14px', margin: 0 }}>We love new game ideas!</p>
                </div>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', margin: 0 }}>
                Include "Game Suggestion" in your email subject line for faster processing.
              </p>
            </div>

            <div style={{ background: 'var(--bg-panel)', padding: '32px', borderRadius: '24px', border: '1px solid var(--border-subtle)' }}>
               <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                 <Clock size={16} style={{ color: 'var(--text-tertiary)' }} />
                 <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Business Hours: 9 AM - 6 PM (EST)</span>
               </div>
            </div>
          </div>

          {/* Contact Form Placeholder / Decorative Card */}
          <div style={{ 
            background: 'var(--bg-panel)', 
            padding: '48px', 
            borderRadius: '32px', 
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
             <div style={{ 
               position: 'absolute', 
               top: '-20px', 
               right: '-20px', 
               width: '100px', 
               height: '100px', 
               background: 'var(--accent-cyan)', 
               opacity: 0.1, 
               borderRadius: '50%' 
             }} />
             
             <Send size={48} style={{ color: 'var(--accent-cyan)', marginBottom: '24px', transform: 'rotate(-10deg)' }} />
             <h2 style={{ color: 'var(--text-primary)', fontSize: '28px', fontWeight: 900, marginBottom: '16px' }}>Send a Message</h2>
             <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.6', marginBottom: '32px' }}>
               The fastest way to reach us is via email. Click the button below to open your mail client with our support address pre-filled.
             </p>
             <a 
               href="mailto:support@unblockedgames76.com" 
               style={{ 
                 background: 'var(--accent-cyan)', 
                 color: 'white', 
                 padding: '16px 32px', 
                 borderRadius: '12px', 
                 fontWeight: 800, 
                 textDecoration: 'none',
                 boxShadow: '0 8px 16px rgba(34, 211, 238, 0.3)',
                 transition: 'transform 0.2s'
               }}
               onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
               onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
             >
               Compose Email
             </a>
          </div>
        </div>
      <div className="util-container" style={{ marginTop: '80px' }}>
        <div style={{ background: 'var(--bg-panel)', padding: '48px', borderRadius: '24px', border: '1px solid var(--border-subtle)' }}>
          <article style={{ color: 'var(--text-secondary)', lineHeight: '1.9', fontSize: '15px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '32px' }}>Communication and Support at Unblocked Games 76</h2>
            <p style={{ marginBottom: '20px' }}>
              At <strong>Unblocked Games 76</strong>, we believe that open communication with our community is the cornerstone of our success. Our platform was built for gamers, by gamers, and your feedback is what drives our continuous improvement. Whether you have a question about a specific game, a suggestion for a new feature, or need technical assistance with our mirroring technology, we are here to help.
            </p>
            <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px', color: 'var(--text-primary)' }}>Why Your Feedback Matters</h3>
            <p style={{ marginBottom: '20px' }}>
              Every email we receive is a valuable piece of data that helps us understand the needs and preferences of our users. We take the time to read every message, whether it's a simple "thank you" or a detailed bug report. Your suggestions for new games are particularly welcome. Our library is constantly growing, and many of our most popular titles were added because a user like you took the time to reach out and recommend it. We prioritize games that are high-performance, secure, and offer genuine entertainment value.
            </p>
            <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px', color: 'var(--text-primary)' }}>Our Commitment to a Safe Gaming Environment</h3>
            <p style={{ marginBottom: '20px' }}>
              One of the most common reasons users contact us is to report issues with ads or game performance. We take these reports very seriously. Maintaining a safe, family-friendly environment is our top priority. We strictly vet our advertising partners to ensure that only appropriate content is displayed. If you ever encounter an ad that feels intrusive or inappropriate, please don't hesitate to contact us with a description or a screenshot. We will investigate immediately and take the necessary action to rectify the situation.
            </p>
            <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px', color: 'var(--text-primary)' }}>Technical Support and Accessibility</h3>
            <p style={{ marginBottom: '20px' }}>
              As a platform that specializes in "unblocked" content, we understand the technical challenges involved in bypassing network filters. If you find that our site is blocked on your network, we encourage you to reach out. While we cannot guarantee that we can bypass every firewall, we are constantly updating our infrastructure and mirrors. Your reports help us identify which regions or networks are experiencing difficulties, allowing us to deploy new solutions more effectively.
            </p>
            <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px', color: 'var(--text-primary)' }}>Join Our Growing Community</h3>
            <p style={{ marginBottom: '20px' }}>
              Beyond just providing games, <strong>Unblocked Games 76</strong> is a community. We are active on various social media platforms and forums where we engage with our fans. Contacting us via email is just one way to stay connected. We also encourage you to check out our "About Us" page to learn more about our mission and the team behind the scenes. We are committed to remaining the #1 source for unblocked entertainment, and we look forward to hearing from you.
            </p>
            <p style={{ marginBottom: '20px' }}>
              In conclusion, whether you're a student looking for a quick break between classes or a professional seeking some stress relief, Unblocked Games 76 is your home for fun. Thank you for being a part of our journey. Your support and engagement are what make this platform possible. Happy gaming!
            </p>
            
            <div style={{ marginTop: '48px', padding: '32px', background: 'rgba(0,0,0,0.02)', borderRadius: '16px', textAlign: 'center' }}>
              <p style={{ fontSize: '14px', fontStyle: 'italic', margin: 0 }}>
                Note: To ensure a quick response, please be as descriptive as possible in your emails. Including your browser type, device, and the specific URL of the game you are referencing will help our support team assist you more effectively.
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
  );
}
