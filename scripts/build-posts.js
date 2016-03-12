#!/usr/bin/node
"use strict";

const glob = require("glob");
const fs = require("fs");

let split;
let content;
let tags;

glob("./src/md/**/*.md", (err, files) => {

  fs.writeFile("./data/posts.js", "export default " + JSON.stringify(files
    .filter(file => file.includes("/posts/"))
    .map(file => {
      split = file.split("/").splice(4);
      content = fs.readFileSync(file, "utf8").split("\n");
      if(content.indexOf("---") === 0 && content.indexOf("---", 1) === 2 && content[1].indexOf("tags") > -1) {
        tags = content[1].split(":")[1].trim().split(",");
      } else {
        tags = undefined;
      }
      return {
        title: split[3].split("_").join(" ").replace(".md", ""),
        date: new Date(`${split[1]}/${split[2]}/${split[0]}`),
        path: `/#/posts/${split.join("/").replace(".md", "")}`,
        tags
      }
    })
    .sort((a, b) => a.date < b.date)) + ";", "utf8");

});
