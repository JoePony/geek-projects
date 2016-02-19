module.exports = function(grunt) { //模块化方式导出
    // var ssInclude = require("connect-include");
    grunt.initConfig({ //配置任务
        pkg: grunt.file.readJSON('package.json'), //从package.json 文件读入项目配置信息，并存入pkg属性
        uglify: { //压缩任务
            options: { // 此处定义的banner注释将插入到输出文件的顶部
                banner: '/*!create by <%= grunt.template.today("yyy-mm-dd") %>*/\n'
            },
            my_target: {
                files: {
                    'js/index.min.js': ['js/index.js']
                }
            }
        },
        less: {
            development: {
                // options: {
                //     paths: ["assets/css"]
                // },
                options: {
                    yuicompress: true
                },
                files: [{
                    expand: true,
                    cwd: './css',
                    src: ['*.less'],
                    dest: './css',
                    ext: '.css'
                }]
            },
        },
        cssmin: {
            minify: {
                expand: true, // 启用下面的选项
                cwd: './css', // 指定待压缩的文件路径
                src: ['*.css', '!*.min.css'], // 匹配相对于cwd目录下的所有css文件(排除.min.css文件)
                dest: './css', // 生成的压缩文件存放的路径
                ext: '.min.css' // 生成的文件都使用.min.css替换原有扩展名，生成文件存放于dest指定的目录中
            }
        },
        watch: { //观察任务
            files: ['js/index.js', 'css/*.css', 'css/*.less'],
            tasks: ['uglify', 'less', 'cssmin']
        }
    });
    // /* 加载所需要的Grunt插件,提前全部通过npm安装好 */
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // /* 设置了一些task。最重要的是default任务 */
    grunt.registerTask('default', ['uglify', 'less', 'cssmin', 'watch']);
};
