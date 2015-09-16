var gulp = require("gulp");
var plumber = require("gulp-plumber");
var inject = require("gulp-inject");
var sequence = require("gulp-run-sequence");

var config = require("../gulpconfig");

gulp.task("injectJS", ["bustJS"], function() {
  "use strict";
  var hash = require("../" + config.dist.hash + "script.hash.json")["script.min.js"];
  hash = hash ? hash.substr(0, 10) : hash;
  return gulp.src("./index.html")
    .pipe(plumber())
    .pipe(inject(gulp.src(config.dist.js, {read: false}), {
      transform: function(filepath) {
        var fp = filepath.split("/");
        return "<script type=\"text/javascript\" src=\"dist/" + fp[fp.length - 1] + "?hash=" + hash + "\"></script>";
      }
    }))
    .pipe(gulp.dest("./"))
  ;
});

gulp.task("injectCSS", ["bustCSS"], function() {
  "use strict";
  var hash = require("../" + config.dist.hash + "script.hash.json")["script.min.js"];
  hash = hash ? hash.substr(0, 10) : hash;
  return gulp.src("./index.html")
    .pipe(plumber())
    .pipe(inject(gulp.src(config.dist.css, {read: false}), {
      transform: function(filepath) {
        var fp = filepath.split("/");
        return "<link rel=\"stylesheet\" type=\"text/css\" href=\"dist/" + fp[fp.length - 1] + "?hash=" + hash + "\"/>";
      }
    }))
    .pipe(gulp.dest("./"))
  ;
});

gulp.task("inject", function(cb) {
  sequence("injectJS", "injectCSS", cb);
});