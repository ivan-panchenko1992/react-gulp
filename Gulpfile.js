/* Gulpfile.js */

const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const concat = require('gulp-concat');
const gls = require('gulp-live-server');

var paths = {
  main_js : [ 'src/app.jsx' ],
  css : [ 'src/components/**/*.*css' ],
  js : [ 'src/**/*.js*' ]
};

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

gulp.task('dev', gulp.series('css', 'js' , function () {
  
  gulp.watch(paths.css, gulp.series('css' ));
  gulp.watch(paths.js, gulp.series('js'));
  
  var server = gls('server/server.js', { stdio : 'inherit' });
  server.start();
  
  gulp.watch([ 'server/**/*.js' ], function() {
  server.start.bind(server)();
  });
  
  gulp.watch([ 'static/**/*.{css,js,html}' ], function(file) {
    server.notify(file);
    });
}));
