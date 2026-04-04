import { siteConfig } from "@/config/site";
import { ArrowRight, Star, Zap, MessageSquare, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="animate-fade-in">
      <nav className="util-glass" style={{ position: 'sticky', top: 0, zIndex: 100, padding: '1rem 0' }}>
        <div className="util-container util-flex" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 590, fontSize: '1.25rem', color: 'var(--text-primary)' }}>
            {siteConfig.name}
          </div>
          <div className="util-flex" style={{ gap: '24px', fontSize: '14px', fontWeight: 510, color: 'var(--text-secondary)' }}>
            <a href="#features">功能</a>
            <a href="#wiki">百科</a>
            <a href="#faq">常见问题</a>
            <button className="util-btn-primary">开始构建</button>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section style={{ paddingTop: '8rem', paddingBottom: '6rem', textAlign: 'center' }}>
          <div className="util-container">
            <div className="util-glass" style={{ display: 'inline-flex', padding: '4px 12px', borderRadius: '99px', fontSize: '12px', marginBottom: '24px', color: 'var(--accent-violet)', border: '1px solid var(--accent-violet)' }}>
              Next.js 16 + Cloudflare 最佳实践已开启
            </div>
            <h1 className="util-gradient-text" style={{ fontSize: '4.5rem', lineHeight: 1, marginBottom: '24px', maxWidth: '800px', margin: '0 auto 24px' }}>
              构建您的下一个顶级商业网站
            </h1>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 48px', lineHeight: 1.6 }}>
              基于 Linear 设计语言，深度优化 SEO，适配 Cloudflare D1。让您的灵感在 10 分钟内部署上线。
            </p>
            <div className="util-flex-center" style={{ gap: '16px' }}>
              <button className="util-btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
                立即使用 <ArrowRight size={18} style={{ marginLeft: '8px', verticalAlign: 'middle' }} />
              </button>
              <button className="util-glass" style={{ padding: '0.75rem 2rem', fontSize: '1rem', color: 'var(--text-primary)', border: '1px solid var(--border-standard)' }}>
                查看文档
              </button>
            </div>
          </div>
        </section>

        {/* Categories/Features Section */}
        <section id="features" style={{ padding: '6rem 0', background: 'var(--bg-panel)' }}>
          <div className="util-container">
            <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '48px' }}>为多种场景深度优化</h2>
            <div className="util-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              <div className="util-card">
                <Zap size={32} color="var(--accent-violet)" style={{ marginBottom: '16px' }} />
                <h3>极致性能</h3>
                <p style={{ color: 'var(--text-tertiary)' }}>使用 Vanilla CSS 原子化开发，首屏加载比 Tailwind 更快，评分轻松 100 分。</p>
              </div>
              <div className="util-card">
                <Shield size={32} color="var(--accent-violet)" style={{ marginBottom: '16px' }} />
                <h3>SEO 专家级优化</h3>
                <p style={{ color: 'var(--text-tertiary)' }}>内置 JSON-LD 结构化数据，自动生成 Sitemap，对 Google 和 AI 搜索极其友好。</p>
              </div>
              <div className="util-card">
                <Star size={32} color="var(--accent-violet)" style={{ marginBottom: '16px' }} />
                <h3>SaaS Ready</h3>
                <p style={{ color: 'var(--text-tertiary)' }}>一键开启 Auth 与支付模块，从工具站到商用 SaaS 仅需修改一行配置。</p>
              </div>
            </div>
          </div>
        </section>

        {/* Comment/Rating Demo Section (SaaS Ready) */}
        {siteConfig.features.enableComments && (
          <section style={{ padding: '6rem 0' }}>
            <div className="util-container">
              <div className="util-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div className="util-flex" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h3 className="util-flex" style={{ gap: '8px', alignItems: 'center' }}>
                    <MessageSquare size={20} /> 社区评价
                  </h3>
                  {siteConfig.features.enableRatings && (
                    <div className="util-flex" style={{ color: '#fbbf24', gap: '4px' }}>
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <span style={{ color: 'var(--text-tertiary)', fontSize: '14px', marginLeft: '8px' }}>4.9/5</span>
                    </div>
                  )}
                </div>
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '24px' }}>
                  <div style={{ background: 'var(--bg-panel)', padding: '12px', borderRadius: 'var(--radius-m)', marginBottom: '12px', border: '1px solid var(--border-subtle)' }}>
                     <p style={{ fontSize: '14px', marginBottom: '4px' }}>开发者 A:</p>
                     <p style={{ color: 'var(--text-secondary)' }}>"这个模板的 Linear 风格太纯正了，部署到 Cloudflare 真的很顺滑！"</p>
                  </div>
                  {/* Mock Input for Demo */}
                  <div className="util-flex" style={{ gap: '12px', marginTop: '24px' }}>
                    <input 
                      type="text" 
                      placeholder="写下您的评价..." 
                      className="util-glass" 
                      style={{ flex: 1, padding: '10px 16px', color: 'var(--text-primary)', outline: 'none' }} 
                    />
                    <button className="util-btn-primary">发送</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer style={{ padding: '4rem 0', borderTop: '1px solid var(--border-standard)', marginTop: '4rem', background: 'var(--bg-marketing)' }}>
        <div className="util-container util-flex" style={{ justifyContent: 'space-between', color: 'var(--text-tertiary)', fontSize: '14px' }}>
          <div>© 2026 {siteConfig.name}. 使用 Cloudflare 驱动.</div>
          <div className="util-flex" style={{ gap: '24px' }}>
            <a href={siteConfig.links.twitter}>Twitter</a>
            <a href={siteConfig.links.github}>GitHub</a>
            <a href="#">隐私政策</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
