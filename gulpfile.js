var { src, dest } = require('gulp');
var gulp = require('gulp');
var include = require('gulp-include');
var concat = require('gulp-concat');
var uglify = require("gulp-uglify")
//var babel = require('gulp-babel'); not needed for now
var sass = require('gulp-sass');
var minify = require("gulp-clean-css");
var browserSync = require('browser-sync').create();

gulp.task('js', function() {
    return src([
            'src/js/jquery.js',
            'src/js/login/cookies-plugin.js',
            'src/js/login/cookies.js',            
            'src/js/getData.js',
            'src/js/login/login.js',
            'src/js/user/upload.js',
            'src/js/user/user-add.js', 
            'src/js/user/user-direct-edit.js',
            'src/js/user/user-add-del-success.js',                        
            'src/js/handlers.js',            
            'src/js/app.js'       
        ])        
        //.pipe(babel({ presets: ['@babel/env']}))
        .pipe(include())
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
}); 

gulp.task('themes', function() {
    return src('src/css/themes/*.css')
      .pipe(minify())
      .pipe(dest('app/css'));
});

gulp.task('scss', function() {
    return src('src/css/other/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(concat('app.min.css'))
      .pipe(minify())
      .pipe(dest('app/css'));
});

gulp.task('html', function() {
    return src('*.html')
      .pipe(concat('app.html'))
      .pipe(dest('app/'));
});

gulp.task('watch', function(){
    gulp.watch(['src/js/*.js', 'src/js/user/*.js', 'src/js/login/*.js'], gulp.series('js')).on('change', function () {browserSync.reload();});
    gulp.watch('src/css/themes/*.css', gulp.series('themes')).on('change', function () {browserSync.reload();});
    gulp.watch('src/css/other/*.scss', gulp.series('scss')).on('change', function () {browserSync.reload();});
    gulp.watch('*.html', gulp.series('html')).on('change', function () {browserSync.reload();});
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app",
            index: "app.html"
        },   
        callbacks: {
            ready: function(err, bs) {
                console.log("----------------------------------");
                console.log("[\x1b[31m v0.4 Catalyst App \x1b[37m] \- \x1b[32mdeveloped by Daniel Kandilas");
                console.log("----------------------------------");
            }
        },
        port:1350,
        ui: false
    });
});
gulp.task('run', gulp.parallel('js', 'themes', 'scss', 'html', 'watch','browser-sync'));