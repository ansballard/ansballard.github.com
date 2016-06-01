"use strict";

import { watch } from "chokidar";
import denodeify from "denodeify";
import { writeFile } from "fs";
import { dirname } from "path";

import javascript from "../lib/javascript";
import css from "../lib/css";
import html from "../lib/html";

import post from "../lib/specialty/post";
import data from "../lib/specialty/data";

const writeFileAsync = denodeify(writeFile);

let watcher = {
  close() {}
};

export function run(program = {}) {
  if(program.watch) {
    program.onquit(() => {
      watcher.close();
    });
  }
  /* SPECIAL CASE */
  if(program.post) {
    post();
  }

  if(program.all || program.javascript) {
    /* SPECIAL CASE */
    data().then(() =>
    javascript({
      entry: "src/js/entry.js",
      minify: program.minify,
      out: "dist/bundle.js"
    }))
    .catch(e => {
      console.log(e);
    })
    .then(opts => {
      if(program.watch) {
        watchFileType(Object.assign({}, opts, {
          prettyName: "Javascript",
          build: javascript
        }));
      }
    });
  }

  if(program.all || program.serviceworkers) {
    javascript({
      entry: "src/serviceworkers/cache.sw.js",
      minify: program.minify,
      out: "sw.js"
    })
    .then(opts => {
      if(program.watch) {
        watchFileType(Object.assign({}, opts, {
          prettyName: "Service Workers",
          build: javascript
        }));
      }
    });
  }

  if(program.all || program.css) {
    css({
      entry: "src/css/entry.css",
      minify: program.minify,
      out: "dist/bundle.css"
    })
    .then(opts => {
      if(program.watch) {
        watchFileType(Object.assign({}, opts, {
          prettyName: "CSS",
          build: css
        }));
      }
    });
  }
  if(program.all || program.html) {
    html({
      minify: program.minify
    })
    .then(opts => {
      if(program.watch) {
        watchFileType(Object.assign({}, opts, {
          strictWatch: ["./src/html/", "./src/md/"],
          prettyName: "MD/HTML",
          build: html
        }));
      }
    });
  }

  function watchFileType(opts = {}) {
    watcher = watch(opts.strictWatch || dirname(opts.entry), {
      persistent: true
    })
    .on("all", (event, filename) => {
      program.building && program.building(opts);
      opts.build(opts)
      .then(() => {
        program.goodWatch && program.goodWatch(opts);
      })
      .catch(e => {
        program.badWatch && program.badWatch(e, opts);
      });
    });
  }
}
