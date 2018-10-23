const gulp = require('gulp'),
    babel = require('gulp-babel'),
    cleanCss = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify-es').default,
    clean = require('gulp-clean');
    jshint = require('gulp-jshint')
    sourcemaps = require('gulp-sourcemaps'),
    runSequence = require('run-sequence');

const jsSourceFiles = ['node_modules/moment/min/moment.min.js', 'src/js/canvasState.js', 'src/js/clock.js', 'src/js/app.js'];
const sassSourcePath = 'src/sass/*.scss';
const devFolder = 'dev';
const prodFolder = 'dist';
const jsOuptutFileName = 'app.min.js';
const cssOuptutFileName = 'style.min.css';

sass.compiler = require('node-sass');

gulp.task('connect', function () {
    connect.server({
        root: devFolder,
        livereload: true,
        port: 8080
    });
});

gulp.task('watch', function () {
    gulp.watch('./src/*.html', ['html']);
    gulp.watch(sassSourcePath, ['css-compile']);
    gulp.watch('./src/*.js', ['js-compile']);
});

gulp.task('default',function(){
    runSequence('connect', 'watch');
})

gulp.task('clean', function () {
    return gulp.src(devFolder, {read: false})
        .pipe(clean());
});

gulp.task('clean-prod', function () {
    return gulp.src(prodFolder, {read: false})
        .pipe(clean());
});


// Compile js with source maps
gulp.task('js-compile',function(){
    return gulp.src(jsSourceFiles)
        .pipe(sourcemaps.init())
        .pipe(concat(jsOuptutFileName))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(`${devFolder}/js`))
        .pipe(connect.reload());
});


// Build prod js without sourcemaps
gulp.task('js-build',function(){
    return gulp.src(jsSourceFiles)
        .pipe(concat(jsOuptutFileName))
        .pipe(uglify())
        .pipe(gulp.dest(`${devFolder}/js`));
});

// Compile sass with sourcemaps
gulp.task('css-compile',function() {
    return gulp.src(sassSourcePath)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCss())
        .pipe(concat(cssOuptutFileName))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(`${devFolder}/css`))
        .pipe(connect.reload());
});

// Compile prod css without sourcemaps
gulp.task('css-prod',function() {
    return gulp.src(sassSourcePath)
        .pipe(sass())
        .pipe(cleanCss())
        .pipe(concat(cssOuptutFileName))
        .pipe(gulp.dest(`${devFolder}/css`));
});

gulp.task('html',function() {
    return gulp.src('src/*.html')
        .pipe(concat('index.html'))
        .pipe(gulp.dest(devFolder))
        .pipe(connect.reload());
});

// Lint js
gulp.task('check', function(){
    return gulp.src('js/*.js')
        .pipe(jshint())
})

gulp.task('move-to-dist', function(){
    return gulp.src(['dev/**'], { base: devFolder })
    .pipe(gulp.dest(prodFolder))
})

//build-dev
gulp.task('build',function(){
    runSequence('clean', ['js-compile', 'css-compile', 'html']);
});

//build-prod
gulp.task('build-prod', function () {
    runSequence(['clean-prod', 'clean'], ['js-build', 'css-prod' ,'html'], 'move-to-dist');
});