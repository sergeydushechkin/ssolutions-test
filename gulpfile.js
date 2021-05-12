'use strict';

var gulp = require("gulp");
var server = require("browser-sync").create();
var del = require("del");
var autoprefixer = require("autoprefixer");

var rename = require("gulp-rename");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");

gulp.task("css", function () {
  return gulp.src("src/sass/style.scss")
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(rename("style.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("markup"))
});

gulp.task("css_copy", function () {
  return gulp.src("markup/style.css")
    .pipe(gulp.dest("public"))
});

gulp.task("html", function () {
  return gulp.src("src/html/*.html")
    .pipe(gulp.dest("markup"));
});

gulp.task("js", function () {
  return gulp.src("src/js/index.js")
    .pipe(rename("bundle.js"))
    .pipe(gulp.dest("public"));
});

gulp.task("copy", function () {
  return gulp.src([
    "src/fonts/**/*.{woff,woff2}",
    "src/img/**",
    // "src/js/**",
    "src/*.ico"
  ], {
      base: "src"
  })
  .pipe(gulp.dest("markup"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("server", function () {
  server.init({
    server: "markup/",
    notify: false,
    open: false,
    cors: true,
    ui: false,
    port: 3000
  });

  gulp.watch("src/sass/**/*.{scss,sass}", gulp.series("css", "css_copy", "refresh"));
  // gulp.watch("src/js/*.js", gulp.series("js", "refresh"));
  gulp.watch("src/html/**/*.html", gulp.series("html", "refresh"));
});

gulp.task("clean", function () {
  return del("markup");
});

gulp.task("build", gulp.series("clean", "copy", "html", "css", "css_copy"/*, "js"*/));
gulp.task("start", gulp.series("build", "server"));
