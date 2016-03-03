(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
  "name": "ansballard-ghpages",
  "version": "0.0.7",
  "description": "Github profile page for Aaron Ballard",
  "main": "index.html",
  "scripts": {
    "start": "python -m SimpleHTTPServer",
    "spec": "node ./scripts/specs.js",
    "build:md": "node ./scripts/build.js",
    "watch:md": "watch \"npm run build\" ./src/md/",
    "build:js": "browserify ./src/js/ghpages.module.js -t [babelify] -t [partialify] -o ./dist/bundle.js",
    "watch:js": "watchify ./src/js/ghpages.module.js -t [babelify] -t [partialify] -o ./dist/bundle.js",
    "deploy:js": "browserify ./src/js/ghpages.module.js -t [babelify] -t [partialify] | uglifyjs --screw-ie8 > ./dist/bundle.js",
    "build:sw": "browserify ./src/serviceworkers/cache.sw.js -t [babelify] -o ./cache.sw.js",
    "watch:sw": "watchify ./src/serviceworkers/cache.sw.js -t [babelify] -o ./cache.sw.js",
    "deploy:sw": "browserify ./src/serviceworkers/cache.sw.js -t [babelify] | uglifyjs --screw-ie8 > ./cache.sw.js",
    "build:css": "postcss -u postcss-import -u postcss-cssnext ./src/css/entry.css > ./dist/bundle.css",
    "watch:css": "watch \"npm run build:css\" ./src/css",
    "predeploy:css": "trash ./dist/bundle.css",
    "deploy:css": "postcss -u postcss-import -u postcss-cssnext ./src/css/entry.css > ./dist/temp.css",
    "postdeploy:css": "uncss -s ./dist/temp.css ./index.html | cssnano > ./dist/bundle.css",
    "build": "concurrently \"npm run build:md\" \"npm run build:js\" \"npm run build:sw\" && npm run build:css",
    "watch": "concurrently \"npm run watch:md\" \"npm run watch:js\" \"npm run watch:sw\" \"npm run watch:css\"",
    "deploy": "concurrently \"npm run build:md\" \"npm run deploy:js\" \"npm run deploy:sw\" && npm run deploy:css",
    "postdeploy": "npm run spec",
    "prepublish": "npm run deploy"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/ansballard/ansballard.github.com.git"
  },
  "author": "Aaron Ballard",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/ansballard/ansballard.github.com/issues"
  },
  "homepage": "https://github.com/ansballard/ansballard.github.com#readme",
  "devDependencies": {
    "babel-cli": "^6.5.1",
    "babel-preset-es2015": "^6.5.0",
    "babelify": "^7.2.0",
    "bluebird": "^3.3.1",
    "browserify": "^13.0.0",
    "concurrently": "^2.0.0",
    "cssnano": "^3.5.2",
    "cssnano-cli": "^1.0.3",
    "glob": "^7.0.0",
    "html-minifier": "^1.2.0",
    "marked": "^0.3.5",
    "mkdirp": "^0.5.1",
    "partialify": "^3.1.6",
    "postcss": "^5.0.17",
    "postcss-cli": "^2.5.1",
    "postcss-cssnext": "^2.4.0",
    "postcss-import": "^8.0.2",
    "trash-cli": "^1.2.1",
    "uglify-js": "^2.6.2",
    "uncss": "^0.13.0",
    "watch": "^0.17.1"
  },
  "dependencies": {
    "angular": "^1.5.0",
    "angular-route": "^1.5.0"
  }
}

},{}],2:[function(require,module,exports){
"use strict";

var _package = require("../../package.json");

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var version = "v" + _package2.default.version + "::";

self.addEventListener("install", function (event) {
	event.waitUntil(caches.open(version + "ansballard").then(function (cache) {
		return cache.addAll(["/", "/dist/uncss.css", "/dist/bundle.js"]);
	}));
});

self.addEventListener("fetch", function (event) {
	if (event.request.method !== "GET") {
		return;
	}
	event.respondWith(caches.match(event.request).then(function (cached) {
		var networked = fetch(event.request).then(fetchedFromNetwork, unableToResolve).catch(unableToResolve);
		return cached || networked;

		function fetchedFromNetwork(response) {
			var cacheCopy = response.clone();
			caches.open(version + "pages").then(function add(cache) {
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
			return !key.startsWith(version);
		}).map(function (key) {
			return caches.delete(key);
		}));
	}));
});

},{"../../package.json":1}]},{},[2]);
