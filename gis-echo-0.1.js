var express = require('express');
var app = express();

var trip = require('trip');
var instructionEditor = require('gisecho-instruction-editor');

app.use('/trip', trip);
app.use('/instruction-editor', instructionEditor);
app.use(express.static('node_modules/bootstrap'));
app.use(express.static('public'));

var server = app.listen(1080, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
