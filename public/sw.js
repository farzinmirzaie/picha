/*
 * Service worker for offline support + installability.
 * Scope is /picha/ (served from that path on GitHub Pages).
 * Bump CACHE when the precache list or site structure changes.
 */
const CACHE = 'picha-v11';
const BASE = '/picha/';
const PRECACHE = [
  BASE,
  `${BASE}health/`,
  `${BASE}care/`,
  `${BASE}tools/`,
  `${BASE}tools/staff/`,
  `${BASE}weight/`,
  `${BASE}cat-years/`,
  `${BASE}training/`,
  `${BASE}manifest.webmanifest`,
  `${BASE}icon-192.png`,
  `${BASE}icon-512.png`,
  `${BASE}icon-maskable-512.png`,
  `${BASE}apple-touch-icon.png`,
  `${BASE}favicon.svg`,
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  // Only our own origin is cached; cross-origin (e.g. the Supabase API) always
  // goes straight to the network, so live data is never served stale.
  if (url.origin !== self.location.origin) return;

  const isAsset =
    url.pathname.includes('/_astro/') ||
    /\.(js|mjs|css|png|jpe?g|webp|svg|ico|woff2?|webmanifest)$/.test(url.pathname);

  // Cache-first for assets: they're content-hashed (or rarely change), so the
  // cached copy is always correct and instant.
  if (isAsset) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((res) => {
            if (res.ok) {
              const copy = res.clone();
              event.waitUntil(caches.open(CACHE).then((c) => c.put(request, copy)));
            }
            return res;
          }),
      ),
    );
    return;
  }

  // Pages/HTML — full navigations AND in-app ClientRouter fetches (which are
  // NOT `mode: 'navigate'`, so they'd otherwise hit the cache-first path and go
  // stale). Stale-while-revalidate: serve the cached shell instantly, then
  // refresh the cache in the background so the next view is current. The live
  // data itself is re-fetched by each page's client script, so what's on screen
  // stays fresh without a manual reload.
  event.respondWith(
    caches.open(CACHE).then((cache) =>
      cache.match(request).then((cached) => {
        const fresh = fetch(request)
          .then((res) => {
            if (res.ok) cache.put(request, res.clone());
            return res;
          })
          .catch(() => cached || cache.match(BASE));
        event.waitUntil(fresh.catch(() => {}));
        return cached || fresh;
      }),
    ),
  );
});
