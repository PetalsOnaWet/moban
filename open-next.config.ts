import type { OpenNextConfig } from "@opennextjs/cloudflare";

/**
 * Simplified OpenNext configuration for Cloudflare Pages.
 * Disabling validation to allow a minimal config that boots reliably.
 */
const config: OpenNextConfig = {
  default: {
    override: {
      wrapper: "cloudflare-node",
      converter: "edge",
      proxyExternalRequest: "fetch",
      incrementalCache: "dummy",
      tagCache: "dummy",
      queue: "dummy",
    },
  },
  // Removing middleware block for maximum stability in Next.js 15
  dangerousDisableConfigValidation: true,
  edgeExternals: ["node:crypto"],
};

export default config;
