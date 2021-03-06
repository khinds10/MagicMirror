<?php
/**
 * PHP cURL call to return JSON response to Javascript
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
require 'config.php';

// get the results for the 3 devices
$livingRoomConditions = json_decode(cURL("http://{$deviceHubAPI}/api/read/?device=weather-clock"));
$bedroomConditions = json_decode(cURL("http://{$deviceHubAPI}/api/read/?device=weather-clock-white"));
$samsRoomConditions = json_decode(cURL("http://{$deviceHubAPI}/api/read/?device=weather-clock-red"));
$guestRoomConditions = json_decode(cURL("http://{$deviceHubAPI}/api/read/?device=weather-clock-yellow"));
$basementConditions = json_decode(cURL("http://{$deviceHubAPI}/api/read/?device=weather-clock-gray"));
$kitchenConditions = json_decode(cURL("http://{$deviceHubAPI}/api/read/?device=weather-clock-small-white"));

// get the most recent result and encode as JSON for the magic mirror to display
$conditionsResults = array();

$conditionsResults['livingroom'] = array();
if (isset($livingRoomConditions[0])) $conditionsResults['livingroom'] = $livingRoomConditions[0];

$conditionsResults['bedroom'] = array();
if (isset($bedroomConditions[0])) $conditionsResults['bedroom'] = $bedroomConditions[0];

$conditionsResults['sam'] = array();
if (isset($samsRoomConditions[0])) $conditionsResults['sam'] = $samsRoomConditions[0];

$conditionsResults['guest'] = array();
if (isset($guestRoomConditions[0])) $conditionsResults['guest'] = $guestRoomConditions[0];

$conditionsResults['basement'] = array();
if (isset($basementConditions[0])) $conditionsResults['basement'] = $basementConditions[0];

$conditionsResults['kitchen'] = array();
if (isset($kitchenConditions[0])) $conditionsResults['kitchen'] = $kitchenConditions[0];

// get humidity and temp color for output
$conditionsResults['kitchen']->tempColor = cURL("http://{$temperatureColorAPI}/?temperature=" . $conditionsResults['kitchen']->value1);
$conditionsResults['kitchen']->humidityColor = cURL("http://{$temperatureColorAPI}/humidity?humidity=" . $conditionsResults['kitchen']->value2);
echo json_encode($conditionsResults, JSON_PRETTY_PRINT);

/**
 * get the response from the API to send to the JS 
 * @param strong $URL
 * @return string, JSON encoded webservice response
 */
function cURL($URL) {

    // is cURL installed yet?
    if (!function_exists('curl_init')) die('Sorry cURL is not installed!');
    
    // download response from URL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $URL);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $output = curl_exec($ch);
    curl_close($ch);
    return $output;
}
