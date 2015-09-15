var argv = require("yargs").argv;

var distFolder = "./dist/";
var srcFolder = {
  "main": "./src/",
  "js": "./src/js/",
  "css": "./src/css/"
};

var dist = {
  "main": distFolder,
  "js": distFolder + "script.min.js",
  "template": "./tmp/templates/",
  "css": distFolder + "style.min.css",
  "hash": "./tmp/hashes/",
  "module": "profile"
};

var src = {
  "js": [
    srcFolder.js + "*.module.js",
    srcFolder.js + "**/*.module.js",
    srcFolder.js + "*.js",
    srcFolder.js + "**/*.js",
    dist.template + "*.js"
  ],
  "template": [
    srcFolder.js + "*.template.html",
    srcFolder.js + "**/*.template.html"
  ],
  "css": [
    srcFolder.css + "*.css",
    srcFolder.css + "**/*.css"
  ]
};

module.exports = {
  dist: dist,
  src: src,
  srcFolder: srcFolder
};
