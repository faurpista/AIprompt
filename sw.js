// Írd át a verziószámot (pl. v2, v3), ha módosítasz a kódodon!
const CACHE_NAME = 'prompt-akademia-v16';

// Telepítéskor az új fájlokat gyorsítótárazzuk
self.addEventListener('install', (event) => {
    self.skipWaiting(); // Azonnal átveszi az irányítást, nem vár a lap bezárására
});

// Aktiváláskor TÖRÖLJÜK A RÉGI CACHE-T!
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Régi Service Worker Cache törlése:', cache);
                        return caches.delete(cache); // Törli a beragadt régi JS fájlokat!
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Hálózati kérések kezelése (Network First stratégia, hogy mindig a legújabb kódot töltse le)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
