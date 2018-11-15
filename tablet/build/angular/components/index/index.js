/**
 * IndexController
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
var indexController = angular.module("indexController", []);

// indoor conditions weather page controller
indexController.controller("indoorConditionsController", [ '$scope', '$http', '$interval', '$location', function($scope, $http, $interval, $location) {

    // start the date time clock running by setTimeout every 2 seconds
    $scope.startTime = function() {
    
        // get time from server with date info
    	$http({
	        url : '/server/time.php',
	        method : "GET",
	        data : {}
	    }).then(function(response) {
            $scope.dayNumber = response.data.dayNumber;
            $scope.dayOfWeek = response.data.dayName;
            $scope.time = response.data.time;
            $scope.hour = response.data.hour;
	    });
                
        // loop the clock function every 2 seconds
        setTimeout(function () {
            $scope.startTime();
        }, 2000);
    };
    $scope.startTime();
    
    // get current devices conditions from the device HUB configured API
    $scope.getWeatherConditions = function() {
	    $http({
	        url : '/server/conditions.php',
	        method : "GET",
	        data : {}
	    }).then(function(response) {
	        $scope.conditionsData = response.data;
	    });
	
        // loop the clock function every 3 minutes
        setTimeout(function () {
            $scope.getWeatherConditions();
        }, 180000);
	};
    $scope.getWeatherConditions();
}]);
