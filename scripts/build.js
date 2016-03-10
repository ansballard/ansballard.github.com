#!/usr/bin/node
"use strict";

const marked = require("marked");
const highlightjs = require("highlight.js");
const glob = require("glob")
const htmlmin = require("html-minifier").minify;
const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));
const mkdirp = Promise.promisifyAll(require("mkdirp"));

const version = require("../package.json").version;

const minOptions = {
  removeComments: true,
  collapseWhitespace: true
};

marked.setOptions({
  highlight(code) {
    return highlightjs.highlightAuto(code).value;
  }
});

glob("./src/md/**/*.md", (err, files) => {
  files.forEach(filepath => {
    fs.readFileAsync(filepath, "utf8")
    .then(content => marked(content))
    .then(html => htmlmin(html))
    .then(html => {
      return mkdirp.mkdirpAsync(filepath
        .replace("./src/md/", "./dist/partials/")
        .split("/")
        .filter(dir => dir.indexOf(".md") === -1)
        .join("/")
      )
      .then(() => {
        return fs.writeFileAsync(`${filepath.replace("./src/md/", "./dist/partials/").replace(".md", ".template.html")}`, html, "utf8");
      });
    });
  });
});
