#!/usr/bin/node

const browserify = require("browserify");
const babelify = require("babelify");
const uglifyjs = require("uglify-js");

const postcss = require("postcss");
const cssImport = require("postcss-import");
const cssnext = require("postcss-cssnext");
const uncss = require("uncss");
const cssnano = require("cssnano");

const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));
//
// module.exports = function Specs() {
// 	return new Promise((resolve, reject) => {
    fs.readFileAsync("./src/css/entry.css", "utf8")
    .then(css => {
      postcss([cssImport, cssnext])
  			.process(css, {
  				from: "./src/css/entry.css",
  				to: "spec.css"
  			})
  			.then(result => {
          console.log(`CSS Unminified: ${result.css.length} bytes`);
  				return result.css;
  			})
        .then(css => {
          return new Promise((resolve, reject) => {
            uncss(["./index.html"], {
              raw: css
            }, (err, output) => {
              if(err) {
                reject(err);
              } else {
                console.log(`CSS after uncss: ${output.length} bytes (${Math.floor(output.length/css.length * 100)}%)`);
                resolve(output);
              }
            });
          });
        })
        .then(css => {
          return cssnano.process(css)
          .then(result => {
            console.log(`CSS after cssnano: ${result.css.length} bytes (${Math.floor(result.css.length/css.length * 100)}%)`);
            return result.css;
          });
        })
        .catch(e => {
          console.log(e);
          return e;
        });
    });

	// });
// }
