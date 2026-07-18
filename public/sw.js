/*
 * Minimal service worker for offline support + installability.
 * Scope is /picha/ (served from that path on GitHub Pages).
 * Bump CACHE when the precache list changes to evict the old cache.
 */
const CACHE = 'picha-v1';
const BASE = '/picha/';
const PRECACHE = [
  BASE,
  `${BASE}manifest.webmanifest`,
  `${BASE}icon-192.png`,
  `${BASE}icon-512.png`,
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

  // Network-first for page navigations (fresh content when online, cached shell offline).
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(BASE, copy));
          return res;
        })
        .catch(() => caches.match(BASE)),
    );
    return;
  }

  // Cache-first for same-origin assets (hashed CSS/JS, icons).
  event.respondWith(
    caches.match(request).then(
      (cached) =>
        cached ||
        fetch(request).then((res) => {
          if (res.ok && new URL(request.url).origin === self.location.origin) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(request, copy));
          }
          return res;
        }),
    ),
  );
});
