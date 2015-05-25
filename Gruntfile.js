module.exports = function(grunt) {

  'use strict';

  // Loads all grunt tasks from package.json
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Minify JS - https://github.com/gruntjs/grunt-contrib-uglify
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %>.min.js, v<%= pkg.version %>, minified <%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      min: {
        files: {
            'jq-signature.min.js': ['jq-signature.js']
        }
      }
    },

    // Run jshint against JavaScript files - https://github.com/gruntjs/grunt-contrib-jshint
    jshint: {
      //jshintrc: '.jshintrc',
      files: ['Gruntfile.js', 'jq-signature.js']
    },

    // Run a local web server - https://github.com/gruntjs/grunt-contrib-connect
    connect: {
      server: {
        options: {
          port: 8000,
          keepalive: true,
          base: './',
          hostname: '*',
          open: {
            target: 'http://localhost:8000'
          }
        }
      }
    }

  });

  grunt.registerTask('build', ['jshint', 'uglify']);
  grunt.registerTask('serve', ['connect']);

};