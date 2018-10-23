const gulp = require('gulp'),
    babel = require('gulp-babel'),
    cleanCss = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify');
    clean = require('gulp-clean');
    jshint = require('gulp-jshint')
    sourcemaps = require('gulp-sourcemaps'),
    runSequence = require('gulp-run-sequence'),

sass.compiler = require('node-sass');

gulp.task('connect', function () {
    connect.server({
        root: 'src',
        livereload: true,
        port: 8080
    });
});


gulp.task('watch', function () {
    gulp.watch('./src/*.html', ['html']);
    gulp.watch('./src/sass/*.scss', ['css-source-map']);
    gulp.watch('./src/js/*.js', ['js-source-map']);
});

gulp.task('start',function(){
    runSequence('connect', 'watch');
})

gulp.task('clean', function () {
    return gulp.src('dev', {read: false})
        .pipe(clean());
});

gulp.task('clean-prod', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('jsmin',function(){
    gulp.src('src/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dev/js'))
        .pipe(connect.reload());
});

gulp.task('cssmin',function() {
    gulp.src('src/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cleanCss())
        .pipe(concat('style.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dev/css'))
        .pipe(connect.reload());
});

gulp.task('html',function() {
    gulp.src('src/app.html')
        .pipe(concat('index.html'))
        .pipe(gulp.dest('dev'))
        .pipe(connect.reload());
});

gulp.task('check', function(){
    return gulp.src('src/js/*.js')
        .pipe(jshint())
})

gulp.task('move-to-dist', function(){
    return gulp.src(['dev/js/app.min.js','dev/css/*.css','dev/index.html'])
    .pipe(gulp.dest('dist'))
})
//build-dev
gulp.task('build',function(){
    runSequence('clean', ['jsmin', 'cssmin' ,'html']);
});

//build-prod
gulp.task('build-prod', function () {
    runSequence('clean-prod',['jsmin', 'cssmin' ,'html'], 'move-to-dist');
});