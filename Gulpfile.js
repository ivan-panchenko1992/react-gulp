/* Gulpfile.js */

const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const concat = require('gulp-concat');
const gls = require('gulp-live-server');
const sass = require('gulp-sass')(require('sass'));

var paths = {
  main_js : [ 'src/app.jsx' ],
  css : [ 'src/components/**/*.*css' ],
  js : [ 'src/**/*.js*' ],
  images: ['src/components/**/*.+(png|jpg|gif|ico|svg|webp)']
};
gulp.task('images', function() {
  return gulp.src(paths.images)
    .pipe(gulp.dest('static/images'));
});
gulp.task('sass', function () {
  return gulp.src(paths.css)
    .pipe(sass())
    .pipe(concat('main.css'))
    .pipe(gulp.dest('static/css/'));
});

gulp.task('watch', function() {
  gulp.watch(`${paths.images}`, ['build-images-dev']);
});

gulp.task('js', function() {
  return browserify(paths.main_js)
    .transform(babelify)
    .bundle()
    .on('error', (err)=>{
      console.log('JS Error', err);
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('static/js'));
});

gulp.task('css', function(callback) {
  return gulp.src(paths.css)
  .pipe(concat('main.css'))
  .pipe(gulp.dest('static/css/'));
});

gulp.task('serve', function() {
  var server = gls.static('dist', 8888);
  server.start();

  var server = gls.static(['dist', '.tmp']);
  server.start();

  gulp.watch(['static/**/*.css', 'static/**/*.html'], function (file) {
    server.notify.apply(server, [file]);
  });
});

gulp.task('dev', gulp.series('sass', 'js', 'images' , function () {

  gulp.watch(paths.css, gulp.series('sass' ));
  gulp.watch(paths.js, gulp.series('js'));
  gulp.watch(paths.images, gulp.series('images'))
  // Start server.
  const server = gls.static('static', 8888);
  server.start();
  
  
  // changes.
  gulp.watch([ 'static/**/*.{css,js,html}' ], function (file) {
    server.notify.apply(server, [file]);
  });
}));
