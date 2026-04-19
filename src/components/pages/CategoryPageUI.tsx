import Link from "next/link";
import { CompactGameCard } from "@/components/games/GameGrid";
import { CategoryClientArea } from "@/components/games/CategoryClientArea";
import { Breadcrumbs } from "@/components/games/Breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/SchemaMarkup";

interface CategoryPageUIProps {
  slug: string;
  games: any[];
  totalCount: number;
  currentPage: number;
}

export function CategoryPageUI({ slug, games, totalCount, currentPage }: CategoryPageUIProps) {
  const displayTitle = slug.replace(/-games$/, '').split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="animate-fade-in" style={{ padding: '0 0 64px 6px' }}>
      <div className="util-container">
        <div style={{ padding: '24px 0' }}>
          <Breadcrumbs 
            categoryName={`${displayTitle} Games`} 
            categorySlug={slug} 
          />
        </div>

        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ 
            fontSize: 'clamp(32px, 5vw, 48px)', 
            fontWeight: 900, 
            color: 'var(--text-primary)', 
            marginBottom: '16px',
            letterSpacing: '-0.02em'
          }}>
            {displayTitle} Games
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '800px' }}>
            Explore the best collection of {displayTitle.toLowerCase()} games. Play unblocked, free, and directly in your browser.
          </p>
        </div>

        <CategoryClientArea 
          initialGames={games} 
          totalCount={totalCount} 
          currentPage={currentPage} 
          categorySlug={slug}
        />

        {/* SEO Content Area */}
        <div style={{ marginTop: '80px', padding: '48px', background: 'var(--bg-panel)', borderRadius: '24px', border: '1px solid var(--border-subtle)' }}>
            <article className="prose" style={{ color: 'var(--text-secondary)', maxWidth: '100%' }}>
                <h2 style={{ color: 'var(--text-primary)', fontSize: '32px', marginBottom: '24px' }}>Level Up Your {displayTitle} Gaming Experience</h2>
                <section style={{ marginBottom: '48px' }}>
                    <p style={{ marginBottom: '24px', fontSize: '17px', lineHeight: '1.8' }}>
                        Welcome to the most comprehensive destination for <strong style={{color: 'var(--text-primary)'}}>{displayTitle} games</strong> on the web. In the modern era of digital entertainment, where access to high-quality gaming can often be restricted by school firewalls or workplace filters, <Link href="/" style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>Unblocked Games 76</Link> stands as a beacon for gamers seeking freedom and fun. Our platform is meticulously designed to provide a seamless, high-performance experience that allows you to dive into your favorite {displayTitle.toLowerCase()} titles without any hurdles.
                    </p>

                    <h2 style={{ color: 'var(--text-primary)', fontSize: '24px', fontWeight: 800, marginBottom: '20px' }}>The Evolution of {displayTitle} Gaming</h2>
                    <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                        The world of {displayTitle.toLowerCase()} gaming has undergone a massive transformation over the last decade. What used to be simple, pixelated experiences have now evolved into complex, visually stunning masterpieces that run directly in your browser. This evolution is driven by the transition from legacy technologies like Flash to the modern, secure, and robust HTML5 standard. At <strong>Unblocked Games 76</strong>, we have embraced this change, ensuring that every {displayTitle.toLowerCase()} game in our collection is optimized for the latest web standards. This means faster load times, smoother frame rates, and a significantly more secure environment for our users.
                    </p>
                    <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                        Whether you are a fan of high-speed action, strategic puzzles, or immersive simulations, our {displayTitle} category offers a diverse range of titles that cater to every skill level. We understand that diversity is key to a great gaming experience, which is why our curators are constantly scouring the web for the next big hit to add to our growing library.
                    </p>

                    <h2 style={{ color: 'var(--text-primary)', fontSize: '24px', fontWeight: 800, marginBottom: '20px' }}>Why Play {displayTitle} Games on Unblocked Games 76?</h2>
                    <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                        Choosing the right platform for your gaming needs is crucial. Here at <strong>Unblocked Games 76</strong>, we prioritize the user experience above all else. When you play {displayTitle.toLowerCase()} games here, you are benefiting from our state-of-the-art infrastructure. Our servers are located at the edge of the network, meaning that the physical distance between you and the game data is minimized, resulting in nearly zero latency. This is particularly important for fast-paced {displayTitle.toLowerCase()} games where every millisecond counts.
                    </p>
                    <ul style={{ marginBottom: '24px', paddingLeft: '20px', listStyleType: 'disc', lineHeight: '1.8' }}>
                        <li style={{ marginBottom: '12px' }}><strong>Zero Cost:</strong> All our games are 100% free. No hidden fees, no subscriptions, and no "pay-to-win" barriers.</li>
                        <li style={{ marginBottom: '12px' }}><strong>No Downloads Required:</strong> Say goodbye to bulky installations and storage issues. Everything runs in your browser.</li>
                        <li style={{ marginBottom: '12px' }}><strong>Universal Compatibility:</strong> Whether you're on a Chromebook, a high-end PC, or a mobile device, our platform adjusts to your hardware.</li>
                        <li style={{ marginBottom: '12px' }}><strong>Safe & Secure:</strong> We use SSL encryption and vet all our partners to ensure a family-friendly environment.</li>
                    </ul>

                    <h2 style={{ color: 'var(--text-primary)', fontSize: '24px', fontWeight: 800, marginBottom: '20px' }}>Mastering the Mechanics of {displayTitle} Games</h2>
                    <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                        To truly excel in {displayTitle.toLowerCase()} games, one must understand the underlying mechanics that define the genre. Most titles in this category rely on a combination of quick reflexes, spatial awareness, and strategic planning. We recommend starting with some of our featured titles to get a feel for the control schemes, which are typically intuitive—using the WASD keys or the arrow keys for movement, and simple mouse clicks for interaction.
                    </p>
                    <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                        One of the unique aspects of {displayTitle.toLowerCase()} gaming is the community. Many of our games feature leaderboards and competitive modes where you can test your skills against players from around the world. We encourage you to practice, refine your techniques, and climb to the top of the rankings. Remember, the key to mastery is consistency and learning from each session.
                    </p>

                    <h3 style={{ color: 'var(--text-primary)', fontSize: '24px', fontWeight: 800, marginBottom: '20px' }}>Playing {displayTitle} Games at School or Work</h3>
                    <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                        The "Unblocked" in our name is a promise. We know how frustrating it can be when you have a few minutes of downtime but find that your favorite sites are restricted. <strong>Unblocked Games 76</strong> is designed to bypass these common network filters by using advanced mirroring and hosting techniques. We constantly update our domains and infrastructure to ensure that you can access your favorite {displayTitle.toLowerCase()} games whenever you need a break. This makes us the #1 choice for students and office workers globally who are looking for a reliable source of entertainment.
                    </p>

                    <h3 style={{ color: 'var(--text-primary)', fontSize: '24px', fontWeight: 800, marginBottom: '20px' }}>The Future of Browser-Based Gaming</h3>
                    <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                        As web technologies continue to advance, the line between browser games and native applications is blurring. With the advent of WebGL and WebAssembly, we are seeing {displayTitle.toLowerCase()} games that rival console titles in terms of graphical fidelity and complexity. <strong>Unblocked Games 76</strong> is at the forefront of this revolution, providing a platform that supports these next-generation experiences. We are committed to remaining the premier destination for high-quality, accessible, and unblocked entertainment for years to come.
                    </p>
                    <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                        In conclusion, if you are looking for the best <Link href={`/${slug}/`} style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>{displayTitle} games</Link> available online, you have come to the right place. Dive in, explore our vast collection, and discover why millions of gamers choose Unblocked Games 76 as their home for fun. Happy gaming!
                    </p>
                </section>
            </article>
        </div>
      </div>
      <BreadcrumbSchema items={[
        { name: "Home", item: "/" },
        { name: `${displayTitle} Games`, item: `/${slug}` }
      ]} />
    </div>
  );
}
