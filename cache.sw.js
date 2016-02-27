"use strict";var _package=require("../../package.json");var _package2=_interopRequireDefault(_package);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var version="v"+_package2.default.version+"::";self.addEventListener("install",function(event){event.waitUntil(caches.open(version+"ansballard").then(function(cache){return cache.addAll(["/","/dist/uncss.css","/dist/bundle.js"])}))});self.addEventListener("fetch",function(event){if(event.request.method!=="GET"){return}event.respondWith(caches.match(event.request).then(function(cached){var networked=fetch(event.request).then(fetchedFromNetwork,unableToResolve).catch(unableToResolve);return cached||networked;function fetchedFromNetwork(response){var cacheCopy=response.clone();caches.open(version+"pages").then(function add(cache){cache.put(event.request,cacheCopy)});return response}function unableToResolve(){return new Response("<h1>Service Unavailable</h1>",{status:503,statusText:"Service Unavailable",headers:new Headers({"Content-Type":"text/html"})})}}))});
