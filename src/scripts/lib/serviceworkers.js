"use strict";

import "core-js/es6/promise";
import rollup from "rollup";
import uglifyjs from "uglify-js";
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";

export function serviceworkers(opts = {}) {
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
  .then(bundle => {
      console.log("after rollup");
      return bundle;
  })
  .then(bundle => bundle.generate({
    format: "cjs",
    sourceMap: true
  }))
  .then(obj => {
      console.log("after generate");
      return obj;
  })
  .then(obj => opts.minify ? uglifyjs.minify(obj.code, {
    fromString: true,
    mangle: true
  }) : obj)
  .then(obj => obj.code)
  .then(code => {
      console.log(code);
      return code;
  });
}