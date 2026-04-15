"use server";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { revalidatePath } from "next/cache";

/**
 * 评论提交 Server Action (v2)
 */
export async function submitComment(formData: FormData) {
  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) {
      return { error: "数据库模块未就绪" };
    }
    const db = env.DB as D1Database;

    const slug = formData.get("slug") as string;
    const userName = formData.get("userName") as string;
    const email = formData.get("email") as string;
    const content = formData.get("content") as string;
    const parentId = formData.get("parentId") ? parseInt(formData.get("parentId") as string, 10) : null;

    if (!userName || !content || !email) {
      return { error: "必填字段不能为空" };
    }

    // 1. 垃圾评论过滤 (禁止链接)
    const urlPattern = /(https?:\/\/[^\s]+)|(www\.[^\s]+)/gi;
    if (urlPattern.test(content)) {
      return { error: "Links are not allowed in comments (Anti-Spam)" };
    }

    // 2. 插入数据库
    await db.prepare(
      "INSERT INTO comments (slug, parent_id, user_name, user_email, content) VALUES (?, ?, ?, ?, ?)"
    )
      .bind(slug, parentId, userName, email, content)
      .run();

    revalidatePath(`/game/${slug}`);
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("D1 Error (submitComment):", error);
    const msg = error instanceof Error ? error.message : String(error);
    return { error: `评论提交失败: ${msg}` };
  }
}

/**
 * 评论点赞/点踩 Action
 */
export async function voteComment(commentId: number, type: 'like' | 'dislike') {
  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return { error: "DB not available" };
    const db = env.DB as D1Database;

    const column = type === 'like' ? 'likes' : 'dislikes';

    await db.prepare(`UPDATE comments SET ${column} = ${column} + 1 WHERE id = ?`)
      .bind(commentId)
      .run();

    return { success: true };
  } catch (error) {
    console.error("D1 Error (voteComment):", error);
    const msg = error instanceof Error ? error.message : String(error);
    return { error: `投票失败: ${msg}` };
  }
}

/**
 * 获取页面评分统计 (聚合表)
 */
export async function getPageStats(slug: string) {
  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return { rating: 0, votes: 0 };
    const db = env.DB as D1Database;

    const result = await db.prepare(
      "SELECT total_rating, vote_count FROM game_stats WHERE slug = ?"
    )
      .bind(slug)
      .first();

    if (!result) return { rating: 0, votes: 0 };

    const votes = result.vote_count as number;
    const total = result.total_rating as number;
    return {
      rating: votes > 0 ? Math.round((total / votes) * 10) / 10 : 0,
      votes: votes
    };
  } catch (error) {
    console.error("D1 Error (getPageStats):", error);
    return { rating: 0, votes: 0 };
  }
}

/**
 * 提交评分 (使用 game_stats 聚合表)
 */
export async function submitRating(slug: string, rating: number) {
  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return { error: "数据库模块未就绪" };
    const db = env.DB as D1Database;

    await db.prepare(`
      INSERT INTO game_stats (slug, total_rating, vote_count, updated_at)
      VALUES (?, ?, 1, CURRENT_TIMESTAMP)
      ON CONFLICT(slug) DO UPDATE SET
        total_rating = total_rating + EXCLUDED.total_rating,
        vote_count = vote_count + 1,
        updated_at = CURRENT_TIMESTAMP
    `)
      .bind(slug, rating)
      .run();

    revalidatePath("/");
    revalidatePath(`/game/${slug}`);
    return { success: true };
  } catch (error) {
    console.error("D1 Error (submitRating):", error);
    const msg = error instanceof Error ? error.message : String(error);
    return { error: `评分失败: ${msg}` };
  }
}

/**
 * 获取页面所有评论 (支持分页与多种排序)
 */
export async function getComments(slug: string, limit: number = 10, offset: number = 0, sort: string = 'newest') {
  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return [];
    const db = env.DB as D1Database;

    let orderBy = 'created_at DESC';
    if (sort === 'oldest') orderBy = 'created_at ASC';
    if (sort === 'popular') orderBy = 'likes DESC';

    const { results } = await db.prepare(`
      SELECT id, slug, parent_id, user_name, content, likes, dislikes, created_at 
      FROM comments 
      WHERE slug = ? 
      ORDER BY ${orderBy} 
      LIMIT ? OFFSET ?
    `)
      .bind(slug, limit, offset)
      .all();

    return results as any[];
  } catch (error) {
    console.error("D1 Error (getComments):", error);
    return [];
  }
}
