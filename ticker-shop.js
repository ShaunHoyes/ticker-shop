var https = require("https");
var colors = require('colors');

function printMessage(name, symbol, price) {
  var message = name + " (" + symbol + "): $" + price;
  console.log(message.green);
}

function printError(error) {
  console.error(error.message);
}

function get(ticker) {
  var request = https.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20('" + ticker.toUpperCase() + "')%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json", function(response) {
  var body = "";
  response.on('data', function (chunk) {
    body += chunk;
  });
  response.on('end', function() {
    if(response.statusCode === 200) {
      try {
        var snapshot = JSON.parse(body);
        printMessage(snapshot.query.results.quote.Name, snapshot.query.results.quote.symbol, snapshot.query.results.quote.Ask);
      } catch(error) {
        printError(error);
      }
    } else {
      print({message: "There was an error getting the stock price for " + ticker + ". (" + response.statusMessage + ") "});
    }
  });
  });

  request.on("error", printError);
}

module.exports.get = get;
