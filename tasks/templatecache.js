var gulp = require("gulp");
var plumber = require("gulp-plumber");
var templateCache = require("gulp-angular-templatecache");

var config = require("../gulpconfig");

gulp.task("cacheTemplates", ["cleanTemplate"], function() {
  return gulp.src(config.src.template)
    .pipe(plumber())
    .pipe(templateCache({
      module: config.dist.module
    }))
    .pipe(gulp.dest(config.dist.template))
});
