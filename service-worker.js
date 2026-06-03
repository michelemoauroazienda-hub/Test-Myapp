// Stock Signals service worker - cache shell for offline use.
const CACHE = "stocksignals-v4";
const SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",
  "./icons/icon.svg"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  // Only intercept same-origin GETs (the app shell). All cross-origin
  // requests (market data, CORS proxies, CDNs, etc.) bypass the SW entirely
  // so we don't turn transient network errors into opaque "Failed to fetch".
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;

  // Cache-first for app shell.
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});
