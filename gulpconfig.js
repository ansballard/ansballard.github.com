var argv = require("yargs").argv;

var distFolder = "./dist/";
var srcFolder = {
  "main": "./src/",
  "js": "./src/js/",
  "js": "./src/js/",
  "css": "./src/css/"
};

var dist = {
  "main": distFolder,
  "js": distFolder + "script.min.js",
  "css": distFolder + "style.min.css"
};

var src = {
  "js": [
    srcFolder.js + "*.module.js",
    srcFolder.js + "**/*.module.js",
    srcFolder.js + "*.js",
    srcFolder.js + "**/*.js"
  ],
  "css": [
    srcFolder.css + "*.css",
    srcFolder.css + "**/*.css"
  ]
};

module.exports = {
  dist: dist,
  src: src
};
