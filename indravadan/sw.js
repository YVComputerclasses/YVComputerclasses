const CACHE_NAME = "ganesh-utsav-v1";
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./admin.html",
  "./events.html",
  "./committee.html",
  "./gallery.html",
  "./manifest.json"
];

// Service Worker Install
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Fetching assets from cache
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});