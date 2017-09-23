/**
 * Main Angular JS App
 * @copyright Kevin Hinds @ KevinHinds.com
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
var MainApp = angular.module('MainApp', ['indexController', 'ui.bootstrap']);

// Intercept POST requests, convert to standard form encoding
MainApp.config([ '$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    $httpProvider.defaults.transformRequest.unshift(function(data, headersGetter) {
	    var key, result = [];
	    for (key in data) {
	        if (data.hasOwnProperty(key)) {
		        if (typeof (data[key]) == "undefined") data[key] = '';
		        result.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
	        }
	    }
	    return result.join("&");
    });
} ]);
