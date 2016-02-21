/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),

    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('autoprefixer'),
    lost = require('lost');

gulp.task('js', function(){
    return gulp.src([
        '_vendor/uptilt/js/uptilt-awesome-form.js',
        '_vendor/uptilt/js/uptilt-modal.js',
        '_vendor/uptilt/js/fitvids.js',
        //This is the project specific files go
        'resources/assets/js/app.js',
      'resources/assets/js/wow.js',])
        .pipe(concat('_concat.js'))
        .pipe(gulp.dest('resources/assets/js/_temp'))
        .pipe(rename('compiled.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/assets/js'));
});

gulp.task('styles', function() {
    return gulp.src([
        'resources/assets/sass/app.sass'])
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
                lost(),
                autoprefixer()
        ]))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('public/assets/css'));
});

gulp.task('watch', function() {
    gulp.watch('resources/assets/sass/*.sass', ['styles']);
    gulp.watch('resources/assets/sass/*/*.sass', ['styles']);
    gulp.watch('resources/assets/js/*.js', ['js']);
});
