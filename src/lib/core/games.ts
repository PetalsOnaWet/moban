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
  created_at: string;
}

/**
 * 获取所有游戏（按创建时间排序）
 */
export async function getGames(limit: number = 24) {
  console.log("[PROBE_DB] Fetching games...");
  
  // Fallback function for consistent data structure
  const getStaticFallback = () => {
    return (gamesData as any[]).slice(0, limit).map((game, index) => ({
      ...game,
      id: game.id || (index + 1), // Provide synthetic ID if missing
      created_at: game.created_at || new Date().toISOString()
    })) as Game[];
  };

  try {
    const { env } = await getCloudflareContext({ async: true });
    
    // Check if env is actually available (Edge vs Node runtime difference)
    if (!env || typeof env !== 'object') {
      console.warn("[PROBE_DB] Cloudflare env not found, using static fallback.");
      return getStaticFallback();
    }

    const db = env.DB as D1Database | undefined;

    if (!db) {
      console.warn("[PROBE_DB] D1 Binding 'DB' missing, using static fallback.");
      return getStaticFallback();
    }

    const { results } = await db.prepare(
      "SELECT * FROM games ORDER BY created_at DESC LIMIT ?"
    )
    .bind(limit)
    .all();

    if (!results || results.length === 0) {
      console.log("[PROBE_DB] D1 returned empty, using static fallback.");
      return getStaticFallback();
    }

    return results as unknown as Game[];
  } catch (error) {
    console.error("[PROBE_DB] Critical error during D1 fetch:", error);
    return getStaticFallback();
  }
}

/**
 * 根据 Slug 获取单个游戏
 */
export async function getGameBySlug(slug: string) {
  const getStaticFallback = () => {
    const game = (gamesData as any[]).find(g => g.slug === slug);
    if (!game) return null;
    return {
      ...game,
      id: game.id || 999,
      created_at: game.created_at || new Date().toISOString()
    } as Game;
  };

  try {
    const { env } = await getCloudflareContext({ async: true });
    const db = env?.DB as D1Database | undefined;

    if (!db) {
      return getStaticFallback();
    }

    const result = await db.prepare(
      "SELECT * FROM games WHERE slug = ?"
    )
    .bind(slug)
    .first();

    if (!result) {
      return getStaticFallback();
    }

    return result as unknown as Game | null;
  } catch (error) {
    console.error("[PROBE_DB] getGameBySlug failed:", error);
    return getStaticFallback();
  }
}

/**
 * 获取推荐游戏（同分类或 Featured）
 */
export async function getRelatedGames(currentSlug: string, category: string, limit: number = 6) {
  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) {
      console.error("D1 Binding 'DB' is missing in the current environment.");
      return [];
    }
    const db = env.DB as D1Database;

    const { results } = await db.prepare(
      "SELECT * FROM games WHERE slug != ? AND (category = ? OR is_featured = 1) LIMIT ?"
    )
    .bind(currentSlug, category, limit)
    .all();

    return results as unknown as Game[];
  } catch (error) {
    console.error("Failed to fetch related games from D1:", error);
    return [];
  }
}

/**
 * 获取特定分类下的游戏
 */
export async function getGamesByCategory(category: string, limit: number = 50) {
  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) {
      console.error("D1 Binding 'DB' is missing in the current environment.");
      return [];
    }
    const db = env.DB as D1Database;

    const { results } = await db.prepare(
      "SELECT * FROM games WHERE category = ? ORDER BY created_at DESC LIMIT ?"
    )
    .bind(category, limit)
    .all();

    return results as unknown as Game[];
  } catch (error) {
    console.error("Failed to fetch games by category from D1:", error);
    return [];
  }
}

/**
 * 获取带有特定标签的游戏
 */
export async function getGamesByTag(tag: string, limit: number = 50) {
  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) {
      console.error("D1 Binding 'DB' is missing in the current environment.");
      return [];
    }
    const db = env.DB as D1Database;

    const { results } = await db.prepare(
      "SELECT * FROM games WHERE tags LIKE ? ORDER BY created_at DESC LIMIT ?"
    )
    .bind(`%${tag}%`, limit)
    .all();

    return results as unknown as Game[];
  } catch (error) {
    console.error("Failed to fetch games by tag from D1:", error);
    return [];
  }
}

/**
 * 同步 JSON 数据到 D1 (用于初始化或更新)
 */
export async function syncGamesToDB() {
  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) {
      console.error("D1 Binding 'DB' is missing. Skipping sync.");
      return;
    }
    const db = env.DB as D1Database;

    for (const game of (gamesData as Game[])) {
      await db.prepare(
        `INSERT OR REPLACE INTO games (slug, title, description, thumbnail, iframe_url, category, tags, is_featured) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        game.slug, 
        game.title, 
        game.description, 
        game.thumbnail, 
        game.iframe_url, 
        game.category, 
        game.tags || null,
        game.is_featured ? 1 : 0
      )
      .run();
    }
  } catch (error) {
    console.error("Sync to D1 failed:", error);
  }
}

/**
 * 搜索游戏（按标题或描述模糊匹配）
 */
export async function searchGames(query: string, limit: number = 50) {
  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) {
      console.error("D1 Binding 'DB' is missing in the current environment.");
      return [];
    }
    const db = env.DB as D1Database;

    const { results } = await db.prepare(
      `SELECT * FROM games 
       WHERE title LIKE ? OR description LIKE ? 
       ORDER BY is_featured DESC, created_at DESC 
       LIMIT ?`
    )
    .bind(`%${query}%`, `%${query}%`, limit)
    .all();

    return results as unknown as Game[];
  } catch (error) {
    console.error("Search games in D1 failed:", error);
    return [];
  }
}
