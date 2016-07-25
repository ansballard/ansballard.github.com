# My Github Page

This is partially a personal site, and partially an exercise in creating a minimal single-page website. All the routing is done via frontend javascript, using [page.js](https://github.com/visionmedia/page.js) to load html snippets. The CSS is originally from a GitHub Pages theme which used bootstrap. Using [uncss](https://github.com/giakki/uncss), all styles not in any templates or html partials is excluded from the production assets. This, along with minification of all js, css, and html, means the site should pull down less than 20kb, barring large blog posts.

Since that's smaller than the banner image on most sites, that should be enough. But using service workers, once a user hits the site, assets will no longer be requested from the server, and can be served from the client's cache directly. So load time after the initial visit should be instantaneous, until the site is updated and the service worker fetches the new set of assets.
