// sw.js - Service Worker a PWA működéséhez
const CACHE_NAME = 'pwa-cache-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json'
];

// Telepítés és fájlok elmentése
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Aktiválás
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Kérések kezelése
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
