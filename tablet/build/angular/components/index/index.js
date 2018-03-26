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
        var d = new Date(), months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        console.log('JS date is: ' + d);
        
        $scope.dayNumber = d.getDate();
        $scope.dayOfWeek = days[d.getDay()];
        
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();

        // add a zero in front of numbers<10
        if (m < 10) m = "0" + m;
        
        // adjust for 12 time
        if (h > 12) h = h - 12;
        
        // adjust time sizing based on if there is 4 or 5 characters for the time
        if (h > 9) {
            document.getElementById("time").style.fontSize = "235px";
            document.getElementById("time").style.paddingTop = "25px";
        } else {
            document.getElementById("time").style.fontSize = "270px";
            document.getElementById("time").style.paddingTop = "0px";
        }        
        $scope.time = h + ":" + m
        
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
            $scope.insideTemp = response.data.mirror.value1;
            $scope.insideHmdty = response.data.mirror.value2;
            $scope.bedroomTemp = response.data.bedroom.value1;
            $scope.bedroomHmdty = response.data.bedroom.value2;
            $scope.livingroomTemp = response.data.livingroom.value1;
            $scope.livingroomHmdty = response.data.livingroom.value2;
	    });
	
        // loop the clock function every 3 minutes
        setTimeout(function () {
            $scope.getWeatherConditions();
        }, 180000);
	};
    $scope.getWeatherConditions();
}]);
