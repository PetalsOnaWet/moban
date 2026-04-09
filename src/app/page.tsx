import { siteConfig } from "@/config/site";
import { Star, Gamepad2, Search, TrendingUp, MessageSquare } from "lucide-react";
import { FAQSection } from "@/components/seo/FAQSection";
import { getGames, syncGamesToDB } from "@/lib/core/games";
import { GameGrid } from "@/components/games/GameGrid";
import Link from "next/link";

export default async function Home() {
  // Sync games from JSON to D1 for demo/initial run
  await syncGamesToDB();
  
  const games = await getGames(24);
  const featuredGames = games.filter(g => g.is_featured);
  return (
    <div className="animate-fade-in" style={{ paddingTop: '2rem' }}>
      <main>
        {/* Hero Area - Game Discovery Style */}
        <section style={{ padding: '4rem 0 2rem' }}>
          <div className="util-container">
            <div className="util-flex" style={{ justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
              <div>
                <h1 className="util-gradient-text" style={{ fontSize: '3rem', lineHeight: 1.1, marginBottom: '12px' }}>
                  Play the Best Unblocked Games
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
                  Free online games including {featuredGames.map(g => g.title).join(", ")} and more.
                </p>
              </div>
              <div className="util-flex" style={{ gap: '12px' }}>
                <div className="util-glass util-flex-center" style={{ padding: '10px 16px', borderRadius: 'var(--radius- pill)', gap: '8px' }}>
                  <TrendingUp size={16} /> <span style={{ fontSize: '14px' }}>Trending Now</span>
                </div>
              </div>
            </div>

            {/* Main Discovery Grid */}
            <div style={{ marginBottom: '64px' }}>
              <GameGrid games={games} />
            </div>
            
            <div className="util-flex-center">
               <button className="util-glass" style={{ padding: '0.75rem 3rem', color: 'var(--text-primary)', border: '1px solid var(--border-standard)' }}>
                 Load More Games
               </button>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section id="features" style={{ padding: '6rem 0', background: 'var(--bg-panel)' }}>
          <div className="util-container">
            <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '48px' }}>Popular Categories</h2>
            <div className="util-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              <div className="util-card util-flex-center" style={{ flexDirection: 'column', gap: '12px', textAlign: 'center' }}>
                <Gamepad2 size={32} color="var(--accent-violet)" />
                <h3>Action Games</h3>
              </div>
              <div className="util-card util-flex-center" style={{ flexDirection: 'column', gap: '12px', textAlign: 'center' }}>
                <Star size={32} color="var(--accent-violet)" />
                <h3>Featured</h3>
              </div>
              <div className="util-card util-flex-center" style={{ flexDirection: 'column', gap: '12px', textAlign: 'center' }}>
                <Search size={32} color="var(--accent-violet)" />
                <h3>Latest</h3>
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
                     <p style={{ color: 'var(--text-secondary)' }}>&quot;这个模板的 Linear 风格太纯正了，部署到 Cloudflare 真的很顺滑！&quot;</p>
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

        <FAQSection items={[
          {
            question: "这个模板为什么选择 Next.js 16？",
            answer: "Next.js 16 带来了稳定的 Turbopack 和 React Compiler，结合 Cloudflare Pages 的全球分发能力，能为您的商业站点提供极致的响应性能。"
          },
          {
            question: "如何修改网站的整体风格？",
            answer: "只需在 src/config/site.ts 中修改 theme 字段，即可在 Linear, Stripe 等预设风格间一键切换。"
          },
          {
            question: "是否支持多语言搜索引擎优化？",
            answer: "是的，模板内置了符合 @[/SEO Expert] 规范的元数据管理和 JSON-LD 支持，确保在全球范围内具有极佳的 SEO 表现。"
          }
        ]} />
      </main>

      <footer style={{ padding: '4rem 0', borderTop: '1px solid var(--border-standard)', marginTop: '4rem', background: 'var(--bg-marketing)' }}>
        <div className="util-container util-flex" style={{ justifyContent: 'space-between', color: 'var(--text-tertiary)', fontSize: '14px' }}>
          <div>© 2026 {siteConfig.name}. 使用 Cloudflare 驱动.</div>
          <div className="util-flex" style={{ gap: '24px' }}>
            <Link href={siteConfig.links.twitter}>Twitter</Link>
            <Link href={siteConfig.links.github}>GitHub</Link>
            <Link href="#">隐私政策</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
