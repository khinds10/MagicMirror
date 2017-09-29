#!/usr/bin/python
# Kevin Hinds http://www.kevinhinds.com
# License: GPL 2.0
import datetime as dt
import time, json, string, cgi, subprocess, json
import settings as settings
import Adafruit_DHT
import pprint
pp = pprint.PrettyPrinter(indent=4)
import requests

# Raspberry Pi with DHT sensor - connected to GPIO16 / Pin 36
sensor = sensor = Adafruit_DHT.DHT11
pin = 16

# get current date and time
date=dt.datetime.now()

# get 10 readings and average, in case the humidistat is inaccurate
count, readingCount, avgTemperature, avgHumidity = [ 0, 0, 0, 0 ]
while (count < 10):
    humidity, temperature = Adafruit_DHT.read_retry(sensor, pin)
    print humidity
    print temperature

    if humidity is not None and temperature is not None:
        avgTemperature = avgTemperature + temperature
        avgHumidity = avgHumidity + humidity
        readingCount = readingCount + 1
    count = count + 1
avgTemperature = avgTemperature / readingCount
insideTemperature = int(avgTemperature * 9/5 + 32)
avgHumidity = avgHumidity / readingCount
insideHumidity = int(avgHumidity)

# post to datahub
r = requests.post("http://" + settings.deviceLoggerAPI + "/api/log/", data={'device': 'magic-mirror', 'value1': str(insideTemperature), 'value2': str(insideHumidity)})
print(r.status_code, r.reason)
print(r.text)
