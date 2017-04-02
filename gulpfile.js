var gulp = require('gulp');
var del = require('del');
// var $ = require('gulp-load-plugins')();
var fs = require('fs');
var through2 = require('through2');
var gulpPrefixer = require('./tools/prefixer');
var source = require('vinyl-source-stream');
var crypto = require('crypto');
var i = 0;
var map = {};

gulp.task('default', ['read'],function() {

    return gulp.src('./**/*.blade.php')
    // fs.createReadStream('./tools/test.js')
    //     .pipe(source('test.js'))
        // .pipe(gulpPrefixer('//prepended string\n'))
        // .pipe(modify(version))
        .pipe(through2.obj(function(file, enc, cb) {
            console.log(map);
            var str = file.contents.toString();
            var patt = /<link.*\/>|/;
            var pattScript = /<script.*'(\S*.js).*><\/script>/g;
            var newStr = str.replace(pattScript, function(match, p1, p2, p3) {
                // console.log(match)
                console.log(p1)
                // console.log(p2)
                // console.log(p3)
                return match.replace(p1,p1 + '?v=12345');

            });
            file.contents = new Buffer(newStr,'utf-8');
            // console.log(str.match(pattScript));

            // console.log(++i +'.' + file.relative,crypto.createHash('md5').update(file.contents).digest('hex'));
            cb(null, file);
        }))
        // .pipe(fs.createWriteStream('./tools/out.js'));
        .pipe(gulp.dest('./tools/modified-files'));

    // fs.createReadStream('README.md')
    //     .pipe(source('README.md'))
    //     .pipe(marked())
    //     .pipe(gulp.dest('./tools/modified-files'));
});

function modify(modifier) {
    return through2.obj(function(file, enc, cb) {
        var content = modifier(String(file.contents));
        file.contents = new Buffer(content);
        // this.push(file);
        cb(null,file);
    });
}

gulp.task('hash', function() {
    return gulp.src(['./scripts/*.js'])
        .pipe(through2.obj(function(file, enc, cb) {
            map[file.relative] = crypto.createHash('md5').update(file.contents).digest('hex');
            cb(null,file);
        }));
});

/**
 *
 * @param data  String
 * @returns {void|string|XML}
 */
function version(data) {
    return data.replace(/__VERSION__/, '2.3.3');
}

gulp.task('clean', del.bind(null, ['dist']));
gulp.task('dist', function() {
    return gulp.src([
        './**/*',
        '!gulpfile.js',
        '!package.json',
        '!README.md'
    ]).pipe(gulp.dest('./dist'));
});

gulp.task('autoprefixer', function () {
    var postcss      = require('gulp-postcss');
    var sourcemaps   = require('gulp-sourcemaps');
    var autoprefixer = require('autoprefixer');

    return gulp.src('./tx/css/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0']
        }) ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./tx/dist/css/'));
});

var concat = require('gulp-concat');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var minifyHtml = require('gulp-minify-html');
var rev = require('gulp-rev');  // 文件名加言(防缓存)
var minifyCss = require('gulp-minify-css');
var runSequence = require('run-sequence');
var rename = require("gulp-rename");

gulp.task('usemin', function() {
    return gulp.src('tx/index.html')
        .pipe(usemin({
            css: [minifyCss(), 'concat', rev()]
            //html: [minifyHtml({empty: true})],
            // js: [uglify(), rev()]
        }))
        .pipe(gulp.dest('tx/dist/'));
});

gulp.task('imagemin', function () {
    return gulp.src('tx/img/*.{png,jpg,jpeg,gif,webp,svg}')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('tx/dist/img/'));
});

gulp.task('clean:tx', del.bind(null, ['tx/dist']));


gulp.task('build:tx', ['clean:tx'], function(cb) {
    runSequence(
        ['usemin', 'imagemin'],
        cb);
});