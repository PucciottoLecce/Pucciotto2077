const CACHE = 'pucciotto-heist-v2';
const FILES = ['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png',
  './assets/Variant__Female_cyber_ninja.png','./assets/Variant__Male_augmented_bounty_hunter.png',
  './assets/Variant__Masked_street_hacker.png',
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
