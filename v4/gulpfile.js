/**
 * gulpfile.js
 * Created by Lukezhu
 */

var _        = require('underscore');
var gulp     = require('gulp');
var del      = require('del');
var path     = require('path');
var gutil    = require('gulp-util');
var vfs      = require('vinyl-fs');
var vftp     = require('vinyl-ftp');
var vpath    = require('vinyl-paths');
var combiner = require('stream-combiner2');
var merge    = require('merge-stream');
var moment   = require('moment');

var $        = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
});

// 获取基本配置信息
// 默认配置使用 config.sample.js 的配置
// 如果用户在 config.js 中设置了值则以用户的为准
var config = _.extend(require('./_config/config.sample.js'), require('./_config/config.js'));

// ftp 配置信息
var ftpConnection = vftp.create({
    host     : config.ftpHost,
    user     : config.ftpUser,
    password : config.ftpPass,
    parallel : 5,
    log      : gutil.log,
    // debug    : gutil.log
});

// 判断是否生产模式
// gulp 命令中含有 --dev 参数则非生产模式
var isProduction = gutil.env.dev !== true;
var sourceMap    = !isProduction;

// swig 配置信息
// Docs: http://paularmstrong.github.io/swig/docs/
var swighljs    = require('./_config/swig_hljs.js');
var swigLocals  = {};
var swigOptions = {
    defaults : { cache: false, locals: swigLocals },
    data     : { page: {} },
    setup    : function(swig) {
        // 在 swig 模版引擎中增加 highlight 标签 用于高亮代码片段
        // Usage: {% highlight 'js' %}code...{% endhighlight %}
        swig.setExtension(swighljs.ext.name, swighljs.ext.obj);
        swig.setTag('highlight', swighljs.parse, swighljs.compile, swighljs.ends, swighljs.block);
    }
}

// 处理文件变化事件
// 高亮显示变化的文件
var handleChangeEvent = function(evt) {
    gutil.log(evt);
    var file = evt.path.split('/');
    var filename = file[file.length - 1];
    gutil.log('File:', gutil.colors.cyan(filename), 'was', gutil.colors.magenta(evt.type));
}

// 处理样式任务
gulp.task('css', function() {
    var combined = combiner.obj([
        gulp.src(config.lessFiles),
        (sourceMap ? $.sourcemaps.init({ loadMaps: true }) : gutil.noop()),
        $.less(),
        $.autoprefixer({ browsers: ['> 1%', 'IE 7'] }),
        (sourceMap ? $.sourcemaps.write() : gutil.noop()),
        gulp.dest(config.cssOutputDir)
    ]);

    combined.on('error', console.error.bind(console));

    return combined;
});


// 处理脚本任务
gulp.task('script', function() {

    var combined = combiner.obj([
        gulp.src(
	        [
                'app/script/util.js',
                'app/script/config.js',
                'app/script/ascii.js',
                'app/script/objects.js',
                'app/script/api.js',
                'app/script/ui.js',
                'app/script/scene.js',
                'app/script/events.js',
                'app/script/main.js'
            ]
        ),
        $.concat('app.js'),
        (sourceMap ? $.sourcemaps.init({ loadMaps: true }) : gutil.noop()),
        (sourceMap ? $.sourcemaps.write() : gutil.noop()),
        gulp.dest(config.jsOutputDir)

    ]);

    combined.on('error', console.error.bind(console));
	
	var vendorCombined = combiner.obj([
        gulp.src(
	        [
	            "app/script/vendor/three.min.js",
	            "app/script/vendor/Detector.js",
	            "app/script/vendor/seedrandom.js",
	            "app/script/vendor/TweenMax.min.js",
	            "app/script/vendor/jquery-2.1.3.js",
	            "app/script/vendor/modernizr.min.js",
	            "app/script/vendor/DeviceOrientationControls.js",
	            "app/script/vendor/fastclick.js",
	            "app/script/vendor/iscroll.js"
	        ]
	        
        ),
        $.concat('vendor.js'),
        (sourceMap ? $.sourcemaps.init({ loadMaps: true }) : gutil.noop()),
        (sourceMap ? $.sourcemaps.write() : gutil.noop()),
        gulp.dest(config.jsOutputDir)
    ]);
    
    vendorCombined.on('error', console.error.bind(console));
    
    return merge(combined, vendorCombined);
});

