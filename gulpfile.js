var gulp = require("gulp");
var del = require("del");
var plumber = require("gulp-plumber");
var bust = require("gulp-buster");
var inject = require("gulp-inject");
var uglify = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps");
var cssmin = require("gulp-minify-css");
var concat = require("gulp-concat");

var config = require("./gulpconfig");

gulp.task("cleanJS", function (cb) {
  del([config.dist.js, config.dist.js + ".map"], cb);
});

gulp.task("cleanCSS", function (cb) {
  del([config.dist.css], cb);
});

gulp.task("bustJS", ["buildJS"], function() {
  return gulp.src([config.dist.js])
    .pipe(plumber())
    .pipe(bust({
      fileName: "script.hash.json",
      transform: function(obj) {
        var newObj = {};
        console.log(obj);
        for(var hash in obj) {
          newObj[hash.split("/")[hash.split("/").length - 1]] = obj[hash];
        }
        return newObj;
      }
    }))
    .pipe(gulp.dest("hashes/"))
  ;
});

gulp.task("bustCSS", ["buildCSS"], function() {
  return gulp.src([config.dist.css])
    .pipe(plumber())
    .pipe(bust({
      fileName: "style.hash.json",
      transform: function(obj) {
        var newObj = {};
        for(var hash in obj) {
          newObj[hash.split("/")[hash.split("/").length - 1]] = obj[hash];
        }
        return newObj;
      }
    }))
    .pipe(gulp.dest("hashes/"))
  ;
});

gulp.task("buildJS", function() {
  return gulp.src(config.src.js)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat("script.min.js"))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(config.dist.main))
  ;
});

gulp.task("buildCSS", function() {
  return gulp.src(config.src.css)
    .pipe(plumber())
    .pipe(cssmin())
    .pipe(concat("style.min.css"))
    .pipe(gulp.dest(config.dist.main))
  ;
});

gulp.task("injectJS", ["bustJS"], function() {
  "use strict";
  var hash = require("./hashes/script.hash.json")["script.min.js"];
  return gulp.src("./index.html")
    .pipe(plumber())
    .pipe(inject(gulp.src(config.dist.js, {read: false}), {
      transform: function(filepath) {
        var fp = filepath.split("/");
        return "<script type=\"text/js\" src=\"dist/" + fp[fp.length - 1] + "?hash=" + hash + "\"></script>";
      }
    }))
    .pipe(gulp.dest("./"))
  ;
});

gulp.task("injectCSS", ["bustCSS"], function() {
  "use strict";
  var hash = require("./hashes/style.hash.json")["style.min.css"];
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

gulp.task("default", ["injectJS", "injectCSS"]);

gulp.task("watch", ["default"], function() {
  "use strict";

  gulp.watch(config.src.js, ["injectJS"]);
  gulp.watch(config.src.css, ["injectCSS"]);
});
