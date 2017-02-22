var express = require('express');
var router = express.Router();
var request = require('request');
var rp = require('request-promise');

var API = "https://www.giantbomb.com/api"
var APIkey = "3f1edf4d108b204cf9ed1583dd3c082ca2514468"

API + "/concepts/?api_key=" + APIkey + '&format=json&limit=10'
//paramaters of API query request
var options = {
  url: 'http://www.giantbomb.com/api/game/?api_key=3f1edf4d108b204cf9ed1583dd3c082ca2514468&format=json&field_list=site_detail_url,deck,description,developers,franchises,genres,id,images,name,original_game_rating,original_release_date,platforms,publishers,reviews,similar_games,videos',
  headers: {
    'User-Agent': 'CogentHyena123'},
    json: true
}

//Querying the API by concept
router.get('/:concept', function(req, res) {
  var concept = req.params.concept;
  console.log('concept is ', concept);
  options.url = 'http://www.giantbomb.com/api/concept/' + concept + '/?api_key=3f1edf4d108b204cf9ed1583dd3c082ca2514468&format=json&field_list=games';
  rp(options, function(error, response, body) {
    console.log('API query URL: ', options.url);
    if (!error && body.status_code == 1) {
      // var info = JSON.parse(body);
      // console.log('response from the API: ', info);
      console.log('successful API query');
      return body;

    } else {
      console.log('error querying API');
      //response.statusCode=500;
    }
  }).then(function(body) {
    res.send(body);
  });
});

router.get('/gameData/:game', function(req, res) {
  var gameId = req.params.game;
  console.log('game is ', gameId);
  options.url = 'http://www.giantbomb.com/api/game/' + gameId + '/?api_key=3f1edf4d108b204cf9ed1583dd3c082ca2514468&format=json&field_list=site_detail_url,deck,description,developers,franchises,genres,id,images,name,original_game_rating,original_release_date,platforms,publishers,reviews,similar_games,'
  rp(options, function(error, response, body) {
    console.log('API query URL: ', options.url);
    if (!error && body.status_code == 1) {
      // var info = JSON.parse(body);
      // console.log('response from the API: ', info);
      console.log('successful API query');
      return body;

    } else {
      console.log('error querying API');
      //response.statusCode=500;
    }
  }).then(function(body) {
    res.send(body);
  });
});

//querying the API for game data

//QUERY FOR GETTING INDIVIDUAL GAME PAGE
// http://www.giantbomb.com/api/game/[GAMEIDHERE]/?api_key=3f1edf4d108b204cf9ed1583dd3c082ca2514468&format=json&field_list=deck,description,api_detail_url,id,name,platforms,original_game_rating,original_release_date,images,videos,concepts,developers,similar_games,themes




module.exports=router;
