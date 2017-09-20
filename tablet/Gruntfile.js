/**
 * Gruntfile.js
 *
 * @author Kevin Hinds @ KevinHinds.com
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *	http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
module.exports = function(grunt) {

	// Project configuration.
	grunt
		.initConfig({
				pkg : grunt.file.readJSON('package.json'),
				uglify : {
					options : {
						banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
						mangle : false
					},					
					build : {
						src : [
								'node_modules/angular/angular.min.js',
								'node_modules/angular-ui-bootstrap/ui-bootstrap.min.js',
								'node_modules/angular-ui-bootstrap/ui-bootstrap-tpls.min.js',
								'build/angular/app.js',
								'build/angular/components/index/index.js',
								'build/angular/shared/controllers/navigation.js',
								'build/angular/shared/directives/scroll.js' ],
						dest : 'js/app.min.js'
					}
				},
				sass : {
					dist : {
						options : {
							style : 'compact'
						},
						files : {
							'css/main.css' : 'build/scss/main.scss',
						}
					}
				},
				cssmin : {
					options : {
						shorthandCompacting : false,
						roundingPrecision : -1
					},
					target : {
						files : {
							'css/bootstrap.min.css' : [ 'node_modules/bootstrap/dist/css/bootstrap.min.css' ],
							'css/font-awesome.min.css' : [ 'node_modules/font-awesome/css/font-awesome.min.css' ],
							'css/main.min.css' : [ 'css/main.css' ]
						}
					}
				}
			});

	// Load the plugins including the file watcher
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	// Run all tasks
	grunt.registerTask('default', [ 'uglify', 'sass', 'cssmin' ]);
};