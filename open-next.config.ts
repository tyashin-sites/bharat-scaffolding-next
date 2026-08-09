import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";

// Persist Next's ISR / fetch cache across Worker invocations in KV.
// Binding name MUST be NEXT_INC_CACHE_KV — OpenNext hardcodes it.
export default defineCloudflareConfig({
  incrementalCache: kvIncrementalCache,
});
