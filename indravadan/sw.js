// જૂનું: const CACHE_NAME = "ganesh-utsav-v1";
// નવું:
const CACHE_NAME = "ganesh-utsav-v2"; // વર્ઝન બદલવાથી નવો ડેટા ફેચ થશે

const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./admin.html",
  "./events.html",
  "./committee.html",
  "./gallery.html",
  "./manifest.json"
];

self.addEventListener("install", (e) => {
  self.skipWaiting(); // તરત જ નવો વર્ઝન એક્ટિવ કરવા
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener("activate", (e) => {
  // જૂની કેશ ડિલીટ કરશે
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});