"use strict";

import "core-js/es6/promise";
import marked from "marked";
import highlightjs from "highlight.js";
import glob from "glob";
import { minify as htmlmin } from "html-minifier";
import { red } from "chalk";
import denodeify from "denodeify";
import mkdirp from "mkdirp";
import { readFile, writeFile } from "fs";

const readFileAsync = denodeify(readFile);
const writeFileAsync = denodeify(writeFile);
const mkdirpAsync = denodeify(mkdirp);
const globAsync = denodeify(glob);
const version = require("../../../package.json").version;

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

export default function html(opts = {}) {

  return Promise.all([

    readFileAsync("src/html/index.html", "utf8")
    .then(html => html.replace(/dist\/bundle\.js(\?v=\d+\.\d+\.\d+)?/, `dist/bundle.js?v=${version}`))
    .then(html => html.replace(/dist\/bundle\.css(\?v=\d+\.\d+\.\d+)?/, `dist/bundle.css?v=${version}`))
    .then(html => htmlmin(html, minOptions))
    .then(html => writeFileAsync("index.html", html, "utf8")),

    globAsync("./src/md/**/*.md")
    .then(files => {
      files.forEach(filepath => {
        readFileAsync(filepath, "utf8")
        .then(content => {
          let lines = content
          .split("\r\n")
          .join("\n")
          .split("\n")
          .filter(line => line.trim() !== "");
          if(lines.indexOf("---") === 0 && lines.indexOf("---", 1) === 2 && lines[1].indexOf("tags") > -1) {
            return lines.splice(3).join("\n");
          } else {
            return content;
          }
        })
        .then(content => marked(content))
        .then(html => opts.minify ? htmlmin(html, minOptions) : html)
        .then(html => mkdirpAsync(filepath
          .replace("./src/md/", "./dist/partials/")
          .split("/")
          .filter(dir => dir.indexOf(".md") === -1)
          .join("/"))
          .then(() => html)
        )
        .then(html =>
          writeFileAsync(`${filepath.replace("./src/md/", "./dist/partials/").replace(".md", ".template.html")}`, html, "utf8")
        );
      });
    })
  ])
  .catch(e => {
    console.log(`\nHTML Error: ${red(e.message)}`);
  })
  .then(() => opts);
}
