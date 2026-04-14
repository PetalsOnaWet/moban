import { getCloudflareContext } from "@opennextjs/cloudflare";
import gamesData from "@/config/games-data.json";

export interface Game {
  id: number;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  iframe_url: string;
  category: string;
  tags: string | null;
  is_featured: boolean;
  rating?: number;
  votes?: number;
  created_at: string;
}

/**
 * Helper to aggregate ratings for games
 */
async function attachRatings(db: D1Database, games: any[]) {
  if (!games.length) return [];
  
  const placeholders = games.map(() => '?').join(',');
  const slugs = games.map(g => g.slug);

  const { results: stats } = await db.prepare(`
    SELECT 
      page_id as slug, 
      AVG(rating) as avg_rating, 
      COUNT(*) as vote_count 
    FROM ratings 
    WHERE page_id IN (${placeholders})
    GROUP BY page_id
  `)
  .bind(...slugs)
  .all();

  const statsMap = new Map(stats.map((s: any) => [s.slug, s]));

  return games.map(g => {
    const s = statsMap.get(g.slug) as any;
    return {
      ...g,
      rating: s ? Math.round(s.avg_rating * 10) / 10 : 0,
      votes: s ? s.vote_count : 0
    };
  });
}

/**
 * Safe context getter
 */
let isCloudflareUnavailable = false;

async function getSafeContext(): Promise<any> {
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
  } catch (e) {}
  return null;
}

/**
 * Get all games
 */
export async function getGames(limit: number = 24) {
  const getStaticFallback = () => {
    return (gamesData as any[]).slice(0, limit).map(g => ({
      ...g,
      rating: 0,
      votes: 0,
    })) as Game[];
  };

  try {
    const env = await getSafeContext();
    const db = env?.DB as D1Database | undefined;

    if (!db) return getStaticFallback();

    const { results } = await db.prepare(
      "SELECT * FROM games ORDER BY created_at DESC LIMIT ?"
    )
    .bind(limit)
    .all();

    if (!results || results.length === 0) return getStaticFallback();

    return await attachRatings(db, results) as Game[];
  } catch (error) {
    return getStaticFallback();
  }
}

/**
 * Get single game by slug
 */
export async function getGameBySlug(slug: string) {
  const getStaticFallback = () => {
    const game = (gamesData as any[]).find(g => g.slug === slug);
    if (!game) return null;
    return { ...game, rating: 0, votes: 0 } as Game;
  };

  try {
    const env = await getSafeContext();
    const db = env?.DB as D1Database | undefined;

    if (!db) return getStaticFallback();

    const result = await db.prepare(
      "SELECT * FROM games WHERE slug = ?"
    )
    .bind(slug)
    .first();

    if (!result) return getStaticFallback();

    const ratedGames = await attachRatings(db, [result]);
    return ratedGames[0] as Game;
  } catch (error) {
    return getStaticFallback();
  }
}

/**
 * Get related games (Synchronized with surround layout needs)
 */
export async function getRelatedGames(currentSlug: string, category: string, limit: number = 60) {
  try {
    const env = await getSafeContext();
    const db = env?.DB as D1Database | undefined;
    if (!db) return [];

    const { results } = await db.prepare(
      "SELECT * FROM games WHERE slug != ? AND (category = ? OR is_featured = 1) LIMIT ?"
    )
    .bind(currentSlug, category, limit)
    .all();

    return await attachRatings(db, results) as Game[];
  } catch (error) {
    return [];
  }
}

/**
 * Search games
 */
export async function searchGames(query: string, limit: number = 50) {
  try {
    const env = await getSafeContext();
    const db = env?.DB as D1Database | undefined;
    if (!db) return [];

    const { results } = await db.prepare(
      `SELECT * FROM games 
       WHERE title LIKE ? OR description LIKE ? 
       ORDER BY is_featured DESC, created_at DESC 
       LIMIT ?`
    )
    .bind(`%${query}%`, `%${query}%`, limit)
    .all();

    return await attachRatings(db, results) as Game[];
  } catch (error) {
    return [];
  }
}

/**
 * Get games by category
 */
export async function getGamesByCategory(category: string, page: number = 1, limit: number = 20) {
  const getStaticFallback = (total = 0) => {
    const filtered = (gamesData as any[])
      .filter(g => g.category?.toLowerCase() === category.toLowerCase());
    const sliced = filtered.slice((page - 1) * limit, page * limit)
      .map(g => ({ ...g, rating: 0, votes: 0 })) as Game[];
    return { games: sliced, totalCount: total || filtered.length };
  };

  try {
    const env = await getSafeContext();
    const db = env?.DB as D1Database | undefined;
    if (!db) return getStaticFallback();

    const offset = (page - 1) * limit;

    // 1. Get total count
    const countResult = await db.prepare(
      "SELECT COUNT(*) as count FROM games WHERE LOWER(category) = LOWER(?)"
    )
    .bind(category)
    .first();
    
    const totalCount = (countResult?.count as number) || 0;

    // 2. Get paginated results
    const { results } = await db.prepare(
      "SELECT * FROM games WHERE LOWER(category) = LOWER(?) ORDER BY created_at DESC LIMIT ? OFFSET ?"
    )
    .bind(category, limit, offset)
    .all();

    if (!results || results.length === 0) return getStaticFallback(totalCount);

    const games = await attachRatings(db, results) as Game[];
    return { games, totalCount };
  } catch (error) {
    return getStaticFallback();
  }
}

/**
 * Get comments for a page
 */
export async function getComments(slug: string) {
  try {
    const env = await getSafeContext();
    const db = env?.DB as D1Database | undefined;
    if (!db) return [];

    const { results } = await db.prepare(
      "SELECT * FROM comments WHERE page_id = ? ORDER BY created_at DESC"
    )
    .bind(slug)
    .all();

    return results;
  } catch (error) {
    return [];
  }
}
