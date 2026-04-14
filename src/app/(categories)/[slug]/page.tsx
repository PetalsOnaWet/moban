import { getGames, getGamesByCategory } from "@/lib/core/games";
import { CompactGameCard } from "@/components/games/GameGrid";
import { CategoryClientArea } from "@/components/games/CategoryClientArea";
import { notFound } from "next/navigation";
import { Metadata } from "next";

import { Breadcrumbs } from "@/components/games/Breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/SchemaMarkup";

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
  
  let cleanTitle = decodedSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  if (!cleanTitle.toLowerCase().endsWith(' games')) {
    cleanTitle += ' Games';
  } else {
    cleanTitle = cleanTitle.substring(0, cleanTitle.length - 6) + ' Games';
  }
  
  const pageSuffix = pageNum > 1 ? ` - Page ${pageNum}` : "";
  
  return {
    title: `${cleanTitle}${pageSuffix} - Play Free Online on Geometry Dash Lite`,
    description: `Play the best online ${cleanTitle.toLowerCase()}${pageSuffix} for free. Discover a wide variety of ${cleanTitle.toLowerCase()} and enjoy the ultimate gaming experience.`,
    alternates: {
      canonical: `/${slug}${pageNum > 1 ? `?page=${pageNum}` : ''}`
    }
  };
}

import { redirect, RedirectType } from "next/navigation";

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page } = await searchParams;
  const decodedSlug = decodeURIComponent(slug);
  const currentPage = parseInt(page || '1', 10);
  
  // SEO REDIRECT: If old short URL is used, redirect to -games version
  if (!decodedSlug.endsWith('-games')) {
    const newPath = `/${decodedSlug}-games${currentPage > 1 ? `?page=${currentPage}` : ''}`;
    redirect(newPath, RedirectType.replace);
  }

  // Strip '-games' for internal data lookup
  const lookupSlug = decodedSlug.replace(/-games$/, '');
  
  // 1. Data Fetching from JSON
  const { games, totalCount } = await getGamesByCategory(lookupSlug, currentPage, 20);

  let cleanTitle = decodedSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  if (cleanTitle.toLowerCase().endsWith(' games')) {
    cleanTitle = cleanTitle.substring(0, cleanTitle.length - 6) + ' Games';
  } else {
    cleanTitle += ' Games';
  }
  
  const displayTitle = cleanTitle;

  return (
    <div className="animate-fade-in" style={{ padding: '0 0 64px' }}>
      {/* SEO Structured Data */}
      <BreadcrumbSchema items={[
        { name: "Home", item: "/" },
        { name: displayTitle, item: `/${slug}` }
      ]} />
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 48px' }}>
        
        <main style={{ minWidth: 0 }}>
           <div style={{ marginBottom: '24px' }}>
              <Breadcrumbs categoryName={displayTitle} categorySlug={slug} />
           </div>

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
                            The Ultimate Guide to Best {displayTitle} Games
                        </h1>
                        <div style={{ width: '60px', height: '4px', background: 'var(--accent-cyan)', margin: '0 auto' }} />
                    </header>

                    <section style={{ marginBottom: '48px' }}>
                        <p style={{ fontSize: '18px', marginBottom: '24px' }}>
                            Welcome to our dedicated collection of <strong style={{color: 'var(--text-primary)'}}>{displayTitle} games</strong>. In the rapidly evolving landscape of browser-based gaming, these titles stand out as the pinnacle of entertainment, offering a perfect blend of accessibility, challenge, and pure unadulterated fun. Whether you are a seasoned gamer looking for the next big challenge or a casual player seeking a quick escape during your break, our curated selection of {displayTitle} games is designed to cater to every skill level and preference.
                        </p>
                        <p style={{ fontSize: '18px', marginBottom: '24px' }}>
                            These games represent the best of what the web platform has to offer today. Our platform ensures that every title in the {displayTitle} category runs smoothly directly in your browser, requiring no downloads, no installations, and absolutely no costs. It is unblocked gaming at its finest, accessible from any device at any time.
                        </p>
                    </section>
                    
                    <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px', color: '#111827' }}>The Evolution of {displayTitle} Gaming</h2>
                    <section style={{ marginBottom: '48px' }}>
                        <p style={{ marginBottom: '24px' }}>
                            The {displayTitle} genre has evolved significantly over the years. From simple arcade mechanics to complex 3D experiences, these games have pushed the boundaries of browser technology. Players worldwide enjoy {displayTitle} games for their unique challenges and innovative gameplay.
                        </p>
                    </section>

                    <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px', color: '#111827' }}>Frequently Asked Questions (FAQ)</h2>
                    <section style={{ background: 'var(--bg-input)', padding: '32px', borderRadius: '12px', border: '1px solid var(--border-standard)' }}>
                        <div style={{ marginBottom: '24px' }}>
                            <h3 style={{ fontWeight: 700, marginBottom: '8px' }}>Are these {displayTitle} games truly free?</h3>
                            <p>Yes, every game in our collection is 100% free to play. We use an ad-supported model to ensure you never have to pay to enjoy premium gaming content.</p>
                        </div>
                    </section>
                </article>
             </div>
           )}
        </main>
      </div>
    </div>
  );
}
