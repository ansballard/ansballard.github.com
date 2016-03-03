#!/usr/bin/node
"use strict";

const postcss = require("postcss");
const cssImport = require("postcss-import");
const cssnext = require("postcss-cssnext");
const uncss = require("uncss");
const cssnano = require("cssnano");

const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));

let mdOutput = "## CSS Compression Specs\r\n\r\n|Step|Size in Bytes|Compression %|\r\n|---|---|---|\r\n";
let largestTotal;

fs.readFileAsync("./src/css/entry.css", "utf8")
	.then(css => {
		postcss([cssImport, cssnext])
			.process(css, {
				from: "./src/css/entry.css",
				to: "spec.css"
			})
			.then(result => {
        largestTotal = result.css.length;
				console.log(`CSS Unminified: ${result.css.length} bytes (100%)`);
        mdOutput += `|CSS Unminified|${result.css.length} bytes|100%|\r\n`;
				return result.css;
			})
			.then(css => {
				return new Promise((resolve, reject) => {
					uncss(["./index.html"], {
						raw: css
					}, (err, output) => {
						if (err) {
							reject(err);
						} else {
							console.log(`CSS after uncss: ${output.length} bytes (${Math.floor(output.length/largestTotal * 100)}%)`);
              mdOutput += `|After UnCSS|${output.length} bytes|${Math.floor(output.length/largestTotal * 100)}%|\r\n`;
							resolve(output);
						}
					});
				});
			})
			.then(css => {
				return cssnano.process(css)
					.then(result => {
						console.log(`CSS after cssnano: ${result.css.length} bytes (${Math.floor(result.css.length/largestTotal * 100)}%)`);
            mdOutput += `|After cssnano|${result.css.length} bytes|${Math.floor(result.css.length/largestTotal * 100)}%|`;
						return result.css;
					});
			})
      .then(css => {
        return fs.writeFileAsync("./compressionSpecs.md", mdOutput, "utf8");
      })
      .catch(e => {
        console.log("Error:", e);
      });
	});
