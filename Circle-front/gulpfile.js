/*
 * @Author: 刘祥祥 
 * @Date: 2019-03-18 08:44:53 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-03-21 20:25:02
 */
const gulp = require('gulp');
const sass = require('gulp-sass');
const server = require('gulp-webserver');

const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const clean = require('gulp-clean-css');
const concat = require('gulp-concat');

gulp.task('scss', () => { //scss文件编译,并且压缩css 
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        // .pipe(clean())
        .pipe(gulp.dest('./src/css'));
});

gulp.task('watch', () => { //watch任务,监听scss
    gulp.watch('./src/scss/**/*.scss', gulp.series('scss'))
});

gulp.task('server', () => {
    return gulp.src('./src')
        .pipe(server({
            prot: 8686,
            open: true,
            livereload: true
                // ,proxies: [{
                //     source: '',
                //     target: 'http://localhost:3000'
                // }, {
                //     source: '',
                //     target: 'http://localhost:3000'
                // }, {
                //     source: '',
                //     target: 'http://localhost:3000'
                // }, {
                //     source: '',
                //     target: 'http://localhost:3000'
                // }]
        }));
});

//default任务，默认执行webserver服务，js，css，watch任务
gulp.task('default', gulp.series('scss', 'server', 'watch'));