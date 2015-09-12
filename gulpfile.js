var gulp = require("gulp");
var requireDir = require("require-dir");

var config = require("./gulpconfig");

requireDir("./tasks");

gulp.task("default", ["inject"]);

gulp.task("watch", ["default"], function() {
  "use strict";

  gulp.watch(config.src.js, ["injectJS"]);
  gulp.watch(config.src.css, ["injectCSS"]);
});
