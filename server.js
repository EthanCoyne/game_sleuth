/** --- NODE PACKAGE REQUIREMENTS --- **/
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var request = require('request');
var rp = require('request-promise');
var dateFormat = require('dateformat');

/** --- ROUTES REQUIREMENTS --- **/
var user = require('./routes/user');
var APIquery = require('./routes/APIquery')
var gameSearch = require('./routes/gameSearch')
app.use(bodyParser.json());

/** --- MONGOOSE CONNECTION --- **/
mongoose.connect('mongodb://localhost:27017/game_sleuth');

mongoose.connection.on('connected', function () {
  console.log('Sweet connected to database');
});

mongoose.connection.on('error', function () {
  console.log('Bad! not connected to database');
});

/** -- ROUTES -- **/
app.use(express.static('public'));
app.use('/user', user);
app.use('/APIquery', APIquery);
app.use('/gameSearch', gameSearch)

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'views', 'index.html'));
});


app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function (req, res) {
  console.log('Now listening on ', app.get('port'));
});
