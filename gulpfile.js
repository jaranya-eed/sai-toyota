var pkg = require('./package.json'),
    gulp = require("gulp"),
    pump = require('pump'),
    copy = require('gulp-copy'),
    clean = require("gulp-clean"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    header = require("gulp-header"),
    notify = require("gulp-notify"),
    rename = require("gulp-rename"),
    image = require('gulp-image'),
    rev = require("gulp-rev"),
    sourcemaps = require("gulp-sourcemaps"),
    uglify = require("gulp-uglify"),
    util = require("gulp-util"),
    watch = require("gulp-watch"),
    less = require("gulp-less"),
    momentjs = require('moment'),
    LessAutoprefix = require('less-plugin-autoprefix'),
    autoprefix = new LessAutoprefix({ browsers: ['last 20 versions'] }),
    cssConfig = require("./gulp-config/css.json"),
    jsConfig = require("./gulp-config/js.json");

//Define file banner
var banner = ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * generated at : <%= generatedDate %>',
    ' */',
    '\n'].join('\n');

var base = {
    src: "./src/",
    dist: "./dist/"
};
var taskConfig = {
    style: {
        less: cssConfig.less_config,
        css: cssConfig.css_config,
        vendors: cssConfig.vendors
    },
    script: {
        vendors: jsConfig.vendors,
        apps: jsConfig.apps
    }
};

/*======= Tasks =======*/

// 1. Clean up any existing minified version of the stylesheet
gulp.task('styles_clean', function () {
    return gulp.src(taskConfig.style.css.dist_path + taskConfig.style.css.dist_filename.replace(".css", ".min.css"), { read: false }).pipe(clean());
});

// 2. Compile LESS files and save to temp folder
gulp.task('less', ['styles_clean'], function (cb) {
    pump([
        gulp.src(taskConfig.style.less.source_path + taskConfig.style.less.target_less_filename),
        less({
            plugins: [autoprefix]
        }),
        rename(taskConfig.style.less.compiled_filename),
        gulp.dest(taskConfig.style.less.compiled_output)
    ], cb);
});

// 3. Bring up all 3rd-party/external css files and put them together along with the compiled LESS file, save output to temp folder
gulp.task('styles_concat', ['less'], function () {
    var concatCssList = taskConfig && taskConfig.style.vendors ? taskConfig.style.vendors : [];
    concatCssList.push([taskConfig.style.less.compiled_output, taskConfig.style.less.compiled_filename].join(""));

    return gulp.src(concatCssList)
        .pipe(concat(taskConfig.style.css.dist_filename))
        .pipe(gulp.dest(taskConfig.style.css.tmp_concat_path));
});

// 4. Minify the output file in 3.) and put the final version to the target destination path
gulp.task('styles_minify', ['styles_concat'], function (cb) {
    pump([
        gulp.src([taskConfig.style.css.tmp_concat_path, taskConfig.style.css.dist_filename].join("")),
        cssmin(),
        rename({ suffix: '.min' }),
        header(banner, {
            pkg: pkg,
            generatedDate: momentjs().format('YYYY-MM-DD HH:mm:ss')
        }),
        gulp.dest(taskConfig.style.css.dist_path)
    ], cb);
});

// 5. Remove the temp output file of the LESS compilation process
gulp.task('clean_compiled_scss', ['styles_minify'], function (cb) {
    pump([
        gulp.src([taskConfig.style.less.compiled_output, taskConfig.style.less.compiled_filename].join(""), { read: false }),
        clean()
    ], cb);
});

// 6. Remove the temp output file of the css minification process
gulp.task('styles_produce', ['clean_compiled_scss'], function (cb) {
    pump([
        gulp.src([taskConfig.style.css.tmp_concat_path, taskConfig.style.css.dist_filename].join(""), { read: false }),
        clean(),
        notify('Stylesheet minified!')
    ], cb);
});

// 7. Watch for any changed file to rebuild the stylesheet
gulp.task('init_less', ['styles_produce'], function () {
    return gulp.watch(taskConfig.style.less.watch_path, ['styles_produce']);
});


/*===== HTML tasks & watcher ====*/
var templateFileExt = 'html,htm,php';
gulp.task('html_clean', function (cb) {
    pump([
        gulp.src('**/*.{' + templateFileExt + '}', { cwd: base.dist }),
        clean({ force: true }),
        gulp.dest(base.dist)
    ], cb);
});
gulp.task('html_copy', ["html_clean"], function (cb) {
    pump([
        gulp.src('**/*.{' + templateFileExt + '}', { cwd: base.src }),
        gulp.dest(base.dist)
    ], cb);
});
gulp.task('html_watch', ["html_copy"], function (cb) {
    return gulp.watch(base.src + '**/*.{' + templateFileExt + '}', function (obj) {
        if (obj.type === 'changed') {
            gulp.src(obj.path, { "base": base.src })
                .pipe(gulp.dest(base.dist))
                .pipe(notify('HTML,PHP modified!'));
        }
    });
});


