var gulp = require("gulp");
var plumber = require("gulp-plumber");
var bust = require("gulp-buster");

var config = require("../gulpconfig");

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

gulp.task("bust", ["bustJS", "bustCSS"]);
