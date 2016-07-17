require('./globals');

var path = require('path');
var express = require('express');
var compression = require('compression');
var cookieParser = require('cookie-parser');

var app = express();
app.use(compression());
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), 'public')));

var router = express.Router();

/** CATCH-ALL ROUTE FOR MAIN ROUTER **/
app.get('*', function(req, res, next) {
  renderHTML(req, res, next);
});

var server = app.listen(process.env.PORT, function() {
  try {
    process.send('CONNECTED');
  } catch(e) {}
});

process.on('uncaughtException', function(err) {
  console.log(arguments);
  process.exit(-1);
});