/*===== Javascript 3rd party libraries ====*/
gulp.task('js_vendors_clean', function (cb) {
    pump([
        gulp.src(taskConfig.script.vendors.target_path + taskConfig.script.vendors.target_filename.replace(".js",".min.js"), { cwd: base.dist }),
        clean({ force: true }),
        gulp.dest(base.dist)
    ], cb);
});
gulp.task('js_vendors_concat', ['js_vendors_clean'], function () {
    var concatVendorList = taskConfig && taskConfig.script.vendors ? (taskConfig.script.vendors.file_list || []) : [];

    return gulp.src(concatVendorList)
        .pipe(concat(taskConfig.script.vendors.target_filename))
        .pipe(gulp.dest(taskConfig.script.vendors.tmp_path));
});
gulp.task('js_vendors_compress', ['js_vendors_concat'], function (cb) {
    pump([
            gulp.src(taskConfig.script.vendors.tmp_path + taskConfig.script.vendors.target_filename),
            uglify(),
            rename({suffix: '.min'}),
            header(banner, {
                pkg: pkg,
                generatedDate: momentjs().format('YYYY-MM-DD HH:mm:ss')
            }),
            gulp.dest(taskConfig.script.vendors.target_path)
        ],
        cb);
});
gulp.task('init_js_vendors', ['js_vendors_compress'], function (cb) {
    pump([
        gulp.src(taskConfig.script.vendors.tmp_path + taskConfig.script.vendors.target_filename, { read: false }),
        clean()
    ], cb);
});


/*===== App Javascript Tasks ====*/
gulp.task('js_apps_clean', function (cb) {
    pump([
        gulp.src(taskConfig.script.apps.target_path + taskConfig.script.apps.target_filename.replace(".js",".min.js"), { cwd: base.dist }),
        clean({ force: true }),
        gulp.dest(base.dist)
    ], cb);
});
gulp.task('js_apps_concat', ['js_apps_clean'], function () {
    var concatAppsList = taskConfig && taskConfig.script.apps ? (taskConfig.script.apps.file_list || []) : [];

    return gulp.src(concatAppsList)
        .pipe(concat(taskConfig.script.apps.target_filename))
        .pipe(gulp.dest(taskConfig.script.apps.tmp_path));
});
gulp.task('js_apps_compress', ['js_apps_concat'], function (cb) {
    pump([
            gulp.src(taskConfig.script.apps.tmp_path + taskConfig.script.apps.target_filename),
            uglify(),
            rename({suffix: '.min'}),
            header(banner, {
                pkg: pkg,
                generatedDate: momentjs().format('YYYY-MM-DD HH:mm:ss')
            }),
            gulp.dest(taskConfig.script.apps.target_path)
        ],
        cb);
});
gulp.task('js_apps_produce', ['js_apps_compress'], function (cb) {
    pump([
        gulp.src(taskConfig.script.apps.tmp_path + taskConfig.script.apps.target_filename, { read: false }),
        clean(),
        notify("JS application minified!")
    ], cb);
});
// 7. Watch for any changed file to rebuild the stylesheet
gulp.task('init_js_apps', ['js_apps_produce'], function () {
    return gulp.watch(taskConfig.script.apps.watch_path, ['js_apps_produce']);
});


/*===== Assets tasks & watcher ====*/
var imageOptions = {
    pngquant: true,
    optipng: false,
    zopflipng: false,
    jpegRecompress: false,
    jpegoptim: true,
    mozjpeg: true,
    gifsicle: true,
    concurrent: 10
};
gulp.task('assets_clean', function (cb) {
    pump([
        gulp.src('**/*.{jpg,png,gif,svg,eot,ttf,woff,woff2}', { cwd: base.dist }),
        clean({ force: true }),
        gulp.dest(base.dist)
    ], cb);
});
gulp.task('images_copy', ['assets_clean'], function (cb) {
    pump([
        gulp.src(['**/*.{jpg,jpeg,png,gif,JPG,JPEG,PNG,GIF}'], { cwd: base.src }),
        image(imageOptions),
        gulp.dest(base.dist)
    ], cb);
});
gulp.task('assets_copy', ['images_copy'], function (cb) {
    pump([
        gulp.src('**/*.{svg,eot,ttf,woff,woff2}', { cwd: base.src }),
        gulp.dest(base.dist)
    ], cb);
});
gulp.task('assets_watch', ["assets_copy"], function (cb) {
    return gulp.watch(base.src + '**/*.{jpg,png,gif,svg,eot,ttf,woff,woff2,JPG,JPEG,PNG,GIF}', function (obj) {
        if (obj.type === 'changed') {
            if (/[.]((jpg)|(jpeg)|(png)|(gif))$/gi.test(obj.path)) {
                gulp.src(obj.path, { "base": base.src })
                    .pipe(image(imageOptions))
                    .pipe(gulp.dest(base.dist));
            } else {
                gulp.src(obj.path, { "base": base.src })
                    .pipe(gulp.dest(base.dist));
            }
        }
    });
});



gulp.task("default", ["html_watch", "assets_watch", "init_js_vendors", "init_js_apps", "init_less"]);


