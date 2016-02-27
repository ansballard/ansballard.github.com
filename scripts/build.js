const marked = require("marked");
const htmlmin = require("html-minifier").minify;
const Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));

const version = require("../package.json").version;

const minOptions = {
  removeComments: true,
  collapseWhitespace: true
};

Promise.all([
  fs.readFileAsync("./src/partials/header.html", "utf8"),
  fs.readFileAsync("./src/md/index.md", "utf8").then(md => `\n<!-- transpiled from index.md -->\n${marked(md)}`),
  fs.readFileAsync("./src/partials/footer.html", "utf8")
])
.then(files => files.join(""))
// .then(html => htmlmin(html, minOptions))
.then(html => html.replace("dist/bundle.js", `dist/bundle.js?v=${version}`))
.then(html => html.replace("dist/bundle.css", `dist/bundle.css?v=${version}`))
.then(html => {
  return fs.writeFileAsync("./index.html", html)
}).then(() => {
  console.log("index.html Built");
}).catch(e => {
  console.log("Error!");
  console.log(JSON.stringify(e, undefined, 4));
});
