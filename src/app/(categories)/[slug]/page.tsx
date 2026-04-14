import { getGames, getGamesByCategory } from "@/lib/core/games";
import { CompactGameCard } from "@/components/games/GameGrid";
import { CategoryClientArea } from "@/components/games/CategoryClientArea";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  return {
    title: `${decodedSlug} Games - Play Online for Free`,
    description: `Browse our collection of ${decodedSlug} games. Play the best ${decodedSlug} games unblocked in your browser.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  
  let categoryGames: any[] = [];
  let displayTitle = decodedSlug;

  // 1. Sidebar Slug -> Database Category Mapping
  const slugMapping: Record<string, string> = {
    'hot': 'HOT', 
    'new': 'NEW',
    'flying': 'Action',   // Mapping to Action for now or tags
    'jumping': 'Action',
    'music': 'Rhythm',
    'platformer': 'Action',
    'rhythm': 'Rhythm'
  };

  const targetCategory = slugMapping[decodedSlug.toLowerCase()] || decodedSlug;

  // 2. Data Fetching with fallsbacks
  if (targetCategory === 'HOT' || targetCategory === 'NEW') {
    categoryGames = await getGames(60);
    displayTitle = targetCategory === 'NEW' ? 'New Games' : 'Hot Games';
  } else {
    categoryGames = await getGamesByCategory(targetCategory, 60);
    displayTitle = `${targetCategory.charAt(0).toUpperCase() + targetCategory.slice(1)} Games`;
  }

  // 3. Graceful fallback instead of blunt 404
  if (!categoryGames || categoryGames.length === 0) {
    categoryGames = await getGames(24); // Fallback to hot games if category is empty
  }

  return (
    <div className="animate-fade-in" style={{ padding: '0 0 64px' }}>
      {/* 居中单栏容器，最大宽度 1400px，移除侧边栏 */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 48px' }}>
        
        <main style={{ minWidth: 0 }}>
           {/* 分类标题、Bento 矩阵及分页（集成于客户端组件中） */}
           <CategoryClientArea 
              initialGames={categoryGames} 
              title={displayTitle} 
           />

           {/* 800-WORD DEEP SEO CONTENT (SECOND SCREEN) */}
           <div style={{ marginTop: '80px', borderTop: '1px solid var(--border-subtle)', paddingTop: '64px' }}>
              <article style={{ color: '#374151', lineHeight: '1.8', maxWidth: '1000px', margin: '0 auto' }}>
                  <header style={{ marginBottom: '40px', textAlign: 'center' }}>
                      <h1 style={{ 
                          fontSize: '36px', 
                          fontWeight: 900, 
                          color: '#111827', 
                          marginBottom: '24px',
                          letterSpacing: '-0.02em'
                      }}>
                          The Ultimate Guide to Best {decodedSlug} Games
                      </h1>
                      <div style={{ width: '60px', height: '4px', background: 'var(--accent-cyan)', margin: '0 auto' }} />
                  </header>

                  <section style={{ marginBottom: '48px' }}>
                      <p style={{ fontSize: '18px', marginBottom: '24px' }}>
                          Welcome to our dedicated collection of <strong style={{color: 'var(--text-primary)'}}>{decodedSlug} games</strong>. In the rapidly evolving landscape of browser-based gaming, these titles stand out as the pinnacle of entertainment, offering a perfect blend of accessibility, challenge, and pure unadulterated fun. Whether you are a seasoned gamer looking for the next big challenge or a casual player seeking a quick escape during your break, our curated selection of {decodedSlug} games is designed to cater to every skill level and preference.
                      </p>
                      <p style={{ fontSize: '18px', marginBottom: '24px' }}>
                          These games represent the best of what the web platform has to offer today. With advanced technologies like WebGL and optimized JavaScript engines, you no longer need high-end hardware to enjoy stunning graphics and fluid gameplay. Our platform ensures that every title in the {decodedSlug} category runs smoothly directly in your browser, requiring no downloads, no installations, and absolutely no costs. It is unblocked gaming at its finest, accessible from any device at any time.
                      </p>
                  </section>

                  <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px', color: '#111827' }}>The Evolution of {decodedSlug} Gaming Genre</h2>
                  <section style={{ marginBottom: '48px' }}>
                      <p style={{ marginBottom: '24px' }}>
                          The history of the {decodedSlug} genre is as fascinating as the games themselves. Originally starting as simple hobbyist projects, these games have evolved into complex experiences with millions of devoted fans worldwide. The genre's growth has been fueled by a passionate community of creators and players who constantly push the boundaries of what is possible within a web browser. From the iconic rhythm-based platforming of titles like Geometry Dash to the innovative mechanics of modern hybrid genres, {decodedSlug} games have continuously reinvented themselves to stay relevant and engaging.
                      </p>
                      <p style={{ marginBottom: '24px' }}>
                          What makes {decodedSlug} games particularly special is their community-driven nature. Many of these titles feature robust level editors and sharing platforms, allowing the community to generate an endless stream of new content. This means that when you browse our category, you're not just looking at a static list of games; you're entering a living, breathing ecosystem where new challenges and experiences are born every single day. This constant innovation is what keeps players coming back to the {decodedSlug} category year after year.
                      </p>
                  </section>

                  <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px', color: '#111827' }}>Mastering the Mechanics: How to Excel in {decodedSlug} Games</h2>
                  <section style={{ marginBottom: '48px' }}>
                      <p style={{ marginBottom: '24px' }}>
                          To truly master {decodedSlug} games, one must develop a unique set of skills. These games often demand high levels of concentration, precise timing, and quick reflexes. For rhythm-based titles, the secret lies in internalizing the beat of the music. Each jump, slide, or action is perfectly synchronized with the soundtrack, making the audio just as important as the visual feedback. For more action-oriented {decodedSlug} titles, understanding hitbox mechanics and movement patterns is the key to success.
                      </p>
                      <ul style={{ paddingLeft: '24px', listStyleType: 'disc', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <li><strong>Timing is Everything:</strong> Most {decodedSlug} games are built on precise frames. Practice until you can anticipate the move before it happens.</li>
                          <li><strong>Learn the Patterns:</strong> While many levels seem chaotic, they are almost always built on repeating patterns. Identifying these will make even the hardest levels manageable.</li>
                          <li><strong>Use the Right Controls:</strong> Whether you prefer mouse clicks or keyboard strokes (like Space or Up Arrow), find what feels most responsive for you and stick with it.</li>
                          <li><strong>Patience and Persistence:</strong> Many of these games are designed to be challenging. Don't be discouraged by failures; each one is a step toward mastering the level.</li>
                      </ul>
                  </section>

                  <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px', color: '#111827' }}>Why Our {decodedSlug} Gaming Portal is the Best Choice</h2>
                  <section style={{ marginBottom: '48px' }}>
                      <p style={{ marginBottom: '24px' }}>
                          Our mission is to provide the safest, fastest, and most enjoyable platform for {decodedSlug} enthusiasts. We meticulously test every game before it makes its way onto our category list. This curation process ensures that you're only playing titles that meet our high standards for performance and gameplay quality. Furthermore, our site is optimized for speed, ensuring that you spend less time waiting for things to load and more time playing the games you love.
                      </p>
                      <p style={{ marginBottom: '24px' }}>
                          We also understand the importance of community. That is why we've integrated features like real-time play history, rating systems, and discussion boxes. You can see what others are playing, share your own scores, and join the conversation about your favorite {decodedSlug} titles. It's more than just a place to play; it's a home for the {decodedSlug} gaming community.
                      </p>
                  </section>

                  <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px', color: '#111827' }}>Frequently Asked Questions (FAQ)</h2>
                  <section style={{ background: 'var(--bg-input)', padding: '32px', borderRadius: '12px', border: '1px solid var(--border-standard)' }}>
                      <div style={{ marginBottom: '24px' }}>
                          <h3 style={{ fontWeight: 700, marginBottom: '8px' }}>Are these {decodedSlug} games truly free?</h3>
                          <p>Yes, every game in our collection is 100% free to play. We use an ad-supported model to ensure you never have to pay to enjoy premium gaming content.</p>
                      </div>
                      <div style={{ marginBottom: '24px' }}>
                          <h3 style={{ fontWeight: 700, marginBottom: '8px' }}>Can I play {decodedSlug} games unblocked at school or work?</h3>
                          <p>Our platform uses advanced hosting solutions designed to provide unblocked access in most network environments, making it ideal for breaks at school or work.</p>
                      </div>
                      <div style={{ marginBottom: '24px' }}>
                          <h3 style={{ fontWeight: 700, marginBottom: '8px' }}>Do I need to download anything?</h3>
                          <p>No, all {decodedSlug} games use browser-native technologies like HTML5 and WebAssembly. You can play them instantly without installing any additional software.</p>
                      </div>
                      <div>
                          <h3 style={{ fontWeight: 700, marginBottom: '8px' }}>Are my progress and high scores saved?</h3>
                          <p>Most of our modern {decodedSlug} titles use local storage to save your progress. As long as you don't clear your browser cache, your achievements will be waiting for you when you return.</p>
                      </div>
                  </section>
              </article>
           </div>
        </main>
      </div>
    </div>
  );
}
