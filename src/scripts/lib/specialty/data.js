"use strict";

import glob from "glob";
import { readFileSync, writeFile } from "fs";
import denodeify from "denodeify";

export default data;

const writeFileAsync = denodeify(writeFile);
const globAsync = denodeify(glob);

let split;
let content;
let tags;

function data(opts = {}) {
  return globAsync("./src/md/**/*.md")
  .then(files => {
    return files
    .filter(file => file.includes("/posts/"))
    .map(file => {
      split = file.split("/").splice(4);
      content = readFileSync(file, "utf8")
      .split("\r\n")
      .join("\n")
      .split("\n")
      .filter(line => line.trim() !== "");
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
    .sort((a, b) => a.date < b.date);
  })
  .then(content => JSON.stringify(content))
  .then(content =>
    writeFileAsync("./data/posts.js", `export default  ${content};`, "utf8")
  );
}
