var express = require('express');
var router = express.Router();
var request = require('request');
var rp = require('request-promise');

var API = "https://www.giantbomb.com/api"
var APIkey = "3f1edf4d108b204cf9ed1583dd3c082ca2514468"

API + "/concepts/?api_key=" + APIkey + '&format=json&limit=10'
//paramaters of API query request




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
router.get('/:length', function(req, res) {
  var options = {
    url: 'http://www.giantbomb.com/api/concepts/?api_key=3f1edf4d108b204cf9ed1583dd3c082ca2514468&format=json&field_list=deck,name,id&limit=20&offset=0',
    headers: {
      'User-Agent': 'CogentHyena123'},
      json: true
  }
  console.log('req.params is ', req.params);
  var conceptListLength = req.params;
  switch (conceptListLength['length']){
    case '20':
    options.url = 'http://www.giantbomb.com/api/concepts/?api_key=3f1edf4d108b204cf9ed1583dd3c082ca2514468&format=json&field_list=deck,name,id&limit=20&offset=20';
    break;
    case '40':
    options.url = 'http://www.giantbomb.com/api/concepts/?api_key=3f1edf4d108b204cf9ed1583dd3c082ca2514468&format=json&field_list=deck,name,id&limit=20&offset=40';
    break;
    case '60':
    options.url = 'http://www.giantbomb.com/api/concepts/?api_key=3f1edf4d108b204cf9ed1583dd3c082ca2514468&format=json&field_list=deck,name,id&limit=20&offset=60';
    break;
    case '80':
    options.url = 'http://www.giantbomb.com/api/concepts/?api_key=3f1edf4d108b204cf9ed1583dd3c082ca2514468&format=json&field_list=deck,name,id&limit=20&offset=80';
    break;
    case '100':
    options.url = 'http://www.giantbomb.com/api/concepts/?api_key=3f1edf4d108b204cf9ed1583dd3c082ca2514468&format=json&field_list=deck,name,id&limit=20&offset=100';
    break;
    case '120':
    options.url = 'http://www.giantbomb.com/api/concepts/?api_key=3f1edf4d108b204cf9ed1583dd3c082ca2514468&format=json&field_list=deck,name,id&limit=20&offset=120';
    break;
    case "140":
    options.url = 'http://www.giantbomb.com/api/concepts/?api_key=3f1edf4d108b204cf9ed1583dd3c082ca2514468&format=json&field_list=deck,name,id&limit=20&offset=140';
    break;
    case '0':
    options.url = 'http://www.giantbomb.com/api/concepts/?api_key=3f1edf4d108b204cf9ed1583dd3c082ca2514468&format=json&limit=20'
  }

  rp(options, function(error, response, body) {
     console.log('options being passed to API: ', options);
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

//getting MORE concepts from API


module.exports=router;
