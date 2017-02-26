// var dateFormat = require('dateformat');

app.service('SleuthService', function($http, $q) {

  var currentUser = '';
  var API = "https://www.giantbomb.com/api";
  var APIkey = "3f1edf4d108b204cf9ed1583dd3c082ca2514468";

  //stores conceptList to be referenced later without querying API
  var conceptList = [];

  //stores list of games in watchlist
  var watchlist = [];

  // final compared results go here, to be returned to client
  var finalResults = [];

  //final detailed gameData goes here to be returned on suggestions page
  var gameData = [];

  // stores the concepts you're currently searching by
  var searchedConcepts = [];

  //search history is stored here
  var searchHistory = [];

  // GET request to APIquery router
  this.getConceptsFromAPI = function (conceptListLength) {
    return $http({
      method: 'GET',
      url: '/APIquery/' + conceptListLength
    }).then(function(response) {
      console.log('response from APIquery route: ', response.data.results);
      response.data.results.forEach(function(tag) {
        conceptList.push(tag);
      });
      return response.data.results;
    }).catch(function(err) {
        console.log('error getting response from API', err);
      });
  }// end getConceptsFromAPI

  // GET request for more concepts to APIquery router
  this.getMoreConceptsFromAPI = function (conceptListLength) {
    return $http({
      method: 'GET',
      url: '/APIquery/' + conceptListLength
    }).then(function(response) {
      console.log('response from APIquery route: ', response.data.results);
      response.data.results.forEach(function(tag) {
        conceptList.push(tag);
      });
      return response.data.results;
    }).catch(function(err) {
        console.log('error getting response from API', err);
      });
  } // end getMoreConceptsFromAPI

  //returns existing conceptList to the controller
  this.getConceptsFromService = function() {
    return new Promise(function(resolve,reject){
      console.log(conceptList);
        resolve(conceptList);
      });
  } // end getConceptsFromService

//POST to store user info
  this.storeUserInfo = function(user) {
    currentUser = user.userName;
    return $http({
      method: 'POST',
      url: '/user',
      data: user
    }).then(function(response) {
      console.log('ONSERVICE current user to be stored: ', user);
      return response;
    }).catch(function(err) {
      console.log('ONSERVICE error POSTing to the db', err);
    });
  } // end storeUserInfo


  //this sends the currentUser to the controller from the db
    this.getUserInfo = function() {
    return $http({
      method: 'GET',
      url: '/user'
    }).then(function(response) {
      console.log('SERVICE returning from get request: ', response.data);
      return response.data[0];
    }).catch(function(err) {
      console.log('error getting userInfo on service', err);
    });
  }

  //retrieve search results to return to sugCtrl
  this.getSearchResults = function () {
    return new Promise(function(resolve,reject){
      console.log('gameData is ', gameData);
      console.log('searchedConcepts are', searchedConcepts);
      var objToSend = {gameData: gameData, searchedConcepts: searchedConcepts}
        resolve(objToSend);
      });
  }

  //send game search query to the server
  this.getGames = function() {
    return $http({
      method: "GET",
      url:"/gameSearch"
    }).then(function(response) {
      console.log('game response from API: ', response.data.results);
      return response.data.results;
    }).catch(function(err) {
      console.log('error in service getGames ', err);
    });
  }// end getGames


//request for watchlist sent to user.js router
  this.getWatchlist = function() {
    return $http({
      method: "GET",
      url: "/user"
    }).then(function(response) {
      console.log('SERVICE getting watchlist from DB', response.data[0].watchlist);
      watchlist = response.data[0].watchlist
      return response.data[0].watchlist;
    }).catch(function(err) {
      console.log('error GETting watchlist on SERVICE ', err);
    });
  }//end getWatchlist

  //saving game from suggestions to watchlist
  this.saveToWatchlist = function(game) {
    // watchlist.push(game);
    var id = "58b1e9b040a0620ed770b962";
    return $http({
      method: "PUT",
      url: "/user/" + id,
      data: game
    }).then(function(response) {
      // console.log('POSTing game to DB: ', game);
      return response;
    }).catch(function(err) {
      console.log('error POSTing game to DB: ', err);
    });
  } // end saveToWatchlist

  //remove game from watchlist
  this.removeFromWatchlist = function(game) {
    var id = "58b1e9b040a0620ed770b962";
    return $http({
      method: "PUT",
      url: "/user/watchlist/" + id,
      data: game
    }).then(function(response) {
      console.log('SERVICE deleting from watchlist: ', game.name);
      return response;
    }).catch(function(err) {
      console.log('SERVICE error deleting ', game.name, 'from watchlist ', err);
    });
  }// end removeFromWatchlist

  //removes saved search from DB
  this.discardSearch = function (search) {
    var id = "58b1e9b040a0620ed770b962";
    return $http({
      method: "PUT",
      url: "/user/discardSearch/" + id,
      data: search
    }).then(function(response) {
      console.log('discarding search from search history');
    }).catch(function(err) {
      console.log('error discarding search from search history');
    })
  }// end discardSearch

  this.searchGamesByConcept = function(concepts) {
    //resuts results to avoid duplicates
    var finalResults = [];
    var promises = [];
    searchedConcepts = concepts;
    concepts.forEach(function(concept) {
      promises.push($http.get('/gameSearch/' + concept.id))
    });
    return $q.all(promises).then(function(results) {
      console.log('returning all promises from service with ', results);
      //all results will be pushed here
      var totalResults = [];
      results.forEach(function(concepts, status, headers, config) {
        totalResults.push(concepts.data.results.games);
        console.log('concepts: ', concepts, 'status: ', status, 'headers: ', headers, 'config: ', config);
      })
      console.log('totalResults is: ', totalResults);


      // compares result arrays against each other to produce final results
      totalResults[0].forEach(function(game){
        totalResults[1].forEach(function(game2){
          if(game.id == game2.id){
            if(totalResults[2]){
              totalResults[2].forEach(function(game3){
                if(game.id == game3.id){
                  finalResults.push(game);
                }
              });
            } else {
              finalResults.push(game);
            }
          }
        });
      });
       return finalResults;
      //sends finalResults back to API to get more detailed data
    }).then(function(finalResults) {
      gamePromises = [];
      finalResults.forEach(function(game) {
        gamePromises.push($http.get('/gameSearch/gameData/' + game.id))
      });
      return $q.all(gamePromises).then(function(results) {
        console.log('returning gamePromises from route with: ', results);
        //detailed game data will go here
        gameData = [];
        results.forEach(function(game) {
          console.log('individual game data is: ', game);
          gameData.push(game.data.results);
          console.log('gameData is: ', gameData);
        });
        return gameData;
      });
    });
  }

  this.saveSearch = function (search, concepts) {
    var objToSave = {
      'searchResults': search,
      'conceptsSearched': concepts
    }

    var id = "58b1e9b040a0620ed770b962";
    return $http({
      method: 'PUT',
      url: '/user/saveSearch/' + id,
      data: objToSave
    }).then(function(response) {
      console.log('ONSERVICE current search to be stored: ', objToSave);
      return response;
    }).catch(function(err) {
      console.log('ONSERVICE error POSTing to the db', err);
    });
  }

  //get search history sugCtrl
  this.getSearchHistory = function () {
    return $http({
      method: 'GET',
      url: '/user'
    }).then(function(response) {
      console.log('search history returned: ', response.data[0].searches);
      return response.data[0].searches;
    }).catch(function(err) {
      console.log('error retrieving search history', err);
    });
  }




}); // end SleuthService
