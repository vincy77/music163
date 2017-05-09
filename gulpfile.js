var gulp = require('gulp');
var cssmin = require('gulp-cssmin');
var jshint = require('gulp-jshint');
var del = require('del');
var templateCache = require('gulp-angular-templatecache');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var stripDebug = require('gulp-strip-debug');
var inject = require('gulp-inject');
var bowerFiles = require('bower-files');
var browserSync = require('browser-sync');
var less = require('gulp-less');
var proxyMiddleware = require('http-proxy-middleware');

var paths = {
    js: ['./src/*.js', './src/js/**/*.js'],
    css: ['./src/css/*.css'],
    less: ['./src/less/*.less'],
    templates: './src/templates.js',
    buildjs: ['./build/*.js'],
    buildcss: ['./build/*.css']
};

//静态服务器
gulp.task('browserSync', function () {
    //跨域接口解决方法
    var middleware = proxyMiddleware(['/api/playlist/detail', '/api/personalized/newsong',
        '/api/personalized/playlist', '/api/personalized/djprogram', '/api/search/pc',
        '/api/search/get/web'
    ], {target: 'http://music.163.com', changeOrigin: true});
    browserSync({
        server: {
            baseDir: './',
            index: './index.html',
            middleware: middleware
        }
    });
});

//编译js(语法检测工具，js有错误会有提示)
gulp.task('jshint', function () {
    gulp.src(paths.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
//每次build清空上次build的文件
gulp.task('clean', function () {
    return del('./build', paths.templates);
});
//将html模板片段合成一个文件
gulp.task('template', function () {
    return gulp.src(['./src/*.html', './src/html/*.html'])
        .pipe(templateCache({module: 'app'}))
        .pipe(gulp.dest('./src/js'))
});
//
gulp.task('js', function () {
    if(true) {
    //if(deployEnviroment == Enviroment.DEV) { //
        return gulp.src(paths.js)
            .pipe(concat('all.js'))
            .pipe(gulp.dest('./build'));
    } else { //PROD
        return gulp.src(paths.js)
            .pipe(sourcemaps.init())
            .pipe(stripDebug())
            .pipe(uglify())
            .pipe(concat('all.min.js'))
            .pipe(gulp.dest('./build'));
    }
});
//编译less
gulp.task('less', function () {
    return gulp.src(paths.less)
        .pipe(less())
        .pipe(gulp.dest('./src/css'));
});
//css文件的合并和压缩
gulp.task('deployCss', function () {
    return gulp.src(paths.css)
        .pipe(cssmin())
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./build'));
});
//inject管理需要插入依赖包的位置
gulp.task('devIndex', ['clean', 'jshint'], function () {
    return gulp.src('./index.html')
        .pipe(inject(gulp.src(paths.js, {read: false}), {relative: true}))
        .pipe(inject(gulp.src(paths.css, {read: false}), {relative: true}))
        //.pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower', relative: true}))
        .pipe(gulp.dest('./'));
});
//
gulp.task('deployIndex', ['clean', 'jshint', 'template', 'js', 'deployCss'], function () {
    return gulp.src('./index.html')
        .pipe(inject(gulp.src(paths.js, {read: false}), {relative: true}))
        .pipe(inject(gulp.src(paths.css, {read: false}), {relative: true}))
        //.pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower', relative: true}))
        .pipe(gulp.dest('./'));
});

gulp.task('watch', ['devIndex','browserSync'], function () {
    gulp.watch(paths.js, ['jshint', 'devIndex']).on('change', function(event) {
        console.log(event.path);
    });
    gulp.watch(paths.less, ['less', 'devIndex']).on('change', function(event) {
        console.log(event.path);
    });
    // gulp.watch(['./css/*.css'], ['css-task']).on('change', function(event) {
    //     console.log(event.path);
    // });
});

gulp.task('default', function () {

});




// var gulp = require('gulp');
// var config = require('./gulp.config.js');
// var order = require('gulp-order');
// var inject = require('gulp-inject');
// var watch = require('gulp-watch');
// var browserSync = require('browser-sync');
//
// gulp.task('browserSync', function () {
//     browserSync({
//         server: {
//             baseDir: './',
//             index: 'src/index.html'
//         }
//     });
// });
//
//
//
// gulp.task('inject', function() {
//
//     var js = gulp.src(config.js, {read: false}).pipe(order(config.jsOrder));
//     var css = gulp.src(config.css, {read: false}).pipe(order(config.cssOrder));
//
//     return gulp
//         .src(config.index)
//         .pipe(inject(js, {addPrefix: '../src', relative: true}))
//         .pipe(inject(css, {addPrefix: '../src', relative: true}))
//         .pipe(gulp.dest(config.src))
//         .pipe(browserSync.reload({stream: true}));
// });
//
//
// gulp.task('watch', function() {
//     watch('src/**/*.js', function() {
//         gulp.run('inject');
//     });
//     watch('src/**/*.css', function() {
//         gulp.run('inject');
//     });
// });
//
// gulp.task('default', ['inject', 'watch', 'browserSync']);