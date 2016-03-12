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
  collapseWhitespace: true,
  removeAttributeQuotes: true
};

marked.setOptions({
  highlight(code) {
    return highlightjs.highlightAuto(code).value;
  }
});

let lines;

fs.readFileAsync("index.html", "utf8")
  .then(html => html.replace(/dist\/bundle\.js\?v=\d+\.\d+\.\d+/, `dist/bundle.js?v=${version}`))
  .then(html => html.replace(/dist\/bundle\.css\?v=\d+\.\d+\.\d+/, `dist/bundle.css?v=${version}`))
  .then(html => htmlmin(html, minOptions))
  .then(html => fs.writeFileAsync("index.html", html, "utf8"))
;

glob("./src/md/**/*.md", (err, files) => {
  files.forEach(filepath => {
    fs.readFileAsync(filepath, "utf8")
    .then(content => {
      lines = content.split("\n");
      if(lines.indexOf("---") === 0 && lines.indexOf("---", 1) === 2 && lines[1].indexOf("tags") > -1) {
        return lines.splice(3).join("\n");
      } else {
        return content;
      }
    })
    .then(content => marked(content))
    .then(html => htmlmin(html, minOptions))
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
