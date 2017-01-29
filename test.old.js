// create http request client to consume the QPX API
var request = require("request")

// JSON to be passed to the QPX Express API
device_data = JSON.stringify({
  "device": "18fe34f3632f",
  "timestamp": 1476204342,
  "temperature": 23,
  "humidity": 57.1,
  "runned": 20,
  "heap": 35600
})
var requestData = {
  "reading": {
    "data": device_data,
    "device_uid": "18fe34f3632f",
    "datetime": "1999-01-08 04:05:06"
  }
}

// QPX REST API URL (I censored my api key)
url = "http://localhost:3000/readings"

// fire request
request({
    url: url,
    method: "POST",
    json: true,
    headers: {
        "content-type": "application/json",
    },
    body: requestData
}, function (error, response, body) {
    if (!error && response.statusCode === 200) {
        console.log(body)
    }
    else {

        console.log("error: " + error)
        console.log("response.statusCode: " + response.statusCode)
        console.log("response.statusText: " + response.statusText)
    }
})
