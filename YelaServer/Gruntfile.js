module.exports = function (grunt) {
    //Load the Grunt plugins.
    // dùng matchdep để auto load NPM Task
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Project config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        cssmin: {
            sitecss: {
                options: {
                    banner: '/* Min css */'
                }, files: {
                    'public/dist/css/site.min.css': [
                        'public/client/css/animate.css',
                        'public/client/css/style.css',
                    ]
                }
            }
        }
    });

    // Resister the default tasks.
    grunt.registerTask('default', ['cssmin']);
};