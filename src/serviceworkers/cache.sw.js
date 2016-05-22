import { version as vers } from "../../package.json";

const version = `v${vers}::`;

self.addEventListener("install", event => {
	event.waitUntil(
		caches
		.open(`${version}ansballard`)
		.then(cache => cache.addAll([
			"/dist/partials/404.template.html",
			"/dist/partials/index.template.html",
			"/dist/bundle.css",
			"/dist/bundle.js"
		]))
	);
});

self.addEventListener("fetch", event => {
	if (event.request.method !== "GET") {
		return;
	}
	event.respondWith(
		caches
		.match(event.request)
		.then(cached => {
			return cached || fetch(event.request)
				.then(fetchedFromNetwork, unableToResolve)
				.catch(unableToResolve);

			function fetchedFromNetwork(response) {
				const cacheCopy = response.clone();
				caches
				.open(`${version}pages`)
				.then(cache => {
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
		})
	);
});

self.addEventListener("activate", event => {
	event.waitUntil(
		caches
		.keys()
		.then(keys =>
			Promise.all(
				keys
				.filter(key => !key.startsWith(version))
				.map(key => caches.delete(key))
			)
		)
	);
});
