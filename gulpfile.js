// Include gulp
var gulp = require('gulp');

// Include plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gzip = require('gulp-gzip');
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var htmlreplace = require('gulp-html-replace');
var htmlmin = require('gulp-htmlmin');

// Location Path
var js = 'src/js/';
var ignore = '!';

// Concatenate(combine),  Minify & GZIP compress JS Files
gulp.task('scripts', function () {
    return gulp.src([
		// added manually to keep the order intect i.e. jQuery>Bootstrap
		js + 'jquery.js',
		js + 'jquery-migrate.js',
		js + '*.js',
        ignore+ js + 'app-jobs.js',
        ignore+ js + 'backbone.js',
        ignore+ js + 'pre-loader.js'
    ])
        .pipe(concat('bundle.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        //.pipe(gzip())
        .pipe(gulp.dest('build/js'));
});

// Copy concat excluded files
gulp.task('copyJs', function () {
    return gulp.src([
        js + 'backbone.js',
        js + 'app-jobs.js',
        js + 'pre-loader.js'
    ])
        .pipe(gulp.dest('build/js'))
});


// Concatenate & Minify CSS Files
gulp.task('styles', function () {
    return gulp.src('src/css/**/*.css')
        .pipe(concat('styles.css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cssnano())
        .pipe(gulp.dest('build/css'));
});

// Optimize Image Files
gulp.task('images', function () {
    return gulp.src('src/img/**/*')
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

// Copy JSON
gulp.task('json', function () {
    return gulp.src('src/data/**/*')
        .pipe(gulp.dest('build/data'))
});

// Generate HTML file with Bundled JS/CSS paths & Minify
gulp.task('html', function () {
    return gulp.src('src/*.html')
        .pipe(htmlreplace({
            'css': 'css/styles.min.css',
            'js': 'js/bundle.min.js'
        }))
        .pipe(htmlmin({
            collapseWhitespace: true,
            decodeEntities: true,
            preserveLineBreaks: false,
            removeComments: true,
            removeEmptyAttributes: true,
            removeAttributeQuotes: true,
            collapseBooleanAttributes: true
        }))
        .pipe(gulp.dest('build/'));
});

// Run task automatically on file Modification;
// start by 'gulp watch' & stop by 'Ctrl+C'
gulp.task('watch', function () {
    // Watch .js files
    gulp.watch('src/js/**/*.js', ['scripts']);
    // Watch .scss files
    gulp.watch('src/css/*.css', ['styles']);
    // Watch image files
    gulp.watch('src/img/**/*', ['images']);
    // Watch html files
    gulp.watch('src/*.html', ['html']);
});

// Default Task
gulp.task('default', ['scripts', 'copyJs', 'styles', 'images', 'fonts', 'json', 'html']);
