module.exports = (grunt) ->
    grunt.initConfig
        pkg: grunt.file.readJSON('package.json')
        watch:
            coffeescript:
                files: ['dddemo/frontend/**/*.coffee']
                tasks: ['coffee:compile']
        coffee:
            compile:
                expand: true
                cwd: 'dddemo/frontend/'
                src: ['**/*.coffee']
                dest: 'dddemo/static/js/'
                ext: '.js'



    grunt.loadNpmTasks('grunt-contrib-coffee')
    grunt.loadNpmTasks('grunt-contrib-watch')