"use server";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { revalidatePath } from "next/cache";

/**
 * 评论提交 Server Action
 */
export async function submitComment(formData: FormData) {
  const { env } = getCloudflareContext();
  const db = env.DB as D1Database;

  const pageId = formData.get("pageId") as string;
  const userName = formData.get("userName") as string;
  const content = formData.get("content") as string;

  if (!userName || !content) {
    return { error: "用户名或内容不能为空" };
  }

  try {
    await db.prepare(
      "INSERT INTO comments (page_id, user_name, content) VALUES (?, ?, ?)"
    )
    .bind(pageId, userName, content)
    .run();

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("D1 Error:", error);
    return { error: "评论提交失败，请检查数据库绑定" };
  }
}

/**
 * 获取页面评分统计
 */
export async function getPageStats(pageId: string) {
  const { env } = getCloudflareContext();
  const db = env.DB as D1Database;

  const result = await db.prepare(
    "SELECT AVG(rating) as avgRating, COUNT(*) as total FROM ratings WHERE page_id = ?"
  )
  .bind(pageId)
  .first();

  return result as { avgRating: number | null; total: number };
}

/**
 * 提交评分
 */
export async function submitRating(pageId: string, rating: number) {
  const { env } = getCloudflareContext();
  const db = env.DB as D1Database;

  try {
    await db.prepare(
      "INSERT INTO ratings (page_id, rating) VALUES (?, ?)"
    )
    .bind(pageId, rating)
    .run();

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { error: "评分失败" };
  }
}
