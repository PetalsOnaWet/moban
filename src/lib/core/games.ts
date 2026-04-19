import { getCloudflareContext } from "@opennextjs/cloudflare";
import gamesData from "@/config/games-data.json";

export interface Game {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  iframe_url: string;
  mirror_urls?: string[]; // Alternative unblocked sources
  category: string;
  tags: string | null;
  is_featured: boolean;
  rating?: number;
  votes?: number;
  created_at: string;
  screenshots?: string[];
  screenshot_alts?: string[];
  expert_tips?: string;
  secrets?: string[];
}

/**
 * Helper to aggregate ratings for games from D1
 */
async function attachRatings(games: any[]) {
  if (!games.length) return games;

  const env = await getSafeContext();
  if (!env || !env.DB) {
    // Fallback to 0 ratings if DB is not available
    return games.map(g => ({ ...g, rating: 0, votes: 0 }));
  }

  const db = env.DB as D1Database;
  const slugs = games.map(g => g.slug);
  const placeholders = slugs.map(() => '?').join(',');

  try {
    const { results: stats } = await db.prepare(`
      SELECT slug, total_rating, vote_count 
      FROM game_stats 
      WHERE slug IN (${placeholders})
    `)
      .bind(...slugs)
      .all();

    const statsMap = new Map(stats.map((s: any) => [s.slug, s]));

    return games.map(g => {
      const s = statsMap.get(g.slug) as any;
      const votes = s ? s.vote_count : 0;
      const total = s ? s.total_rating : 0;
      return {
        ...g,
        rating: votes > 0 ? Math.round((total / votes) * 10) / 10 : 0,
        votes: votes
      };
    });
  } catch (error) {
    console.error("D1 Rating Fetch Error:", error);
    return games.map(g => ({ ...g, rating: 0, votes: 0 }));
  }
}

/**
 * Safe context getter
 */
let isCloudflareUnavailable = false;

export async function getSafeContext(): Promise<any> {
  if (isCloudflareUnavailable) return null;
  try {
    const context = await getCloudflareContext({ async: true });
    if (context && context.env) return context.env;
  } catch (e) {
    if (String(e).includes("workerd") || String(e).includes("platform")) {
      isCloudflareUnavailable = true;
    }
  }
  try {
    const context = getCloudflareContext();
    if (context && context.env) return context.env;
  } catch (e) { }
  return null;
}

/**
 * Get all games (JSON Driven)
 */
export async function getGames(limit: number = 24) {
  const games = gamesData.slice(0, limit).map(g => ({
    ...g,
    id: (g as any).id || g.slug,
  }));
  return await attachRatings(games) as unknown as Game[];
}

/**
 * Get single game by slug
 */
export async function getGameBySlug(slug: string) {
  const game = gamesData.find(g => g.slug === slug);
  if (!game) return null;
  const games = await attachRatings([{
    ...game,
    id: (game as any).id || game.slug,
  }]);
  return games[0] as unknown as Game;
}

/**
 * Get related games
 */
export async function getRelatedGames(currentSlug: string, category: string, limit: number = 60) {
  const related = gamesData
    .filter(g => g.slug !== currentSlug && (g.category === category || g.is_featured))
    .slice(0, limit)
    .map(g => ({
      ...g,
      id: (g as any).id || g.slug,
    }));

  return await attachRatings(related) as unknown as Game[];
}

/**
 * Get games by taxonomy (Category or Tag)
 */
export async function getGamesByCategory(taxonomy: string, page: number = 1, limit: number = 20) {
  // Normalize: remove -games suffix if present to match internal data
  let normalizedTax = taxonomy.toLowerCase();
  if (normalizedTax.endsWith('-games')) {
    normalizedTax = normalizedTax.replace(/-games$/, '');
  }

  // Filter by category OR tag OR special slug OR smarter search fallback
  const filtered = gamesData.filter(g => {
    // 1. Special cases (Logical)
    if (normalizedTax === 'hot') return ((g as any).rating || 0) > 4.5;
    if (normalizedTax === 'new') {
      const createdDate = new Date((g as any).created_at).getTime();
      const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
      return (new Date().getTime() - createdDate) < thirtyDaysInMs;
    }

    // 2. Direct matches (Category/Tags)
    const catMatch = g.category && g.category.toLowerCase().includes(normalizedTax);
    const tagMatch = g.tags && g.tags.toLowerCase().includes(normalizedTax);

    // 3. Smart Fallback for sidebar items like "flying", "jumping", "rhythm"
    // We check if title or description contains the keyword
    const searchMatch = g.title.toLowerCase().includes(normalizedTax) ||
      (g.description && g.description.toLowerCase().includes(normalizedTax));

    return catMatch || tagMatch || searchMatch;
  });

  const totalCount = filtered.length;
  const sliced = filtered
    .slice((page - 1) * limit, page * limit)
    .map(g => ({
      ...g,
      id: (g as any).id || g.slug, // Ensure unique ID for React keys
    }));

  const gamesWithRatings = await attachRatings(sliced);
  return { games: gamesWithRatings as unknown as Game[], totalCount };
}

// Keep search function
export async function searchGames(query: string, limit: number = 50) {
  const normalizedQuery = query.toLowerCase();
  const results = gamesData.filter(g =>
    g.title.toLowerCase().includes(normalizedQuery) ||
    (g.description && g.description.toLowerCase().includes(normalizedQuery))
  ).slice(0, limit)
    .map(g => ({
      ...g,
      id: (g as any).id || g.slug,
    }));

  return await attachRatings(results) as unknown as Game[];
}


// Get unique categories with slugs
export const getCategories = () => {
  const categories = Array.from(new Set(gamesData.map(g => g.category))).sort();
  return categories.map(cat => ({
    name: cat,
    slug: `${cat.toLowerCase().replace(/\s+/g, '-')}-games`
  }));
};
