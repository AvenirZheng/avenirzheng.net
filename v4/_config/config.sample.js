var config = {

    // 项目名称
    projectName     : 'Mozi.gulp',

    // 调试服务器地址
    serverHost      : '0.0.0.0',

    // 调试服务器端口
    serverPort      : 8099,

    // livereload 端口
    livereloadPort  : 35729,

    // 默认打开页面
    serverIndex     : '/html/index.html',

    // 开发文件目录
    app             : './app',

    // 编译文件目录
    dist            : './dist',

    // 打包文件目录
    release         : './release',

    // 需编译 less 文件
    lessFiles       : ['app/less/*.less'],

    // 需编译模版文件
    tmplFiles       : ['app/template/*.html'],

    // 脚本文件
    scriptFiles     : ['app/assets/js/*.js'],

    // 第三方脚本文件
    venforFiles     : ['app/assets/js/vendor/*.js'],

    // bower 脚本文件
    componentsFiles : [],

    // 需监听的 less 文件
    lessFiles4Watch : ['app/less/**/*.less'],

    // 需监听的模版文件
    tmplFiles4Watch : ['app/template/**/*.html', 'app/document/**/*.html'],

    // CSS 文件输出位置
    cssOutputDir    : 'app/assets/css',

    // HTML 文件输出位置
    tmplOutputDir   : 'app/html',

    // Docs 文档模版
    docsTmplFiles   : ['app/document/*.html'],

    // Docs 文档输出位置
    docsOutputDir   : 'app/docs',

    // 启用 rev
    rev             : true,

    // rev 需要拷贝的文件
    revFiles        : [
        'app/assets/**',
        'app/html/**',
        'app/docs/**'
        // 'app/**',
        // '!app/less',
        // '!app/less/**',
        // '!app/template',
        // '!app/template/**',
        // '!app/document',
        // '!app/document/**',
        // '!app/components',
        // '!app/components/**'
    ],

    // rev 需要忽略的文件
    revIgnore       : [
        /^\/favicon.ico$/ig,
        /^\/assets\/js\/vendor\//ig
    ],

    // rev 需要忽略重命名文件
    revIgnoreRename : [
        '.html'
    ],

    // rev 不需要在这个文件检索替换
    revIgnoreSearch : [],

    // rev 不需要更新他的版本的文件
    revIgnoreUpdate : [
        '.html'
    ],

    // FTP 服务器
    ftpHost: 'demo.cdc.im',

    // FTP 账号
    ftpUser: 'mode',

    // FTP 密码
    ftpPass: '',

    // FTP 路径
    // demo.cdc.im 的路径请设置前缀 /domains/demo.cdc.im/public_html/
    ftpPath: '/domains/demo.cdc.im/public_html/testUpload'

}

module.exports = config;
