import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const context = await getCloudflareContext({ async: true });
    
    // Safely extract keys for debugging without exposing secrets
    const envKeys = context?.env ? Object.keys(context.env) : [];
    const cfProperties = context?.cf ? Object.keys(context.cf) : [];
    
    return NextResponse.json({
      status: "success",
      message: "Cloudflare context retrieved",
      diagnostics: {
        hasEnv: !!context?.env,
        envKeys: envKeys,
        hasCf: !!context?.cf,
        cfKeys: cfProperties,
        runtime: (globalThis as any).EdgeRuntime ? "Edge" : "Node/Worker",
        hasD1: !!context?.env?.DB
      }
    });
  } catch (error: any) {
    return NextResponse.json({
      status: "error",
      message: "Failed to retrieve Cloudflare context",
      error: error?.message || String(error),
      stack: error?.stack
    }, { status: 500 });
  }
}
