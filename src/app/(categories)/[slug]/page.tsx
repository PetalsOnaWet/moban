import { getGames, getGamesByCategory } from "@/lib/core/games";
import { CompactGameCard } from "@/components/games/GameGrid";
import { CategoryClientArea } from "@/components/games/CategoryClientArea";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { page } = await searchParams;
  const decodedSlug = decodeURIComponent(slug);
  const pageNum = parseInt(page || '1', 10);
  
  const pageSuffix = pageNum > 1 ? ` - Page ${pageNum}` : "";
  
  return {
    title: `${decodedSlug} Games${pageSuffix} - Play Online for Free`,
    description: `Browse our collection of ${decodedSlug} games. Play the best ${decodedSlug} games unblocked in your browser.`,
    alternates: {
      canonical: `/(categories)/${slug}${pageNum > 1 ? `?page=${pageNum}` : ''}`
    }
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page } = await searchParams;
  const decodedSlug = decodeURIComponent(slug);
  const currentPage = parseInt(page || '1', 10);
  
  // 1. Sidebar Slug -> Database Category Mapping
  const slugMapping: Record<string, string> = {
    'hot': 'HOT', 
    'new': 'NEW',
    'flying': 'Action',
    'jumping': 'Action',
    'music': 'Rhythm',
    'platformer': 'Action',
    'rhythm': 'Rhythm'
  };

  const targetCategory = slugMapping[decodedSlug.toLowerCase()] || decodedSlug;

  // 2. Data Fetching with pagination
  const { games, totalCount } = await getGamesByCategory(targetCategory, currentPage, 20);

  const displayTitle = (targetCategory === 'HOT' || targetCategory === 'NEW')
    ? (targetCategory === 'NEW' ? 'New Games' : 'Hot Games')
    : `${targetCategory.charAt(0).toUpperCase() + targetCategory.slice(1)} Games`;

  return (
    <div className="animate-fade-in" style={{ padding: '0 0 64px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 48px' }}>
        
        <main style={{ minWidth: 0 }}>
           <CategoryClientArea 
              initialGames={games} 
              title={displayTitle} 
              currentPage={currentPage}
              totalGames={totalCount}
           />

           {/* 800-WORD DEEP SEO CONTENT (Only on First Page) */}
           {currentPage === 1 && (
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
                    
                    {/* ... Rest of the large article ... */}
                    <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px', color: '#111827' }}>The Evolution of {decodedSlug} Gaming Genre</h2>
                    <section style={{ marginBottom: '48px' }}>
                        <p style={{ marginBottom: '24px' }}>
                            The history of the {decodedSlug} genre is as fascinating as the games themselves. Originally starting as simple hobbyist projects, these games have evolved into complex experiences with millions of devoted fans worldwide. The genre's growth has been fueled by a passionate community of creators and players who constantly push the boundaries of what is possible within a web browser. From the iconic rhythm-based platforming of titles like Geometry Dash to the innovative mechanics of modern hybrid genres, {decodedSlug} games have continuously reinvented themselves to stay relevant and engaging.
                        </p>
                    </section>

                    <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px', color: '#111827' }}>Frequently Asked Questions (FAQ)</h2>
                    <section style={{ background: 'var(--bg-input)', padding: '32px', borderRadius: '12px', border: '1px solid var(--border-standard)' }}>
                        <div style={{ marginBottom: '24px' }}>
                            <h3 style={{ fontWeight: 700, marginBottom: '8px' }}>Are these {decodedSlug} games truly free?</h3>
                            <p>Yes, every game in our collection is 100% free to play. We use an ad-supported model to ensure you never have to pay to enjoy premium gaming content.</p>
                        </div>
                    </section>
                </article>
             </div>
           )}
        </main>
      </div>
  );
}
