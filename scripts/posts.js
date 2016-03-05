#!/usr/bin/node
"use strict";

const glob = require("glob");
const fs = require("fs");

glob("./src/md/**/*.md", (err, files) => {

  fs.writeFile("./data/posts.js", "export default " + JSON.stringify(files
    .map(file => file
      .split("/")
      .slice(4)
    )
    .filter(file => file.length > 1)
    .map(file => ({
      title: file[3].split("_").join(" ").replace(".md", ""),
      date: new Date(`${file[1]}/${file[2]}/${file[0]}`),
      path: `/#/posts/${file.join("/").replace(".md", "")}`
    }))
    .sort((a, b) => a.date < b.date)) + ";", "utf8");

});