// 处理svg任务
gulp.task('svg', function() {

    var combined = combiner.obj([
        gulp.src(config.svgFiles),
        $.svgSprite({
	        mode				: {
				view			: {			// Activate the «view» mode 
					bust		: false,
					render		: {
						less	: true		// Activate Sass output (with default options) 
					}
				},
				symbol			: true		// Activate the «symbol» mode 
			}
		}),
		gulp.dest(config.svgOutputDir)
    ]);

    combined.on('error', console.error.bind(console));
	
	
    
    return combined;
});

// 处理模板任务
gulp.task('template', function() {
    var combined = combiner.obj([
        gulp.src(config.tmplFiles),
        $.swig(swigOptions),
        gulp.dest(config.tmplOutputDir)
    ]);

    combined.on('error', console.error.bind(console));

    var docCombined = combiner.obj([
        gulp.src(config.docsTmplFiles),
        $.swig(swigOptions),
        gulp.dest(config.docsOutputDir)
    ]);

    docCombined.on('error', console.error.bind(console));

    return merge(combined, docCombined);
});

// 清空发布目录
gulp.task('clean', function() {
    var combined = combiner.obj([
        gulp.src('dist/*'),
        vpath(del),
        gutil.noop()
    ]);

    combined.on('error', console.error.bind(console));

    return combined;
});

// 给静态文件生成 hash 防止缓存
gulp.task('rev', ['css', 'template', 'clean'], function() {
    var revAll = new $.revAll({
        hashLength          : 4,
        fileNameManifest    : 'manifest.json',
        dontGlobal          : config.revIgnore,
        dontRenameFile      : config.revIgnoreRename,
        dontSearchFile      : config.revIgnoreSearch,
        dontUpdateReference : config.revIgnoreUpdate
    });

    return gulp.src(config.revFiles, { base: config.app })
        .pipe(config.rev ? revAll.revision() : gutil.noop())
		
        .pipe(gulp.dest(config.dist))
        .pipe(config.rev ? revAll.manifestFile() : gutil.noop())
        .pipe(config.rev ? gulp.dest(config.dist) : gutil.noop());
});

gulp.task('minify', ['css', 'template', 'clean','rev'], function() {
    
    var combinedJS = combiner.obj([
        gulp.src('dist/assets/js/*.js'),
        $.uglify(),
        gulp.dest('dist/assets/js')
    ]);

	var combinedCSS = combiner.obj([
        gulp.src('dist/assets/css/*.css'),
        $.minifyCss({ compatibility: 'ie7' }),
        gulp.dest('dist/assets/css')
    ]);
    
    var combinedImg = combiner.obj([
        gulp.src('dist/assets/images/*'),
        $.imagemin({ 
	        progressive: true
		 }),
        gulp.dest('dist/assets/images')
    ]);
    
    combinedJS.on('error', console.error.bind(console));

    return combinedJS,combinedCSS,combinedImg;
});

// 发布文件到 ftp
gulp.task('deploy', function() {
    vfs.src([
        [config.dist, '/**'].join(''),
        ['!', config.dist, '/manifest.json'].join('')
    ], { buffer: false })
        .pipe(ftpConnection.dest(config.ftpPath));
});

// 打包任务
// gulp release 以时间为版本命名文件
// gulp release -v 1.1.0 可指定版本号
gulp.task('release', ['rev'], function() {
    var version = gutil.env.v ? gutil.env.v : moment().format('YYMMDDHHmm');
    var packageName = [config.projectName, version].join('_');

    var combined = combiner.obj([
        gulp.src([
            [config.dist, '/**/*'].join(''),
            ['!', config.dist, '/manifest.json'].join('')
        ]),
        $.zip([packageName, 'zip'].join('.')),
        gulp.dest(config.release)
    ]);

    combined.on('error', console.error.bind(console));

    combined.on('end', function() {
        gutil.log(['Package Success: ', packageName, '.zip has been created on ', config.release].join(''));
    });

    return combined;
});

// 开发任务
// gulp --dev
gulp.task('default', ['css','script'], function() {
    // 监听 less 文件变化
    gulp.watch(config.lessFiles4Watch, ['css']).on('change', function(evt) {
        handleChangeEvent(evt);
    });
	gulp.watch(config.script4Watch, ['script']).on('change', function(evt) {
        handleChangeEvent(evt);
    });
    // 启动本地调试服务器
    gulp.src(config.app)
        .pipe($.webserver({
            host             : config.serverHost,
            port             : config.serverPort,
            directoryListing : true,
            livereload       : { enable: true },
            open             : ['http://', config.serverHost === '0.0.0.0' ? 'localhost' : config.serverHost, ':', config.serverPort, config.serverIndex].join('')
        }));
});

// 发布任务
gulp.task('build', ['css','script','clean', 'rev','minify']);
