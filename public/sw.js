var K = "invite-v2";
self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(K).then(function (c) { return c.addAll(["./"]); }));
  self.skipWaiting();
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (k) {
    return Promise.all(k.filter(function (x) { return x !== K; }).map(function (x) { return caches.delete(x); }));
  }));
});
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request).then(function (r) {
    var n = fetch(e.request).then(function (x) {
      if (x.ok || x.type === "opaque") {
        var y = x.clone();
        caches.open(K).then(function (c) { c.put(e.request, y); });
      }
      return x;
    }).catch(function () { return r || Response.error(); });
    return r || n;
  }));
});
