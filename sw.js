// Service worker del sitio (PWA): guarda la cáscara y la página sin conexión. Rutas relativas
// porque el sitio vive en /PWDC/ (GitHub Pages).
const VERSION = "pwdc-v3";
const CASCARA = ["./", "index.html", "contacto.html", "offline.html", "estados.css", "offline.js", "CSS/styles.css?v=20261115c", "JS/sitio.js?v=20261115c", "JS/tema.js?v=20261115c", "JS/formulario.js?v=20261115c", "iconos/icono.svg", "iconos/icono-192.png", "manifest.webmanifest"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(CASCARA)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((n) => Promise.all(n.filter((x) => x !== VERSION).map((x) => caches.delete(x)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const { request } = e;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) return;
  // Primero la red (así se ven los cambios); la copia, sin conexión.
  e.respondWith(
    fetch(request)
      .then((r) => {
        if (r.ok) { const copia = r.clone(); caches.open(VERSION).then((c) => c.put(request, copia)); }
        return r;
      })
      .catch(() => caches.match(request).then((r) => r || (request.mode === "navigate" ? caches.match("offline.html") : undefined))),
  );
});
