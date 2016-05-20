module.exports = function(grunt){
    // 项目配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
          scripts: {
            options: {
              baseUrl: "js/app",
              name: "../app",
              out: "js/app-built.js"
            }
          },
          styles: {
            options: {
              optimizeCss: 'standard',
              cssIn: "styles/scss/main.scss",
              out: "styles/scss/built.scss"
            }
          }
        },
        sass: {                              
          dist: {                            
            options: {                       
              style: 'compressed'
            },
            files: {
              'styles/css/built.css': 'styles/scss/built.scss'
            }
            /*files : [{
                    expand : true,
                    cwd : 'styles/scss',
                    src : ['*.scss'],
                    dest : 'styles/css',
                    ext: '.css'
                }]*/
          }
        },
        watch: {
          scripts: {
            files: ['./fragments/*.html', './js/app/*.js', './js/app.js'],
            tasks: ['requirejs:scripts']
          },
          sass: {
            files: ['./styles/scss/*.scss'],
            tasks: ['requirejs:styles','sass']
          },
          livereload: {
            options: {
                livereload: '<%= connect.options.livereload %>'
            },
            files: [
                'index.html',
                'styles/css/built.css',
                'js/app-built.js'
            ]
          }
        },
        connect: {
          options: {
              port: 9000,
              open: true,
              livereload: 35729,
              hostname: 'localhost'
          },
          server: {
            options: {
              port: 9001,
              base: './'
            }
          }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('require', ['requirejs']);
    grunt.registerTask('outputcss', ['sass']);
    grunt.registerTask('do',['requirejs','sass']);
    grunt.registerTask('watchit',['requirejs','sass','connect','watch']);
}