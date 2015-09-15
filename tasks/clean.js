var gulp = require("gulp");
var del = require("del");

var config = require("../gulpconfig");

gulp.task("cleanJS", function () {
  return del([config.dist.js, config.dist.js + ".map"]);
});

gulp.task("cleanTemplate", function () {
  return del([config.dist.template + "*.js"]);
});

gulp.task("cleanCSS", function () {
  return del([config.dist.css]);
});

gulp.task("cleanHash", function () {
  return del([config.dist.hash + "*.json"]);
});
