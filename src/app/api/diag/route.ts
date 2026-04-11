import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { env } = await getCloudflareContext({ async: true });
    
    // 返回脱敏后的环境信息进行诊断
    return NextResponse.json({
      status: "success",
      runtime: "edge",
      bindings: Object.keys(env || {}),
      db_exists: !!env?.DB,
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
