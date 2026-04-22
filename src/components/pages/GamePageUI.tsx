"use client";
import { BookOpen, Gamepad2, Info, Share2, Star, Trophy, Lightbulb } from 'lucide-react';

import Link from "next/link";
import { GamePlayerArea } from "@/components/games/GamePlayerArea";
import { CompactGameCard } from "@/components/games/GameGrid";
import { GameTags } from "@/components/games/GameTags";
import { DiscussionBox } from "@/components/games/DiscussionBox";
import { DiscoveryAds } from "@/components/layout/DiscoveryAds";
import { Breadcrumbs } from "@/components/games/Breadcrumbs";
import { GameRating } from "@/components/games/GameRating";
import { HistoryTracker } from "@/components/games/HistoryTracker";
import { GameCheats } from "@/components/games/GameCheats";
import { GameSchema, BreadcrumbSchema } from "@/components/seo/SchemaMarkup";

interface GamePageUIProps {
  game: any;
  relatedGames: any[];
}

export function GamePageUI({ game, relatedGames }: GamePageUIProps) {
    const topAdGames = relatedGames.slice(0, 3);
    const horizontalGridGames = relatedGames.slice(3, 13);
    const remainingGames = relatedGames.slice(13);
    const sidebarCount = Math.min(Math.floor(remainingGames.length / 2), 6);
    const leftSidebarGames = remainingGames.slice(0, sidebarCount);
    const rightSidebarGames = remainingGames.slice(sidebarCount, sidebarCount * 2);

    const InlineImage = ({ src, alt, index }: { src: string, alt?: string, index: number }) => (
        <div style={{ margin: '32px 0', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-subtle)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <img 
                src={src} 
                alt={alt || `${game.title} Screenshot ${index + 1}`} 
                style={{ width: '100%', height: 'auto', display: 'block' }}
                onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://placehold.co/800x450/111/fff?text=${encodeURIComponent(game.title)}+Screenshot+${index + 1}`;
                }}
            />
        </div>
    );

    return (
        <div className="animate-fade-in" style={{ padding: '0 0 64px', backgroundColor: 'var(--bg-site)', color: 'var(--text-primary)' }}>
            <div className="util-container">
                <GamePlayerArea
                    title={game.title}
                    url={game.iframe_url}
                    mirror_urls={game.mirror_urls}
                />

                <div className="row-discovery" style={{ marginBottom: '32px', alignItems: 'flex-start' }}>
                    <DiscoveryAds />
                    <div className="grid-discovery-inner desktop-only">
                        {topAdGames.map(g => (
                            <CompactGameCard key={g.id} game={g} showCategory={false} />
                        ))}
                    </div>
                </div>

                <div className="grid-mobile-2 desktop-only" style={{ marginBottom: '32px' }}>
                    {horizontalGridGames.map(g => (
                        <CompactGameCard key={g.id} game={g} showCategory={false} />
                    ))}
                </div>

                <div className="layout-surround">
                    <aside style={{ position: 'sticky', top: '90px', display: 'flex', flexDirection: 'column', gap: '6px' }} className="desktop-only">
                        {leftSidebarGames.map(g => (
                            <CompactGameCard key={g.id} game={g} showCategory={false} />
                        ))}
                    </aside>

                    <main style={{ minWidth: 0 }}>
                        <div style={{ background: 'var(--bg-panel)', borderRadius: '4px', padding: '24px', border: '1px solid var(--border-subtle)', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
                                <Breadcrumbs
                                    gameTitle={game.title}
                                    categoryName={game.category}
                                    categorySlug={`${game.category.toLowerCase().replace(/\s+/g, '-')}-games`}
                                />
                                <GameRating slug={game.slug} votes={game.votes || 0} rating={game.rating || 0} />
                            </div>

                            <article style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                                <h1 style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '32px', letterSpacing: '-0.02em' }}>{game.title}</h1>
                                <section style={{ marginBottom: '40px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
                                        <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>About {game.title}</h2>
                                        <Link 
                                            href="#strategy-guide"
                                            style={{
                                                padding: '8px 16px',
                                                background: 'rgba(34, 211, 238, 0.1)',
                                                border: '1px solid rgba(34, 211, 238, 0.3)',
                                                borderRadius: '8px',
                                                fontSize: '14px',
                                                fontWeight: 700,
                                                color: 'var(--accent-cyan)',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                transition: 'all 0.2s ease'
                                            }}
                                            className="hover-lift"
                                        >
                                            <BookOpen className="w-4 h-4" /> Jump to Strategy Guide &darr;
                                        </Link>
                                    </div>
                                    <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.8' }}>
                                        Experience the thrill of <strong>{game.title}</strong> directly in your browser. {game.description} As one of the most popular titles on <Link href="/" style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>Unblocked Games 76</Link>, {game.title} offers an immersive experience that combines challenging gameplay with seamless performance. Whether you are playing at school, work, or home, our platform ensures that you have unrestricted access to this gaming masterpiece.
                                    </p>
                                    
                                    {game.screenshots?.[0] && <InlineImage src={game.screenshots[0]} alt={game.screenshot_alts?.[0]} index={0} />}

                                    <h2 style={{ fontSize: '19px', fontWeight: 800, marginBottom: '16px', color: 'var(--text-primary)' }}>How to Play {game.title} Unblocked</h2>
                                    <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                                        Getting started with <strong>{game.title}</strong> is incredibly simple. Our version is fully unblocked, meaning you don't need to worry about restrictive firewalls or network filters. Simply click the play button above, and the game will load instantly. For the best experience, we recommend playing in full-screen mode to truly immerse yourself in the action. The controls are designed to be intuitive, allowing both veterans and newcomers to jump right in and start enjoying the game.
                                    </p>

                                    {game.screenshots?.[1] && <InlineImage src={game.screenshots[1]} alt={game.screenshot_alts?.[1]} index={1} />}

                                    <h2 style={{ fontSize: '19px', fontWeight: 800, marginBottom: '16px', color: 'var(--text-primary)' }}>Game Mechanics and Features</h2>
                                    <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                                        The core appeal of {game.title} lies in its unique mechanics. Unlike many other browser games, {game.title} features high-fidelity graphics and responsive controls that provide a "native" feel. The gameplay is built on a foundation of skill and strategy, requiring players to adapt to increasingly difficult challenges. As you progress, you'll unlock new features and discover hidden depth that keeps the experience fresh and engaging.
                                    </p>

                                    {game.screenshots?.[2] && <InlineImage src={game.screenshots[2]} alt={game.screenshot_alts?.[2]} index={2} />}

                                    <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                                        One of the standout features of this version of {game.title} is its optimization for HTML5. This ensures that the game runs smoothly on a wide variety of devices, from low-powered Chromebooks to high-end gaming PCs. We have worked hard to minimize load times and maximize performance, so you can spend less time waiting and more time playing.
                                    </p>

                                    <h2 style={{ fontSize: '19px', fontWeight: 800, marginBottom: '16px', color: 'var(--text-primary)' }}>Tips and Strategies for Success</h2>
                                    <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                                        To master <strong>{game.title}</strong>, it's important to keep a few key strategies in mind. First, take the time to familiarize yourself with the control scheme. Precision is often the difference between victory and defeat. Second, don't be afraid to experiment. Many of the game's challenges can be approached in multiple ways, and finding your own unique style is part of the fun. Finally, keep an eye on the community leaderboards. Seeing how other top players approach the game can provide valuable insights and inspiration.
                                    </p>

                                    <h3 style={{ fontSize: '19px', fontWeight: 800, marginBottom: '16px', color: 'var(--text-primary)' }}>Why Choose Unblocked Games 76 for {game.title}?</h3>
                                    <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                                        At <strong>Unblocked Games 76</strong>, we are dedicated to providing the best possible environment for browser gaming. Our platform is built on modern web technologies that prioritize speed, security, and accessibility. When you play {game.title} on our site, you are benefiting from:
                                    </p>
                                    <ul style={{ marginBottom: '24px', paddingLeft: '20px', listStyleType: 'disc', lineHeight: '1.8' }}>
                                        <li style={{ marginBottom: '10px' }}><strong>High-Speed Edge Hosting:</strong> Reduced latency for a smoother gaming experience.</li>
                                        <li style={{ marginBottom: '10px' }}><strong>Privacy First:</strong> No accounts required, and we respect your data.</li>
                                        <li style={{ marginBottom: '10px' }}><strong>24/7 Availability:</strong> Our mirrors and alternative domains ensure you can always play.</li>
                                        <li style={{ marginBottom: '10px' }}><strong>Curation Excellence:</strong> We only host the highest quality games that are safe for all ages.</li>
                                    </ul>

                                    <h3 style={{ fontSize: '19px', fontWeight: 800, marginBottom: '16px', color: 'var(--text-primary)' }}>The Impact of {game.title} on the Gaming Community</h3>
                                    <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                                        Since its release, <strong>{game.title}</strong> has become a cultural phenomenon in the world of unblocked games. It has inspired countless players to test their limits and has fostered a vibrant community of fans. By providing a platform where this game can be enjoyed without restrictions, we are helping to ensure that the joy of gaming remains accessible to everyone, regardless of their location or network constraints.
                                    </p>
                                    <h3 style={{ fontSize: '19px', fontWeight: 800, marginBottom: '16px', color: 'var(--text-primary)' }}>Frequently Asked Questions (FAQ)</h3>
                                    <div style={{ display: 'grid', gap: '20px', marginBottom: '24px' }}>
                                        <div>
                                            <h4 style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '15px', marginBottom: '8px' }}>Is {game.title} really free to play?</h4>
                                            <p style={{ fontSize: '14px', lineHeight: '1.6' }}>Yes, <strong>{game.title}</strong> is 100% free on Unblocked Games 76. We believe in providing accessible entertainment to everyone without any hidden costs or subscriptions.</p>
                                        </div>
                                        <div>
                                            <h4 style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '15px', marginBottom: '8px' }}>Can I play {game.title} on my school Chromebook?</h4>
                                            <p style={{ fontSize: '14px', lineHeight: '1.6' }}>Absolutely! Our version of {game.title} is optimized for lightweight devices and uses advanced mirroring to bypass common school network filters.</p>
                                        </div>
                                        <div>
                                            <h4 style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '15px', marginBottom: '8px' }}>Do I need to download any plugins or files?</h4>
                                            <p style={{ fontSize: '14px', lineHeight: '1.6' }}>No downloads are necessary. {game.title} runs entirely in your web browser using HTML5 technology, making it safe and fast.</p>
                                        </div>
                                        <div>
                                            <h4 style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '15px', marginBottom: '8px' }}>How do I save my progress in {game.title}?</h4>
                                            <p style={{ fontSize: '14px', lineHeight: '1.6' }}>Most of our games, including {game.title}, save your progress automatically using your browser's local storage. Just make sure not to clear your cache if you want to keep your high scores!</p>
                                        </div>
                                    </div>

                                    <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                                        In conclusion, {game.title} is a must-play title for anyone looking for high-quality entertainment. Its combination of accessibility, depth, and fun makes it a standout choice in our library. So what are you waiting for? Dive into the world of <strong>{game.title}</strong> today and experience unblocked gaming at its finest.
                                    </p>

                                    {/* DEEP STRATEGY GUIDE MODULE */}
                                    {game.full_guide && (
                                        <section id="strategy-guide" style={{ marginTop: '64px', paddingTop: '64px', borderTop: '1px solid var(--border-subtle)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                                                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(34, 211, 238, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <BookOpen size={24} color="var(--accent-cyan)" />
                                                </div>
                                                <div>
                                                    <h2 style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>Master Strategy Guide & Walkthrough</h2>
                                                </div>
                                            </div>

                                            <div className="prose-container" style={{ 
                                                backgroundColor: 'rgba(255, 255, 255, 0.02)', 
                                                padding: '40px', 
                                                borderRadius: '24px', 
                                                border: '1px solid var(--border-subtle)',
                                                fontSize: '17px',
                                                lineHeight: '1.9',
                                                color: 'var(--text-secondary)'
                                            }}>
                                                <div dangerouslySetInnerHTML={{ 
                                                    __html: game.full_guide
                                                        .replace(/^# (.*$)/gim, '<h2>$1</h2>')
                                                        .replace(/^## (.*$)/gim, '<h3>$1</h3>')
                                                        .replace(/^### (.*$)/gim, '<h4>$1</h4>')
                                                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                                        .replace(/^\* (.*$)/gim, '<li>$1</li>')
                                                        .replace(/^- (.*$)/gim, '<li>$1</li>')
                                                        .replace(/\n\n/g, '</p><p>')
                                                        .replace(/\n/g, '<br/>')
                                                }} />
                                            </div>
                                        </section>
                                    )}
                                </section>

                                <GameCheats expert_tips={game.expert_tips} secrets={game.secrets} title={game.title} />
                            </article>

                            <GameTags game={game} />
                            <DiscussionBox slug={game.slug} title={game.title} />
                        </div>
                    </main>

                    <aside style={{ position: 'sticky', top: '90px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px' }}>
                        {rightSidebarGames.map(g => (
                            <CompactGameCard key={g.id} game={g} showCategory={false} />
                        ))}
                    </aside>
                </div>
                <GameSchema game={game} />
                <BreadcrumbSchema items={[
                    { name: "Home", item: "/" },
                    { name: game.category, item: `/${game.category.toLowerCase().replace(/\s+/g, '-')}-games` },
                    { name: game.title, item: `/${game.slug}` }
                ]} />
                <HistoryTracker game={game} />
            </div>
        </div>
    );
}
