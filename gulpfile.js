// Gulp Variables
var gulp = require('gulp');
    sass = require('gulp-sass');
    livereload = require('gulp-livereload');
    connect = require('gulp-connect');
    jshint = require('gulp-jshint');
    rename = require('gulp-rename');
    minifyCss = require('gulp-minify-css');
    gulp = require('gulp');
    webpack = require('webpack-stream');
    browserSync = require('browser-sync').create();

// Server Task
gulp.task('serve', function() {
    browserSync.init({
        server: {
           baseDir: ".",
           index: "/index.html"
        }
    });
});

// Styles Task
gulp.task('styles', function() {
    return gulp.src('src/sass/custom.scss')
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(rename({suffix: '.min'}))
      .pipe(minifyCss())
      .pipe(gulp.dest('dist/css/'))
      .pipe(browserSync.stream());
});

// HTML Task for html changes 
gulp.task('html', function() {
    return gulp.src('./*.html')
     .pipe(browserSync.stream());
});

// JS Lint Task for correcting and monitoring your custom.js
gulp.task('lint', function(){
    return gulp.src('src/js/*.js')
     .pipe(jshint())
       .pipe(jshint.reporter('default'))
       .pipe(browserSync.stream());
});

// For all webpack work for modules and imports/require
gulp.task('webpack', function() {
    return gulp.src('src/js/custom.js')
     .pipe(webpack())
     .pipe(rename('bundle.js'))
     .pipe(gulp.dest('dist/js/'))
     .pipe(browserSync.stream());
});

// Watch task to watch for file changes
gulp.task('watch', function(){
    gulp.watch('src/sass/**/*.scss', gulp.series('styles'));
    gulp.watch('./*.html', gulp.series('html')); 
    gulp.watch('src/js/*.js', gulp.series('lint'));
    gulp.watch('src/js/*.js', gulp.series('webpack'));
});

// Tasks that Gulp will run
gulp.task('default', gulp.parallel('serve', 'styles', 'html', 'lint', 'webpack', 'watch'));
