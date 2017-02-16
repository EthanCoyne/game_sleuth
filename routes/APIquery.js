var express = require('express');
var router = express.Router();
var request = require('request');

var API = "https://www.giantbomb.com/api"
var APIkey = "3f1edf4d108b204cf9ed1583dd3c082ca2514468"

API + "/concepts/?api_key=" + APIkey + '&format=json&limit=10'
//paramaters of API query request
var options = {
  url: 'http://www.giantbomb.com/api/concepts/?api_key=3f1edf4d108b204cf9ed1583dd3c082ca2514468&format=json&limit=10',
  headers: {
    'User-Agent': 'CogentHyena123'},
    json: true
}


//callback function for request
function callback(error, response, body) {
  console.log('response.status_code: ', response.status_code);
  console.log('body of response: ', body);
  console.log('response.results is', response.results);
  if (!error && response.status_code == 1) {
    var info = JSON.parse(body);
    console.log('response from the API: ', info);
  } else {
    console.log('error querying API', error);
    response.statusCode==500;
  }
}

//Querying the API
router.get('/', function(req, res) {
  request(options, callback);

});


module.exports=router;
