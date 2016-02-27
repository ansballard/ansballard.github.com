import pkg from "../../package.json";

const version = `v${pkg.version}::`;

self.addEventListener("install", event => {
	event.waitUntil(
		caches
		.open(`${version}ansballard`)
		.then(cache => cache.addAll([
				"/",
				"/dist/uncss.css",
				"/dist/bundle.js"
			])
		)
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
        let networked = fetch(event.request)
          .then(fetchedFromNetwork, unableToResolve)
          .catch(unableToResolve);
        return cached || networked;

        function fetchedFromNetwork(response) {
          let cacheCopy = response.clone();

          caches
            .open(`${version}pages`)
            .then(function add(cache) {
              cache.put(event.request, cacheCopy);
            });

          return response;
        }

        function unableToResolve () {

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
