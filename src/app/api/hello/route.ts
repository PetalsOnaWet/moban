import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// 这个路由不引用任何外部库，用于测试 Next.js 16 基础包能否在 Cloudflare 启动
export async function GET() {
  return new Response("Hello from Next.js 16 Base Response!", {
    status: 200,
    headers: { "Content-Type": "text/plain" }
  });
}
