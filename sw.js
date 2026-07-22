const CACHE = 'tafeito-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/tokens.css',
  '/css/app.css',
  '/js/config.js',
  '/js/storage.js',
  '/js/router.js',
  '/js/app.js',
  '/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
      if (res.ok && e.request.method === 'GET') {
        const clone = res.clone();
        caches.open('tafeito-v2').then(cache => cache.put(e.request, clone));
      }
      return res;
    }))
  );
});
