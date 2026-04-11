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
export async function getGames(limit: number = 20) {
  const { env } = await getCloudflareContext({ async: true });
  if (!env.DB) {
    throw new Error("D1 Binding 'DB' is missing in the Cloudflare environment. Please check your Pages console bindings.");
  }
  const db = env.DB as D1Database;

  const { results } = await db.prepare(
    "SELECT * FROM games ORDER BY created_at DESC LIMIT ?"
  )
  .bind(limit)
  .all();

  return results as unknown as Game[];
}

/**
 * 根据 Slug 获取单个游戏
 */
export async function getGameBySlug(slug: string) {
  const { env } = await getCloudflareContext({ async: true });
  if (!env.DB) {
    throw new Error("D1 Binding 'DB' is missing in the Cloudflare environment.");
  }
  const db = env.DB as D1Database;

  const result = await db.prepare(
    "SELECT * FROM games WHERE slug = ?"
  )
  .bind(slug)
  .first();

  return result as unknown as Game | null;
}

/**
 * 获取推荐游戏（同分类或 Featured）
 */
export async function getRelatedGames(currentSlug: string, category: string, limit: number = 6) {
  const { env } = await getCloudflareContext({ async: true });
  if (!env.DB) {
    throw new Error("D1 Binding 'DB' is missing in the Cloudflare environment.");
  }
  const db = env.DB as D1Database;

  const { results } = await db.prepare(
    "SELECT * FROM games WHERE slug != ? AND (category = ? OR is_featured = 1) LIMIT ?"
  )
  .bind(currentSlug, category, limit)
  .all();

  return results as unknown as Game[];
}

/**
 * 获取特定分类下的游戏
 */
export async function getGamesByCategory(category: string, limit: number = 50) {
  const { env } = await getCloudflareContext({ async: true });
  const db = env.DB as D1Database;

  const { results } = await db.prepare(
    "SELECT * FROM games WHERE category = ? ORDER BY created_at DESC LIMIT ?"
  )
  .bind(category, limit)
  .all();

  return results as unknown as Game[];
}

/**
 * 获取带有特定标签的游戏
 */
export async function getGamesByTag(tag: string, limit: number = 50) {
  const { env } = await getCloudflareContext({ async: true });
  const db = env.DB as D1Database;

  const { results } = await db.prepare(
    "SELECT * FROM games WHERE tags LIKE ? ORDER BY created_at DESC LIMIT ?"
  )
  .bind(`%${tag}%`, limit)
  .all();

  return results as unknown as Game[];
}

/**
 * 同步 JSON 数据到 D1 (用于初始化或更新)
 */
export async function syncGamesToDB() {
  const { env } = await getCloudflareContext({ async: true });
  if (!env.DB) {
    throw new Error("D1 Binding 'DB' is missing in the Cloudflare environment. Page requires D1 connection.");
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
}

/**
 * 搜索游戏（按标题或描述模糊匹配）
 */
export async function searchGames(query: string, limit: number = 50) {
  const { env } = await getCloudflareContext({ async: true });
  if (!env.DB) {
    throw new Error("D1 Binding 'DB' is missing in the Cloudflare environment.");
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
}
