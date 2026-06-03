// Cloudflare Worker — Stooq CORS proxy
// Deploy steps:
//   1. https://dash.cloudflare.com  →  Workers & Pages  →  Create  →  "Hello World"
//   2. Replace the generated code with this file's contents and click Deploy
//   3. Copy the URL it gives you (e.g. https://stooq-proxy.YOURNAME.workers.dev)
//   4. In your app, open DevTools console and run:
//        localStorage.setItem("ss.proxyBase", "https://stooq-proxy.YOURNAME.workers.dev")
//      then reload. (Or hard-code it in app.js — see STOOQ_PROXY_BASE.)
//
// Usage:  GET https://<your-worker>/?s=aapl.us&i=d
//         The query string is forwarded verbatim to stooq.com/q/d/l/.

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders() });
    }
    if (request.method !== "GET") {
      return new Response("Method Not Allowed", { status: 405, headers: corsHeaders() });
    }

    const target = "https://stooq.com/q/d/l/" + url.search;
    try {
      const upstream = await fetch(target, {
        // Stooq sometimes 403s requests without a UA.
        headers: { "User-Agent": "Mozilla/5.0 (StooqProxy)" },
        cf: { cacheTtl: 300, cacheEverything: true },
      });
      const body = await upstream.text();
      return new Response(body, {
        status: upstream.status,
        headers: {
          ...corsHeaders(),
          "Content-Type": "text/csv; charset=utf-8",
          "Cache-Control": "public, max-age=300",
        },
      });
    } catch (e) {
      return new Response("Upstream error: " + e.message, {
        status: 502,
        headers: corsHeaders(),
      });
    }
  },
};

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "*",
  };
}
