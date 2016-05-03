#!/usr/bin/env node
"use strict";

import "core-js/es6/promise";
import program from "commander";
import prompt from "prompt";
import watch from "watch";
import denodeify from "denodeify";
import ora from "ora";
import keypress from "keypress";
import { writeFile } from "fs";

import { javascript } from "./lib/javascript";
// import { serviceworkers } from "./lib/serviceworkers";
import { css } from "./lib/css";
import { html } from "./lib/html";
import { post } from "./lib/post";

let builds = {
  js: buildJavascript,
  // serviceworkers: buildServiceWorkers,
  css: buildCSS,
  html: buildHTML
};

const writeFileAsync = denodeify(writeFile);

program
.option("-m, --minify", "Minify")
.option("-j, --javascript", "Build Javascript")
.option("-c, --css", "Build CSS")
.option("-h, --html", "Build HTML")
// .option("-s, --serviceworkers", "Build Service Workers")
.option("-a, --all", "All (JS, CSS, HTML)")
.option("-w, --watch", "Watch for Changes")
.option("-p, --post", "New Post")
.parse(process.argv);

const restingSpinnerMessage = "Watching: `Q` to quit";
const spinner = ora(restingSpinnerMessage);

if(program.watch) {
  if(program.post) {
    console.log("Can't watch and post at the same time");
    process.exit(0);
  }
  spinner.start();
  keypress(process.stdin);
  
  process.stdin.on("keypress", (ch, key) => {
    if (key && key.name === "q") {
      spinner.stop();
      process.exit(0);
    }
  });
}

if(program.post) {
  post();
}

if(program.all) {
  program.javascript = program.css = program.html = true;
}

if(program.javascript) {
  buildJavascript({
    entry: "src/js/entry.js",
    minify: program.minify
  });
  if(program.watch) {
    watchFileType({
      ext: "js"
    });
  }
}

// if(program.serviceworkers) {
//   buildServiceWorkers({
//     entry: "src/serviceworkers/cache.sw.js",
//     minify: program.minify
//   });
//   if(program.watch) {
//     watchFileType({
//       dirName: "serviceworkers",
//       ext: "js"
//     });
//   }
// }

if(program.css) {
  buildCSS({
    entry: "src/css/entry.css",
    minify: program.minify
  });
  if(program.watch) {
    watchFileType({
      ext: "css"
    });
  }
}
if(program.html) {
  buildHTML({
    minify: program.minify
  });
  if(program.watch) {
    watchFileType({
      srcExt: "md",
      ext: "html"
    });
  }
}

if(program.watch) {
  process.stdin.setRawMode(true);
  process.stdin.resume();
}

function buildJavascript(opts = {}) {
  return javascript({
    entry: opts.entry,
    minify: opts.minify
  })
  .then(obj => Promise.all([
    writeFileAsync("dist/bundle.js", obj.code),
    writeFileAsync("dist/bundle.js.map", obj.map)
  ]));
}

// function buildServiceWorkers(opts = {}) {
//   return serviceworkers({
//     entry: opts.entry,
//     minify: opts.minify
//   })
//   .then(result => writeFileAsync("cache.sw.js", result))
//   .catch(e => {
//     console.log(e);
//   })
// }

function buildCSS(opts = {}) {
  return css({
    entry: opts.entry,
    minify: opts.minify
  })
  .then(result => writeFileAsync(
    "dist/bundle.css",
    result
  ));
}

function buildHTML(opts = {}) {
  return html({
    minify: program.minify
  });
}

function watchFileType(opts = {}) {
  watch.watchTree(`src/${opts.dirName || opts.srcExt || opts.ext}`, {
    ignoreDotFiles: true,
    ignoreUnreadableDir: true
  }, (f, curr, prev) => {
    if (typeof f !== "object" || prev !== null || curr !== null) {
      spinner.color = "yellow";
      spinner.text = `Building ${(opts.srcExt || opts.ext).toUpperCase()}`;
      builds[opts.ext]({
        entry: `src/${opts.dirName || opts.ext}/entry.${opts.ext}`,
        minify: program.minify
      })
      .then(() => {
        spinner.color = "white";
        spinner.text = restingSpinnerMessage;
      })
      .catch(e => {
        console.log(e);
        spinner.color = "red";
        spinner.text = `Error Building ${(opts.srcExt || opts.ext).toUpperCase()}`;
      });
    }
  });
}