import { Metadata } from "next";
import { getGames, getCategories } from "@/lib/core/games";
import { CompactGameCard } from "@/components/games/GameGrid";
import { GameSchema } from "@/components/seo/SchemaMarkup";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Unblocked Games 76: Play Best Free Online Games & Unblocked",
  description: "Play the best unblocked games 76 online for free. Experience a massive collection of rhythm, arcade, and puzzle games unblocked for school and work.",
  alternates: {
    canonical: "/",
  },
};

export const dynamic = "force-dynamic";

export default async function Home() {
  const allGames = await getGames(200) || [];
  const games = Array.isArray(allGames) ? allGames : [];
  
  // Create a "Stuffed" list by duplicating if necessary (as requested for placeholders)
  const stuffedGames = [...games, ...games, ...games].slice(0, 120);

  return (
    <div className="animate-fade-in" style={{ padding: '16px' }}>
      {/* Poki-style Bento Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gridAutoRows: '140px',
        gridAutoFlow: 'dense',
        gap: '12px',
        width: '100%',
      }}>
        {/* IMPROVED BRAND CARD */}
        <div style={{
          gridColumn: 'span 3',
          gridRow: 'span 2',
          background: 'linear-gradient(135deg, #1E1B4B 0%, #0F172A 100%)',
          borderRadius: '24px',
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
          zIndex: 10
        }}>
          {/* Subtle Texture */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }} />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h1 style={{ 
              fontSize: 'clamp(32px, 4vw, 48px)', 
              fontWeight: 900, 
              marginBottom: '16px', 
              lineHeight: 1.1, 
              color: '#FFFFFF',
              letterSpacing: '-0.04em'
            }}>
              Unblocked<br />
              <span style={{ color: '#00E5FF' }}>Games 76</span>
            </h1>
            
            <p style={{ 
              fontSize: '18px', 
              color: 'rgba(255, 255, 255, 0.9)', // High contrast white
              lineHeight: 1.5,
              maxWidth: '350px',
              fontWeight: 500
            }}>
              Experience the ultimate collection of free online games. High performance, zero limits.
            </p>
          </div>
        </div>

        {/* Game Cards with varying sizes */}
        {stuffedGames.map((game, index) => {
          // Define some "Big" or "Wide" items based on index or property
          let spanClass = { gridColumn: 'span 1', gridRow: 'span 1' };
          
          if (index === 0 || index === 7 || index === 15 || index === 28) {
             spanClass = { gridColumn: 'span 2', gridRow: 'span 2' }; // Big Square
          } else if (index === 3 || index === 12 || index === 22) {
             spanClass = { gridColumn: 'span 2', gridRow: 'span 1' }; // Wide
          } else if (index === 5 || index === 18) {
             spanClass = { gridColumn: 'span 1', gridRow: 'span 2' }; // Tall
          }

          return (
            <div key={`${game.id}-${index}`} style={{ ...spanClass }}>
              <CompactGameCard 
                game={game} 
                isBentoBig={spanClass.gridColumn === 'span 2'} 
                showCategory={false}
              />
            </div>
          );
        })}


      </div>

      {/* Full SEO Article at the bottom (Standard for these sites) */}
      <div style={{ marginTop: '64px', maxWidth: '1000px', margin: '64px auto 0' }}>
         <div style={{ 
           background: 'var(--bg-panel)', 
           borderRadius: '16px', 
           padding: '48px', 
           border: '1px solid var(--border-subtle)',
           boxShadow: '0 4px 24px rgba(0,0,0,0.02)'
         }}>
            <article style={{ color: 'var(--text-secondary)', lineHeight: '1.9', fontSize: '15px' }}>
                <h2 style={{ fontSize: '36px', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '32px', letterSpacing: '-0.02em' }}>
                    The Ultimate Guide to Unblocked Games 76
                </h2>
                
                <section style={{ marginBottom: '40px' }}>
                    <p style={{ marginBottom: '20px' }}>
                        In the modern digital era, gaming has become more than just a pastime; it's a global culture that brings people together. However, for many students and professionals, accessing their favorite games can be a challenge due to restrictive network filters at schools or workplaces. This is where <Link href="/" style={{ color: '#4AB7D8', fontWeight: 600 }}>Unblocked Games 76</Link> steps in. Our platform is dedicated to bridging the gap between restricted networks and high-quality entertainment, providing a safe, fast, and completely free environment for gamers of all ages.
                    </p>
                    <p style={{ marginBottom: '20px' }}>
                        But what exactly makes <strong>Unblocked Games 76</strong> the top choice for millions of users worldwide? It's not just about bypassing blocks; it's about the quality of the experience. We believe that every gamer deserves access to smooth, high-performance gameplay without the need for expensive hardware or complex installations. Our library is meticulously curated to ensure that every title—from the simplest clicker to the most intense <Link href="/category/rhythm" style={{ color: '#4AB7D8', fontWeight: 600 }}>rhythm platformer</Link>—runs flawlessly directly in your web browser.
                    </p>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px', color: 'var(--text-primary)' }}>Why Unblocked Games 76 is the Preferred Choice for Students</h2>
                    <p style={{ marginBottom: '16px' }}>
                        Educational institutions often implement strict firewalls to ensure students stay focused on their studies. While these measures are well-intentioned, everyone needs a break to recharge their mental energy. <strong>Unblocked Games 76</strong> serves as a reliable portal for these moments of relaxation. Our site utilizes advanced mirroring techniques and optimized hosting to remain accessible where other gaming sites might be flagged.
                    </p>
                    <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: 'var(--text-primary)' }}>Seamless Accessibility Anytime, Anywhere</h4>
                    <p style={{ marginBottom: '16px' }}>
                        One of the primary advantages of our platform is its universal compatibility. Whether you are using a Chromebook, a Windows PC, a Mac, or even a mobile device, <strong>Unblocked Games 76</strong> works seamlessly. We prioritize <Link href="/arcade-games" style={{ color: '#4AB7D8', fontWeight: 600 }}>HTML5 technology</Link>, which has replaced the outdated and insecure Flash player. This transition ensures that our games are more secure, use fewer system resources, and provide a much smoother frame rate, which is critical for skill-based games like <Link href="/geometry-dash-lite" style={{ color: '#4AB7D8', fontWeight: 600 }}>Geometry Dash</Link> or <Link href="/slope-game" style={{ color: '#4AB7D8', fontWeight: 600 }}>Slope</Link>.
                    </p>
                    <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: 'var(--text-primary)' }}>A Diverse Library of High-Quality Games</h4>
                    <p style={{ marginBottom: '16px' }}>
                        Diversity is the spice of life, and our game library reflects that philosophy. We don't just dump thousands of low-quality games onto our site. Instead, we hand-pick titles that offer genuine engagement. From the adrenaline-pumping <Link href="/racing-games" style={{ color: '#4AB7D8', fontWeight: 600 }}>racing games</Link> like <Link href="/moto-x3m" style={{ color: '#4AB7D8', fontWeight: 600 }}>Moto X3M</Link> to the creative world-building of <em>Minecraft Classic</em>, there is something for every type of gamer.
                    </p>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px', color: 'var(--text-primary)' }}>Top Categories on Unblocked Games 76</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                        {getCategories().slice(0, 3).map(cat => (
                            <div key={cat.slug} style={{ background: 'rgba(0,0,0,0.02)', padding: '24px', borderRadius: '12px' }}>
                                <h4 style={{ fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>
                                    <Link href={`/${cat.slug}`} style={{ color: 'inherit' }}>
                                        {cat.name} Games
                                    </Link>
                                </h4>
                                <p style={{ fontSize: '14px' }}>
                                    Explore our collection of {cat.name.toLowerCase()} titles. From classic mechanics to modern innovations, we have the best unblocked {cat.name.toLowerCase()} games.
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px', color: 'var(--text-primary)' }}>How to Safely Play Unblocked Games</h2>
                    <p style={{ marginBottom: '16px' }}>
                        Safety is our top priority. We understand the concerns regarding online security, especially for younger users. <strong>Unblocked Games 76</strong> is built with security in mind. We use SSL encryption (HTTPS) to protect your connection, and we do not require users to create accounts or provide personal information. Furthermore, we strictly vet our ad partners to ensure that the browsing experience remains clean and family-friendly.
                    </p>
                    <p style={{ marginBottom: '16px' }}>
                        To ensure the best experience, we recommend using a modern browser like Google Chrome or Mozilla Firefox. Keeping your browser updated not only improves security but also unlocks the latest performance optimizations for HTML5 games. If you ever find our site blocked, look for our official mirrors or check back later, as we constantly update our infrastructure to bypass new filters.
                    </p>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px', color: 'var(--text-primary)' }}>The Technology Behind Our Platform</h3>
                    <p style={{ marginBottom: '16px' }}>
                        Under the hood, <strong>Unblocked Games 76</strong> is powered by state-of-the-art web technologies. Built with Next.js 16 and hosted on high-speed edge servers, our site is designed for speed. We use advanced caching mechanisms to ensure that game assets load nearly instantly, reducing latency and providing a "native app" feel within your browser. This technical excellence is what sets us apart from older, slower gaming portals that often lag and crash on modern devices.
                    </p>
                </section>

                <section style={{ marginBottom: '48px' }}>
                    <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '32px', color: 'var(--text-primary)' }}>Frequently Asked Questions (FAQ)</h3>
                    <div style={{ display: 'grid', gap: '32px' }}>
                        <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '24px' }}>
                            <h4 style={{ fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>Is Unblocked Games 76 really free?</h4>
                            <p>Yes, 100%. We believe that fun should be accessible to everyone. There are no hidden fees, no subscriptions, and no "pay-to-win" mechanics on our platform. All games are free to play from start to finish.</p>
                        </div>
                        <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '24px' }}>
                            <h4 style={{ fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>Do I need to download anything to play?</h4>
                            <p>No downloads are required. All games on <strong>Unblocked Games 76</strong> run directly in your web browser using HTML5 technology. This makes our site perfect for devices with limited storage, like Chromebooks.</p>
                        </div>
                        <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '24px' }}>
                            <h4 style={{ fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>Why are some games blocked at my school?</h4>
                            <p>Schools use firewalls to restrict access to non-educational content. While we work hard to keep our site unblocked, some networks might still flag us. If this happens, try using our alternative URLs or mirrors which are updated frequently.</p>
                        </div>
                        <div style={{ paddingBottom: '24px' }}>
                            <h4 style={{ fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>Can I play these games on my phone?</h4>
                            <p>Absolutely! Our platform is fully responsive. The layout of <strong>Unblocked Games 76</strong> and the games themselves are optimized for touchscreens, so you can enjoy your favorite titles on the go.</p>
                        </div>
                    </div>
                </section>
                
                <footer style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '32px', textAlign: 'center' }}>
                    <p style={{ fontSize: '14px', fontStyle: 'italic' }}>
                        Thank you for choosing <strong>Unblocked Games 76</strong>. We are committed to remaining the #1 source for unblocked entertainment. Happy gaming!
                    </p>
                </footer>
            </article>
         </div>
      </div>

      <GameSchema game={games[0]} />
    </div>
  );
}
