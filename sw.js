/* SISR-MMTE : service worker.
   - Les bibliothèques (dossier vendor) et les icônes sont gardées sur l'appareil : l'application s'ouvre plus vite.
   - L'application elle-même (index.html, config.js…) est toujours relue en ligne d'abord : une mise à jour publiée sur GitHub arrive sans manipulation.
   - Les données (Supabase) ne passent JAMAIS par le cache : rien de confidentiel n'est stocké par ce fichier. */
const V = "sisr-v1";
const FIXES = ["vendor/supabase.js", "vendor/xlsx.full.min.js", "vendor/jspdf.umd.min.js", "vendor/jspdf.plugin.autotable.min.js", "icon-192.png", "icon-512.png"];

self.addEventListener("install", e => e.waitUntil(caches.open(V).then(c => c.addAll(FIXES)).then(() => self.skipWaiting())));
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== V).map(x => caches.delete(x)))).then(() => self.clients.claim())));
self.addEventListener("fetch", e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== "GET" || u.origin !== location.origin) return;                       // données Supabase et autres sites : jamais interceptés
  const garde = x => { if (x && x.ok) { const c = x.clone(); caches.open(V).then(ch => ch.put(r, c)); } return x; };
  if (FIXES.some(f => u.pathname.endsWith("/" + f))) { e.respondWith(caches.match(r).then(m => m || fetch(r).then(garde))); return; }   // bibliothèques : cache d'abord
  e.respondWith(fetch(r).then(garde).catch(() => caches.match(r).then(m => m || caches.match(new URL("index.html", self.registration.scope).href))));   // reste : en ligne d'abord
});
