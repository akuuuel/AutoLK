/* ==========================================================================
   AutoLK Generator — Service Worker (PWA)
   Strategi: Network First + Cache Fallback
   ========================================================================== */

const CACHE_NAME = 'autolk-v11';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/css/style.css?v=11',
  '/js/app.js?v=11',
  '/html2canvas.min.js',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// ── INSTALL: simpan aset baru & terapkan langsung ──────────────────────────
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[AutoLK SW] Caching fresh app shell...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// ── ACTIVATE: bersihkan SEMUA cache lama & klaim klien langsung ────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          console.log('[AutoLK SW] Clearing old cache key:', key);
          return caches.delete(key);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// ── FETCH: Network First (selalu ambil file terbaru jika online) ───────────
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
