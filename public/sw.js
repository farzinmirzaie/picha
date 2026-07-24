/*
 * Service worker for offline support + installability.
 * Scope is /picha/ (served from that path on GitHub Pages).
 * Bump CACHE when the precache list or site structure changes.
 */
const CACHE = 'picha-v16';
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
  `${BASE}notification-icon.png`,
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

// ---- Web Push: background reminders (fire even when the app is closed) ----
// The payload is generic JSON: { title, body, url, tag }. This handler renders
// whatever it's given, so new reminder types are added in the sender
// (scripts/notify), never here.
self.addEventListener('push', (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch {
    data = { body: event.data ? event.data.text() : '' };
  }
  const title = data.title || 'Picha';
  // Large icon = Picha's face (a distinct avatar); small `badge` = the paw.
  // They must differ, or Android/MIUI shows the same image twice. (Android
  // always fills the large-icon slot for web push; left empty it invents a
  // letter-monogram from the device account.)
  const options = {
    body: data.body || '',
    icon: data.icon || `${BASE}notification-icon.png`,
    badge: data.badge || `${BASE}icon-192.png`,
    tag: data.tag || 'picha',
    renotify: true,
    data: { url: data.url || BASE },
  };
  const tasks = [self.registration.showNotification(title, options)];
  // Optionally light the app-icon badge (a dot) — e.g. "Due soon". It clears
  // itself next time the app is opened (Layout's applyDueSoon re-decides).
  if (data.setBadge && self.navigator && 'setAppBadge' in self.navigator) {
    tasks.push(self.navigator.setAppBadge().catch(() => {}));
  }
  event.waitUntil(Promise.all(tasks));
});

// Tap a notification: focus an open app window (navigating it to the target)
// or open a fresh one.
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const target = new URL(
    (event.notification.data && event.notification.data.url) || BASE,
    self.location.origin,
  ).href;
  event.waitUntil(
    (async () => {
      const wins = await self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true,
      });
      for (const w of wins) {
        if (w.url.startsWith(self.location.origin + BASE)) {
          await w.focus();
          if ('navigate' in w && w.url !== target) await w.navigate(target).catch(() => {});
          return;
        }
      }
      await self.clients.openWindow(target);
    })(),
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
