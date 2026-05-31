// Stock Signals service worker - cache shell for offline use.
const CACHE = "stocksignals-v3";
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
  const url = new URL(e.request.url);

  // Never cache market data: always go to network.
  if (url.hostname.includes("stooq.com")) return;

  // Cache-first for app shell.
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});
