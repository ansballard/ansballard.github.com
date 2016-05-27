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

import javascript from "./lib/javascript";
import css from "./lib/css";
import html from "./lib/html";
import post from "./lib/post";
import data from "./lib/data";

const writeFileAsync = denodeify(writeFile);

program
.option("-m, --minify", "Minify")
.option("-j, --javascript", "Build Javascript")
.option("-c, --css", "Build CSS")
.option("-h, --html", "Build HTML")
.option("-s, --serviceworkers", "Build Service Workers")
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

if(program.all || program.javascript) {
  data()
  .then(() => javascript({
    entry: "src/js/entry.js",
    minify: program.minify,
    out: "dist/bundle.js"
  }))
  .then(opts => {
    if(program.watch) {
      watchFileType(Object.assign({}, opts, {
        ext: "js",
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
        dirName: "serviceworkers",
        ext: "js",
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
        ext: "css",
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
        srcExt: "md",
        ext: "html",
        build: html
      }));
    }
  });
}

if(program.watch) {
  process.stdin.setRawMode(true);
  process.stdin.resume();
}

function watchFileType(opts = {}) {
  watch.watchTree(`src/${opts.dirName || opts.srcExt || opts.ext}`, {
    ignoreDotFiles: true,
    ignoreUnreadableDir: true
  }, (f, curr, prev) => {
    if (typeof f !== "object" || prev !== null || curr !== null) {
      spinner.color = "yellow";
      spinner.text = `Building ${(opts.srcExt || opts.ext).toUpperCase()}`;
      opts.build(opts)
      .then(() => {
        spinner.color = "white";
        spinner.text = restingSpinnerMessage;
      })
      .catch(e => {
        console.log(`\nWatch Error: ${red(e.message)}`);
        spinner.color = "red";
        spinner.text = `Error Building ${(opts.srcExt || opts.ext).toUpperCase()}`;
      });
    }
  });
}
