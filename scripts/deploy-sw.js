#!/usr/bin/node
"use strict";

const rollup = require("rollup");
const uglifyjs = require("uglify-js");
const json = require("rollup-plugin-json");
const babel = require("rollup-plugin-babel");

const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));

let mdOutput = "## JS Compression Specs\r\n\r\n|Step|Size in Bytes|Compression %|\r\n|---|---|---|\r\n";
let largestTotal;

rollup.rollup({
  entry: "src/serviceworkers/cache.sw.js",
  plugins: [json(), babel({
    exclude: "node_modules/**",
    babelrc: false,
    presets: ["es2015-rollup"]
  })]
}).then(bundle => {
  return fs.writeFileAsync("cache.sw.js", uglifyjs.minify(bundle.generate({
    format: "cjs",
    sourceMap: false
  }).code, {
    fromString: true,
    mangle: true
  }).code, "utf8");
})
.catch(e => {
  console.log(e);
});
