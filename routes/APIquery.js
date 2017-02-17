var express = require('express');
var router = express.Router();
var request = require('request');
var rp = require('request-promise');

var API = "https://www.giantbomb.com/api"
var APIkey = "3f1edf4d108b204cf9ed1583dd3c082ca2514468"

API + "/concepts/?api_key=" + APIkey + '&format=json&limit=10'
//paramaters of API query request
var options = {
  url: 'http://www.giantbomb.com/api/concepts/?api_key=3f1edf4d108b204cf9ed1583dd3c082ca2514468&format=json&limit=100',
  headers: {
    'User-Agent': 'CogentHyena123'},
    json: true
}


//callback function for request
// var callback = function(error, response, body) {
//   // console.log('body of response: ', body);
//   if (!error && body.status_code == 1) {
//     // var info = JSON.parse(body);
//     // console.log('response from the API: ', info);
//     console.log('successful API query');
//     response.send(body);
//
//   } else {
//     console.log('error querying API', error);
//     response.statusCode==500;
//   }
// }

//Querying the API
router.get('/', function(req, res) {
  rp(options, function(error, response, body) {
    // console.log('body of response: ', body);
    if (!error && body.status_code == 1) {
      // var info = JSON.parse(body);
      // console.log('response from the API: ', info);
      console.log('successful API query');
      return body;

    } else {
      console.log('error querying API', error);
      response.statusCode==500;
    }
  }).then(function(body) {
    res.send(body);
  });

});


module.exports=router;
