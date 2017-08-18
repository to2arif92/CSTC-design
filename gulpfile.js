// Include gulp
var gulp = require('gulp');

// Include plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

// Concatenate(combine) & Minify JS Files
gulp.task('scripts', function () {
    return gulp.src('src/**/*.js')
        .pipe(concat('main.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

// Concatenate & Minify CSS Files
gulp.task('styles', function () {
    return gulp.src('src/css/**/*.css')
        .pipe(concat('main.css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cssnano())
        .pipe(gulp.dest('build/css'));
});

// Optimize Image Files
gulp.task('images', function () {
    return gulp.src('images/**/*')
        .pipe(cache(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('build/img'));
});

// Copy Fonts
gulp.task('fonts', function () {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('build/fonts'))
});

// ??
gulp.task('watch', function () {
    // Watch .js files
    gulp.watch('src/js/**/*.js', ['scripts']);
    // Watch .scss files
    gulp.watch('src/css/*.css', ['styles']);
    // Watch image files
    gulp.watch('src/img/**/*', ['images']);
});

// Default Task
gulp.task('default', ['scripts', 'styles', 'images', 'fonts']);
