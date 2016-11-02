var snapshot = require("./ticker-shop");
var tickers = process.argv.slice(2);

tickers.forEach(snapshot .get);
