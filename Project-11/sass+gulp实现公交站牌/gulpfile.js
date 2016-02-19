var gulp=require('gulp');
var sass = require('gulp-ruby-sass');
var uglify=require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),    //css压缩
    rename = require('gulp-rename'),           //重命名
    watch = require('gulp-watch'),
    livereload=require('gulp-livereload');
var src='css/*scss';
var dest='css';
gulp.task('styles', function() {
  return sass(src, { style: 'expanded' })
    .pipe(autoprefixer('last 2 version', 'safari 2', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4')) //加前缀
    .pipe(gulp.dest(dest))                     //指定目标路劲
    .pipe(rename({suffix: '.min'}))            //加.min
    .pipe(minifycss())                         //压缩css
    .pipe(gulp.dest(dest));                    //指定目标路劲
});
//实时监测
gulp.task('watch',function(){
        gulp.watch(src,['styles']);
        livereload.listen();
        gulp.watch(['css/**']).on('change', livereload.changed);  //免刷新
    });
gulp.task('default', ['styles','watch']);



