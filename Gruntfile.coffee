module.exports = (grunt) ->
    grunt.initConfig
        pkg: grunt.file.readJSON('package.json')
        watch:
            coffeescript:
                files: ['djangular/frontend/**/*.coffee']
                tasks: ['coffee:compile']
        coffee:
            compile:
                expand: true
                cwd: 'djangular/frontend/'
                src: ['**/*.coffee']
                dest: 'djangular/static/js/'
                ext: '.js'



    grunt.loadNpmTasks('grunt-contrib-coffee')
    grunt.loadNpmTasks('grunt-contrib-watch')
