"use strict";

import "core-js/es6/promise";
import rollup from "rollup";
import uglifyjs from "uglify-js";
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";

export function javascript(opts = {}) {
  return rollup.rollup({
    entry: opts.entry,
    plugins: [
      nodeResolve(),
      commonjs(),
      babel({
        exclude: "node_modules/**",
        babelrc: false,
        presets: ["es2015-rollup"]
      })
    ]
  })
  .then(bundle => bundle.generate({
    format: "cjs",
    sourceMap: true
  }))
  .then(obj => opts.minify ? uglifyjs.minify(obj.code, {
    inSourceMap: JSON.parse(obj.map),
    outSourceMap: "bundle.js.map",
    fromString: true,
    mangle: true
  }) : obj);
}