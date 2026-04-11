import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { env } = await getCloudflareContext({ async: true });
    
    // 返回脱敏后的环境信息进行诊断
    const db = env.DB as any;
    let tables: string[] = [];
    let dbError = null;

    if (db) {
      try {
        const { results } = await db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
        tables = results.map((r: any) => r.name);
      } catch (err: any) {
        dbError = err.message;
      }
    }

    return NextResponse.json({
      status: "success",
      runtime: "edge",
      bindings: Object.keys(env || {}),
      db_exists: !!db,
      tables,
      db_error: dbError,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json({
      status: "error",
      message: error.message,
      stack: error.stack,
    }, { status: 500 });
  }
}
