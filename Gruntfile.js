// Gruntfile.js

//variables
var SRC = 'src/',
	SRC_LAYOUTS = SRC + 'layouts/',
	SRC_PAGES = SRC + 'pages/',
	SRC_PARTIALS = SRC + 'partials/',
	SRC_LESS = SRC + 'less/',
	SRC_IMG = SRC + 'img/',
	SRC_JS = SRC + 'js/',
	SRC_DATA = SRC + 'data/',
	SRC_LIBS = SRC + 'libs/',
	TARGET = 'web/',
	TARGET_CSS = TARGET + 'css/',
	TARGET_JS = TARGET + 'js/',
	TARGET_IMG = TARGET + 'img/';
	TARGET_LIBS = TARGET + 'libs/';


//tasks
module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //concatenate javascript
        concat: {
	    	options: {
	    		separator: ';'
	    	},
	    	dist: {
	    		src: [ SRC + '/**/*.js' ],
	    		dest: TARGET_JS + '<%= pkg.name %>.js'
	      	}
	    },

	    //uglify javascript
	    uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			production: {
				files: {
				  '<%= concat.dist.dest %>': ['<%= concat.dist.dest %>']
				}
			},
			development: {   
				options: {
					beautify : true 
				},   
				files : {
					'<%= concat.dist.dest %>': ['<%= concat.dist.dest %>']
				}
			}
	    },

	    //assemble handlebars templates
        assemble: {
            options: {
                layout: SRC_LAYOUTS + 'default.hbs',
                partials: [SRC_PARTIALS + '/**/*.hbs' ],
                data: SRC_DATA + '*.json',
                flatten: true
            },
            pages: {
                files: {
                    'web/': [ SRC_PAGES +'*.hbs' ]
                }
            }
        },
        clean: {
			all: ['web/*.html']
		},
		//minify less files
		less: {
			production: {
				options: {
					paths: ["src/less"],
					yuicompress: true,
					compress: true
				},
				files: {
					"web/css/style.css": SRC_LESS + "main.less"
				}
			},
			development: {
				options: {
					paths: ["src/less"]
				},
				files: {
					"web/css/style.css": SRC_LESS + "main.less"
				}
			}
		},
		//minify html files in web directory
		htmlmin: {                                     
		    dist: {                                       
		      options: {                                  
		        removeComments: true,
		        collapseWhitespace: true
		      },
		      files: [{
		          expand: true,      
		          cwd: TARGET,       
		          src: '*.html',  
		          dest: TARGET,    
		      }],
		    }
	  	},

	  	imagemin: {                           
		    dist: {                            
		      options: {                       
		        optimizationLevel: 3
		      },
		      files: [{
		          expand: true,      
		          cwd: SRC_IMG,       
		          src: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif'],   
		          dest: TARGET_IMG,    
		      }],
		    }
		},
		watch: {
			files: [ SRC + '**/*'],
			tasks: ['default'],
		},
		copy: {
			main: {
				files: [
					// includes files within path and its sub-directories
					{expand: true, src: [SRC_LIBS+'**'], dest: TARGET_LIBS}
				]
			}
		}
	}
    );

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('assemble');

    // Default task.
  	grunt.registerTask('default', ['build', 'watch']);

  	grunt.registerTask('build-production', ['build']);

    grunt.registerTask('build', ['concat', 'uglify:production', 'clean', 'less:production', 'assemble', 'htmlmin', 'imagemin', 'copy']);

    grunt.registerTask('build-development', ['concat', 'uglify:development', 'clean', 'less:development', 'assemble', 'copy']);


};