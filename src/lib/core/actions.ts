"use server";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { revalidatePath } from "next/cache";

/**
 * 评论提交 Server Action
 */
export async function submitComment(formData: FormData) {
  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) {
      return { error: "数据库模块未就绪" };
    }
    const db = env.DB as D1Database;

    const pageId = formData.get("pageId") as string;
    const userName = formData.get("userName") as string;
    const content = formData.get("content") as string;

    if (!userName || !content) {
      return { error: "用户名或内容不能为空" };
    }

    await db.prepare(
      "INSERT INTO comments (page_id, user_name, content) VALUES (?, ?, ?)"
    )
    .bind(pageId, userName, content)
    .run();

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("D1 Error (submitComment):", error);
    return { error: "评论提交失败" };
  }
}

/**
 * 获取页面评分统计
 */
export async function getPageStats(pageId: string) {
  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) {
      return { avgRating: null, total: 0 };
    }
    const db = env.DB as D1Database;

    const result = await db.prepare(
      "SELECT AVG(rating) as avgRating, COUNT(*) as total FROM ratings WHERE page_id = ?"
    )
    .bind(pageId)
    .first();

    return result as { avgRating: number | null; total: number };
  } catch (error) {
    console.error("D1 Error (getPageStats):", error);
    return { avgRating: null, total: 0 };
  }
}

/**
 * 提交评分
 */
export async function submitRating(pageId: string, rating: number) {
  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) {
      return { error: "数据库模块未就绪" };
    }
    const db = env.DB as D1Database;

    await db.prepare(
      "INSERT INTO ratings (page_id, rating) VALUES (?, ?)"
    )
    .bind(pageId, rating)
    .run();

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("D1 Error (submitRating):", error);
    return { error: "评分失败" };
  }
}

/**
 * 获取页面所有评论
 */
export async function getComments(pageId: string) {
  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) {
      return [];
    }
    const db = env.DB as D1Database;

    const { results } = await db.prepare(
      "SELECT * FROM comments WHERE page_id = ? ORDER BY created_at DESC"
    )
    .bind(pageId)
    .all();

    return results as { id: number; page_id: string; user_name: string; content: string; created_at: string }[];
  } catch (error) {
    console.error("D1 Error (getComments):", error);
    return [];
  }
}
