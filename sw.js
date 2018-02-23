'use strict';

var version = "0.16.0";

var version$1 = "v" + version + "::";

self.addEventListener("install", function (event) {
	event.waitUntil(caches.open(version$1 + "ansballard").then(function (cache) {
		return cache.addAll(["/dist/partials/404.template.html", "/dist/partials/index.template.html", "/dist/bundle.css", "/dist/bundle.js"]);
	}));
});

self.addEventListener("fetch", function (event) {
	if (event.request.method !== "GET") {
		return;
	}
	event.respondWith(caches.match(event.request).then(function (cached) {
		return cached || fetch(event.request).then(fetchedFromNetwork, unableToResolve).catch(unableToResolve);

		function fetchedFromNetwork(response) {
			var cacheCopy = response.clone();
			caches.open(version$1 + "pages").then(function (cache) {
				cache.put(event.request, cacheCopy);
			});
			return response;
		}

		function unableToResolve() {
			return new Response("<h1>Service Unavailable</h1>", {
				status: 503,
				statusText: "Service Unavailable",
				headers: new Headers({
					"Content-Type": "text/html"
				})
			});
		}
	}));
});

self.addEventListener("activate", function (event) {
	event.waitUntil(caches.keys().then(function (keys) {
		return Promise.all(keys.filter(function (key) {
			return !key.startsWith(version$1);
		}).map(function (key) {
			return caches.delete(key);
		}));
	}));
});
