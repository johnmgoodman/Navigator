var gulp = require('gulp'),
  gulpUtil = require('gulp-util'),
  path = {
    src:            'src/',
    srcAssets:      'src/assets/',
    srcImages:      'src/assets/images/',
    srcLib:         'src/lib/',
    srcStyles:      'src/styles/',
    srcScripts:     'src/scripts/',
    srcComponents:  'src/scripts/components/',
    srcScenes:      'src/scripts/scenes/',
    build:          'build/',
    buildScripts:   'build/scripts/',
    buildLib:       'build/scripts/lib/',
    buildStyles:    'build/styles/',
    buildAssets:    'build/assets/',
    buildImages:    'build/assets/images/'
  },

  BUILD_DEBUG = true;


gulp.task('lint',function() {
  var jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish');

  return gulp.src([path.srcScripts + '*.js' , path.srcScripts + '**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('game',function() {
  var browserify = require('gulp-browserify'),
    uglify,
    stream;

  stream = gulp.src(path.srcScripts + 'game.js')
    .pipe(browserify());

  if(!BUILD_DEBUG) {
    uglify = require('gulp-uglify');
    stream.pipe(uglify());
  }

  return stream.pipe(gulp.dest(path.buildScripts));

});

gulp.task('css',function() {
  return gulp.src(path.srcStyles + '*.css')
    .pipe(gulp.dest(path.buildStyles));
});

gulp.task('scss',function() {
  var sass = require('gulp-sass');
  return gulp.src(path.srcStyles + '*.scss')
    .pipe(sass())
    .pipe(gulp.dest(path.buildStyles));
});

gulp.task('jade',function() {
  var jade = require('gulp-jade');
  return gulp.src(path.src + '*.jade')
    .pipe(jade())
    .pipe(gulp.dest(path.build));
});

gulp.task('jslib',function() {
  return gulp.src(path.srcLib + '*.js')
    .pipe(gulp.dest(path.buildLib));
});

gulp.task('images',function() {
  return gulp.src(path.srcImages + '*.*')
    .pipe(gulp.dest(path.buildImages));
});

gulp.task('gamestyle',function() {
  var sass = require('gulp-sass');
  return gulp.src(path.srcStyles + 'game.scss')
    .pipe(sass())
    .pipe(gulp.dest(path.buildStyles));
});

gulp.task('copy',['jslib','images']);
//gulp.task('styles',['scss','css']);
gulp.task('styles',['gamestyle']);
gulp.task('jsgame',['lint','game']);
gulp.task('default',['lint','copy','jade','styles','game']);


