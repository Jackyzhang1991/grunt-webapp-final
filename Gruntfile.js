// Generated on 2016-10-28 using
// generator-webapp-uncss 0.1.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Configurable paths
  var config = {
    app: 'app',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],            //指定需要监听的文件
        tasks: ['wiredep']                //修改后需要执行的task
      },
      js: {
        files: ['<%= config.app %>/scripts/{,*/}*.js'],
        tasks: ['jshint'],              //书写是否符合规范
        options: {
          livereload: true              //true即为在当前端口刷行,也可指定端口号
        }
      },
      jstest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['test:watch']
      },
      gruntfile: {
        files: ['Gruntfile.js']         //有修改时会在控制台显示
      },
      sass: {
        files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['sass:server', 'autoprefixer']
      },
      styles: {
        files: ['<%= config.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']          //newer: -->只对新的或修改过的文件执行task
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'       //使用变量引用的方式获取端口号
        },
        files: [                                          //有变化时不执行额外task直接reload页面
          '<%= config.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= config.app %>/images/{,*/}*'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        open: true,                       //默认自动打开浏览器
        livereload: 35729,            //在35729端口刷新的功能（需和watch的配置项[用于监控JS代码有无改动,改动了就调用livereload]配合)-->实现边修改边
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'                   //default value of hostname
      },
      livereload: {
        options: {
          middleware: function(connect) {       //connect以形参的形式传入
            return [
              connect.static('.tmp'),       //将.tmp下的文件添加到根目录
              connect().use('/bower_components', connect.static('./bower_components')),     //添加到根目录下的bower_components中
              connect.static(config.app)
            ];
          }
        }
      },
      test: {           //与livereload相似,区别在于新增test目录和端口号改为9001
        options: {
          open: false,
          port: 9001,
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      },
      dist: {
        options: {
          base: '<%= config.dist %>',
          livereload: false
          /*keeplive:true*/
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'            //用于无destination的文件删除.tmp文件夹
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')             //通过指定reporter输出样式
      },
      all: [                                             //指定哪些文件需要校验
        'Gruntfile.js',
        '<%= config.app %>/scripts/{,*/}*.js',
        '!<%= config.app %>/scripts/vendor/*',          //排除第三方的库和框架
        'test/spec/{,*/}*.js'
      ]
    },

    // Mocha testing framework configuration options
    mocha: {          //只被展示一次不同于浏览器会多次输出
      all: {
        options: {
          run: true,              //默认false,为true是会执行mocha.run();若为false会触发timeout错误;支持多次运行;当测试用例为异步代码时会设为false
          urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
          //指定访问那个url来执行测试内容,由于grunt-mocha是基于Phantom所以测试过程不会显示在浏览器中,只显示在命令行中,可通过设置watch来使其显示在浏览器中
        }
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    sass: {
      options: {
        loadPath: 'bower_components'
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      },
      server: {                 //把指定的scss/sass的文件进行编译并输出到指定目录
        files: [{
          expand: true,
          cwd: '<%= config.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the HTML file
    wiredep: {
      app: {
        ignorePath: /^\/|\.\.\//,                           //用于忽略路径,由于在之后的grunt处理时他们为同级文件结构
        src: ['<%= config.app %>/index.html'],              //指定需要处理的文件
        exclude: ['bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js']   //排除指定文件,防止重复引用
      },
      sass: {
        src: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= config.dist %>/scripts/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css',
            '<%= config.dist %>/images/{,*/}*.*',
            '<%= config.dist %>/styles/fonts/{,*/}*.*',
            '<%= config.dist %>/*.{ico,png}'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '/index.html',        //指定src
      options: {
        dest: '',               //输出目录
        flow: {
          html: {
            steps: {
              // Disabled as we'll be using a manual
              // cssmin configuration later. This is
              // to ensure we work well with grunt-uncss
              // css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: [             //查看哪些被引用文件,是否有对应的重命名文件
          '<%= config.dist %>',
          '<%= config.dist %>/images',
          '<%= config.dist %>/styles'
        ]
      },
      html: ['<%= config.dist %>/{,*/}*.html'],           //处理html文件
      css: ['<%= config.dist %>/styles/{,*/}*.css']       //处理css文件
    },

     uncss: {
      dist: {
        options: {
          // Take our Autoprefixed stylesheet main.css &
          // any other stylesheet dependencies we have..
          stylesheets: [
            '../.tmp/styles/main.css',

          ],
          // Ignore css selectors for async content with complete selector or regexp
          // Only needed if using Bootstrap
          ignore: [/dropdown-menu/,/\.collapsing/,/\.collapse/]
        },
        files: {
          '.tmp/styles/main.css': ['<%= config.app %>/index.html']
        }
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,        //去掉属性值
          collapseWhitespace: true,               //用于清除空格除了script,style,pre,textarea
          conservativeCollapse: true,             //>=1个空格会被压缩为一个空格即连续空格===一个空格
          removeAttributeQuotes: true,            //除去引号
          removeCommentsFromCDATA: true,          //去掉script和style中的注释
          removeEmptyAttributes: true,            //删除值为空的html属性（包括空格个换行符/n）
          removeOptionalTags: true,               //移除可选的结束符如<html>,<head>等等
          removeRedundantAttributes: true,        //移除重复的属性定义   e.g.  <input type="text"  />   -->   <input />
          useShortDoctype: true                   //使用短DOCTYPE即html5
        },
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          src: '{,*/}*.html',
          dest: '<%= config.dist %>'
        }]
      }
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care
    // of minification. These next options are pre-configured if you do not
    // wish to use the Usemin blocks.
     cssmin: {
       dist: {
         files: {
           '<%= config.dist %>/styles/main.css': [
             '.tmp/styles/{,*/}*.css'
           ]
         }
       }
     },

/*   uglify: {
     options:{
       sourceMap: true                //用于生成.map文件,chrome通过.map文件使压缩的文件恢复成源文件以便调试;默认为false
     },
       dist: {
         files: {
           '<%= config.dist %>/scripts/scripts.js': [
             '<%= config.dist %>/scripts/scripts.js'
           ]
         }
       }
     },*/

/*     concat: {
       options: {
         separator: ';'
       },
       dist: {
         src: ['<%= config.app %>/scripts/main.js','<%= config.app %>/scripts/main2.js','<%= config.app %>/scripts/main3.js'],
         dest: ['<%= config.dist %>/scripts/vendor/concated.js']
       }
     },*/

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            'images/{,*/}*.webp',       //webp是谷歌推出的图片格式,该格式能有效进行压缩又不影响兼容的图片清晰度;*.webp和*/*.webp
            '{,*/}*.html',
            'styles/fonts/{,*/}*.*'
          ]
        }, {
          src: 'node_modules/apache-server-configs/dist/.htaccess',       //apache的配置文件
          dest: '<%= config.dist %>/.htaccess'
        }, {
          expand: true,
          dot: true,
          cwd: '.',
          src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',       //bootstrap的字体
          dest: '<%= config.dist %>'
        }]
      },
      styles: {                       //把css文件进行转移
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Generates a custom Modernizr build that includes only the tests you
    // reference in your app
    modernizr: {
      dist: {
        devFile: 'bower_components/modernizr/modernizr.js',       //指定本地的Modernizr的路径
        outputFile: '<%= config.dist %>/scripts/vendor/modernizr.js',       //输出路径
        files: {
          src: [                      //缩小范围
            '<%= config.dist %>/scripts/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css',
            '!<%= config.dist %>/scripts/vendor/*'            //排除第三方文件
          ]
        },
        uglify: true                          //压缩,所以不用在usemin中处理css文件
      }
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: [
        'sass:server',
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'sass',
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    }
  });


  grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function (target) {  //target is the parameter of the function
    if (grunt.option('allow-remote')) {            //grunt serve --allow-remote --> allow other machine in the same network access using ip address
      grunt.config.set('connect.options.hostname', '0.0.0.0');
    }
    if (target === 'dist') {              //在本地查看部署后的效果
      return grunt.task.run(['build', 'connect:dist:keepalive']);
      //grunt task:abc:def=this.flags{abc:true,def:true}这里grunt会在task的注册函数中this.flags;this.flags.keepalive-->options.keepalive-->default(false)
      //the reason the default value is false for test usage. auto close the browser after test.
    }

    grunt.task.run([
      'clean:server',             //先把.tmp文件夹清空
      'wiredep',                  //用于自动运行bower代替手动输入多条代码
      'concurrent:server',        //用于并行（用于执行无先后依赖关系的tasks）执行1.把scss/sass文件变为css并复制2.把css文件复制
      'autoprefixer',             //自动添加用户所使用浏览器的厂商前缀(在转化为css文件的时候)  运行时grunt sass+ grunt autoprefixer
      'connect:livereload',       //在本地起服务器,同步修改及修改路径(livereload)==在JS文件里手动插入代码进行刷新
      'watch'                     //监听本地文件的修改
    ]);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('test', function (target) {
    if (target !== 'watch') {      //target为watch时先执行三个前置task
      grunt.task.run([
        'clean:server',           //清空.tmp目录
        'concurrent:test',        //只拷贝css文件
        'autoprefixer'            //加上厂商前缀
      ]);
    }

    grunt.task.run([
      'connect:test',
      'mocha'                   //运行测试
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',            //自动引入bower管理的从第三方引入的js和css
    'useminPrepare',      //读取HTML文件为usemin服务;根据html中的注释来生成合并压缩等配置（即生成其generated的动态task）
    'concurrent:dist',    //并行4个任务
    'autoprefixer',       //加厂商前缀
/*    'uncss',              //removing unused CSS from your projects*/
    'cssmin',             //css压缩
/*  'concat',             //合并/默认由useminPrepare动态生成的当然也可以手动编译
    'uglify',             //js压缩*/
    'copy:dist',          //是各种文件进入dist目录
    'modernizr',          //检测是否支持html5和css3--grunt modernizr会根据你的project输出一个定制版的modernizr以提高网站性能
    'rev',                //MD5计算(只与文件内容有关),需要配合usemin用才能使其输出到正确的路径；用于代替time stamp来保持文件实时更新
    'usemin',             //通过useminPrepare的配置和rev来实现覆盖功能；使原来引用这些文件的文件能正常使用  1.替换useminPrepare里配置文件的路径（build-end build）2.查看以外部分
    'htmlmin'             //用于html的文件压缩,去除多余空格什么的
    //rev需要配合usemin用才能使其输出到正确的路径；就像bower要配合着wiredep用一样
  ]);

  grunt.registerTask('default', [
    'newer:jshint',             //只对新的或变化的文件进行jshint--检查语法和规范
    'test',                     //引用组合task--test
    'build'
  ]);
};
