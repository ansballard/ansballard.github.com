#!/usr/bin/node

const marked = require("marked");
const Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));

Promise.all([
  fs.readFileAsync("./partials/header.html", "utf8"),
  fs.readFileAsync("./md/index.md", "utf8").then(md => `\n<!-- transpiled from index.md -->\n${marked(md)}`),
  fs.readFileAsync("./partials/footer.html", "utf8")
]).then(files => {
  return fs.writeFileAsync("./index.html", files.join(""))
}).then(() => {
  console.log("index.html Built");
}).catch(e => {
  console.log("Error!");
  console.log(JSON.stringify(e, undefined, 4));
});
