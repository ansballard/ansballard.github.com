"use strict";var version$1="0.2.9",version="v"+version$1+"::";self.addEventListener("install",function(e){e.waitUntil(caches.open(version+"ansballard").then(function(e){return e.addAll(["/dist/partials/404.template.html","/dist/partials/index.template.html","/dist/bundle.css","/dist/bundle.js"])}))}),self.addEventListener("fetch",function(e){"GET"===e.request.method&&e.respondWith(caches.match(e.request).then(function(t){function n(t){var n=t.clone();return caches.open(version+"pages").then(function(t){t.put(e.request,n)}),t}function s(){return new Response("<h1>Service Unavailable</h1>",{status:503,statusText:"Service Unavailable",headers:new Headers({"Content-Type":"text/html"})})}return t||fetch(e.request).then(n,s)["catch"](s)}))}),self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(e){return Promise.all(e.filter(function(e){return!e.startsWith(version)}).map(function(e){return caches["delete"](e)}))}))});