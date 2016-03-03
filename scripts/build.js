const marked = require("marked");
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

// Promise.all([
//   fs.readFileAsync("./src/partials/header.html", "utf8"),
//   fs.readFileAsync("./src/md/index.md", "utf8").then(md => `\n<!-- transpiled from index.md -->\n${marked(md)}`),
//   fs.readFileAsync("./src/partials/footer.html", "utf8")
// ])
// .then(files => files.join(""))
// // .then(html => htmlmin(html, minOptions))
// .then(html => html.replace("dist/bundle.js", `dist/bundle.js?v=${version}`))
// .then(html => html.replace("dist/bundle.css", `dist/bundle.css?v=${version}`))
// .then(html => {
//   return fs.writeFileAsync("./index.html", html)
// }).then(() => {
//   console.log("index.html Built");
// }).catch(e => {
//   console.log("Error!");
//   console.log(JSON.stringify(e, undefined, 4));
// });
