#!/usr/bin/node
"use strict";

const Promise = require("bluebird");
const mkdirp = Promise.promisifyAll(require("mkdirp"));
const fs = Promise.promisifyAll(require("fs"));
const prompt = Promise.promisifyAll(require("prompt"));

const d = new Date();
const p = "./src/md/posts/"
const today = `${d.getFullYear()}/${("0"+(d.getMonth()+1)).slice(-2)}/${("0"+(d.getDate())).slice(-2)}/`;
let tags = "";
// console.log(today);
// process.exit(0);

prompt.getAsync(["title", "tags"])
.then(opts => {
  if(!opts.title) {
    console.log("Title (-t) Required");
    process.exit(0);
  }
  if(opts.tags) {
    opts.tags = `---
tags: ${opts.tags}
---

`
  }
  return opts;
})
.then(opts => {
  return mkdirp.mkdirpAsync(p + today)
  .then(() => opts);
})
.catch(e => {
  console.log("Error", e);
})
.then((opts) => {
  fs.writeFileAsync(
    `${p}${today}${opts.title.replace(" ", "_")}.md`,
    `${opts.tags}# ${opts.title}\r\n#### Subsection\r\n\r\nLorem ipsum\r\n`,
    "utf8"
  )
})
