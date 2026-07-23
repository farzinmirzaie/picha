/*
 * Service worker for offline support + installability.
 * Scope is /picha/ (served from that path on GitHub Pages).
 * Bump CACHE when the precache list or site structure changes.
 */
const CACHE = 'picha-v10';
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

  // Network-first for page navigations; each page falls back to its own cached
  // copy, then to the home shell.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(request, copy));
          return res;
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match(BASE)),
        ),
    );
    return;
  }

  // Cache-first for same-origin assets (hashed CSS/JS/images/fonts).
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
