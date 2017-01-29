var mqtt = require('mqtt'); //includes mqtt server
// create http request client to consume the QPX API
var request = require("request")

client = mqtt.connect({
        host: '192.168.13.91',
        port: 1883
    }); //connecting the mqtt server with the MongoDB database
client.subscribe("sensors/#"); //subscribing to the topic name
client.subscribe("devices/#"); //subscribing to the topic name
client.on('message', handleMessages); //inserting the event

function handleMessages(topic, message) {
    message = message.toString();
    var splittedTopic = topic.split("/");
    console.log(splittedTopic);
    switch (splittedTopic[0]) {
        case "sensors":
            var json = JSON.parse(message);
            var timestampData = new Date(json.timestamp*1000);
            var requestData = {
              "reading": {
                "data": message,
                "device": json.device,
                "datetime": timestampData
              }
            }
                  console.log("measurement saved on DB " + JSON.stringify(requestData));
                  // QPX REST API URL (I censored my api key)
                  url = "http://192.168.13.91:3001/readings"

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
              //if(err) throw err;
            //});
            break;
        case "devices":
            console.log("device");
            //devices.insert({device:splittedTopic[1], status:message, date:new Date()});
            break;
    }
}
