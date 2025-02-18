const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass')(require('sass'));
const cleanCSS    = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename      = require("gulp-rename");
const imagemin    = require("gulp-imagemin");
const htmlmin     = require('gulp-htmlmin');

// Локальный сервер
gulp.task('server', function() {
    browserSync.init({
        server: { baseDir: "dist" }
    });
    gulp.watch("src/*.html", gulp.series('html'));
});

// Компиляция SCSS
gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min'}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

// Минификация HTML
gulp.task('html', function(){
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"))
        .pipe(browserSync.stream());
});

// Копирование JS
gulp.task('scripts', function(){
    return gulp.src("src/js/**/*.js")
        .pipe(gulp.dest("dist/js"));
});

// Копирование шрифтов
gulp.task('fonts', function(){
    return gulp.src("src/fonts/**/*.*")
        .pipe(gulp.dest("dist/fonts"));
});

// Копирование иконок
gulp.task('icons', function(){
    return gulp.src("src/icons/**/*.*")
        .pipe(gulp.dest("dist/icons"));
});

// Копирование файлов mailer
gulp.task('mailer', function(){
    return gulp.src("src/mailer/**/*.*")
        .pipe(gulp.dest("dist/mailer"));
});

// Оптимизация изображений
gulp.task('images', function(){
    return gulp.src("src/img/**/*.{png,jpg,jpeg,svg,gif}")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img"));
});

// Отслеживание изменений
gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.series('styles'));
    gulp.watch("src/*.html", gulp.series('html'));
});

// Задача по умолчанию
gulp.task('default', gulp.series(
    gulp.parallel('html', 'styles', 'scripts', 'fonts', 'icons', 'mailer', 'images'),
    gulp.parallel('watch', 'server')
));


gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'scripts', 'fonts', 'icons', 'mailer', 'html', 'images'));