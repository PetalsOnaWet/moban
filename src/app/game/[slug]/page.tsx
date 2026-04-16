import { getGameBySlug, getRelatedGames } from "@/lib/core/games";
import { GamePlayerArea } from "@/components/games/GamePlayerArea";
import { CompactGameCard } from "@/components/games/GameGrid";
import { GameTags } from "@/components/games/GameTags";
import { DiscussionBox } from "@/components/games/DiscussionBox";
import { DiscoveryAds } from "@/components/layout/DiscoveryAds";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/games/Breadcrumbs";
import { GameRating } from "@/components/games/GameRating";
import { HistoryTracker } from "@/components/games/HistoryTracker";
import { GameSchema, BreadcrumbSchema } from "@/components/seo/SchemaMarkup";

export const dynamic = "force-dynamic";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const game = await getGameBySlug(slug);
    if (!game) return { title: "Game Not Found" };
    return {
        title: `${game.title} - Geometry Dash Lite`,
        description: game.description,
    };
}

export default async function GamePage({ params }: Props) {
    const { slug } = await params;
    const game = await getGameBySlug(slug);

    if (!game) {
        notFound();
    }

    const relatedGames = await getRelatedGames(game.slug, game.category, 60);

    // Layout Slicing
    const topAdGames = relatedGames.slice(0, 3);
    const horizontalGridGames = relatedGames.slice(3, 12);
    const leftSidebarGames = relatedGames.slice(12, 18);
    const rightSidebarGames = relatedGames.slice(18, 24);

    return (
        <div className="animate-fade-in" style={{ padding: '0 0 64px' }}>
            <div className="util-container">

                {/* ROW 1: FIRST SCREEN (Player & Ad) */}
                <GamePlayerArea
                    title={game.title}
                    url={game.iframe_url}
                />

                {/* ROW 2: DISCOVERY ADS (2/3) + GAME ICONS (1/3) */}
                <div className="row-discovery" style={{ marginBottom: '32px', alignItems: 'flex-start' }}>
                    <DiscoveryAds />
                    <div className="grid-discovery-inner">
                        {topAdGames.map(g => (
                            <CompactGameCard key={g.id} game={g} />
                        ))}
                    </div>
                </div>

                {/* ROW 3: FULL HORIZONTAL GRID (9 Icons or grid-mobile-2) */}
                <div className="grid-mobile-2" style={{ marginBottom: '32px' }}>
                    {horizontalGridGames.map(g => (
                        <CompactGameCard key={g.id} game={g} />
                    ))}
                </div>

                {/* ROW 4: THE SURROUND BOX (SECOND SCREEN ONWARDS) */}
                <div className="layout-surround">
                    {/* LEFT STICKY SIDEBAR (Recommendation Surround) */}
                    <aside style={{
                        position: 'sticky',
                        top: '90px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px'
                    }} className="desktop-only">
                        {leftSidebarGames.map(g => (
                            <CompactGameCard key={g.id} game={g} />
                        ))}
                    </aside>

                    {/* CENTER CONTENT (Main SEO Content Area) */}
                    <main style={{ minWidth: 0 }}>
                        {/* Center Ad Placeholder */}
                        <div style={{ borderRadius: '4px', overflow: 'hidden', marginBottom: '32px' }}>
                            <div style={{ textAlign: 'center', padding: '6px 0' }}>
                                <div style={{
                                    display: 'inline-block',
                                    background: '#4AB7D8',
                                    padding: '2px 12px',
                                    color: '#000',
                                    fontWeight: 600,
                                    fontSize: '10px',
                                    borderRadius: '4px',
                                }}>
                                    Advertisement
                                </div>
                            </div>
                            <div style={{ height: '90px', background: 'transparent' }} />
                        </div>

                        {/* White Box Content Area */}
                        <div style={{ background: '#FFF', borderRadius: '4px', padding: '24px', border: '1px solid var(--border-subtle)', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                            {/* Content Header: Breadcrumbs & Rating */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '32px',
                                flexWrap: 'wrap',
                                gap: '16px'
                            }}>
                                <Breadcrumbs
                                    gameTitle={game.title}
                                    categoryName={game.category}
                                    categorySlug={`${game.category.toLowerCase().replace(/\s+/g, '-')}-games`}
                                />
                                <GameRating slug={game.slug} votes={game.votes || 0} rating={game.rating || 0} />
                            </div>

                            {/* SEO Structured Content */}
                            <article style={{ color: '#374151', lineHeight: '1.7' }}>
                                <h1 style={{
                                    fontSize: '28px',
                                    fontWeight: 900,
                                    color: '#111827',
                                    marginBottom: '32px',
                                    letterSpacing: '-0.02em'
                                }}>
                                    {game.title}
                                </h1>

                                <section style={{ marginBottom: '32px' }}>
                                    <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '20px', color: '#111827' }}>
                                        About {game.title}
                                    </h2>
                                    <p style={{ fontSize: '15px', color: '#4B5563', marginBottom: '24px' }}>
                                        {game.description}
                                    </p>
                                </section>

                                <section style={{ marginBottom: '48px' }}>
                                    <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px', color: '#111827' }}>
                                        What's {game.title}?
                                    </h2>
                                    <p style={{ fontSize: '17px', color: '#4B5563', marginBottom: '20px' }}>
                                        <span style={{ fontWeight: 700, color: '#4AB7D8' }}>{game.title}</span> is a free-to-play {game.category.toLowerCase()} version of the popular Geometry Dash game series.
                                        It offers players a taste of the challenging gameplay, iconic music tracks, and rhythmic platforming
                                        that made the original game a global sensation.
                                    </p>
                                </section>
                            </article>

                            <GameTags game={game} />
                            <DiscussionBox slug={game.slug} title={game.title} />
                        </div>
                    </main>

                    {/* RIGHT STICKY SIDEBAR (TWO COLUMNS) */}
                    <aside style={{
                        position: 'sticky',
                        top: '90px',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '6px'
                    }}>
                        {rightSidebarGames.map(g => (
                            <CompactGameCard key={g.id} game={g} />
                        ))}
                    </aside>
                </div>
                {/* SEO Structured Data */}
                <GameSchema game={game} />
                <BreadcrumbSchema items={[
                    { name: "Home", item: "/" },
                    { name: game.category, item: `/${game.category.toLowerCase().replace(/\s+/g, '-')}-games` },
                    { name: game.title, item: `/game/${game.slug}` }
                ]} />

                <HistoryTracker game={game} />
            </div>
        </div>
    );
}
