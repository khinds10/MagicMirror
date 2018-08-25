<?php
// set timezone
date_default_timezone_set('America/New_York');

// get date time data
$time = date('g:i');
$hour = date('g');
$dayNumber = date('d');
$dayName = date('D');

// produce the json result
$timeResults = array('time' => $time, 'hour' => $hour, 'dayNumber' => $dayNumber, 'dayName' => $dayName);
print json_encode($timeResults);
