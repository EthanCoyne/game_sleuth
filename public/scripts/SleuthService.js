app.service('SleuthService', function($http, $q) {
  var currentUser = '';
  var API = "https://www.giantbomb.com/api";
  var APIkey = "3f1edf4d108b204cf9ed1583dd3c082ca2514468";

  //stores tagList to be referenced later without querying API
  var tagList = [];

  //stores list of games in watchlist
  var watchlist = [];

  // var params = {
  //   params: {
  //     api_key: APIkey,
  //     format: "json",
  //     limit: "10"
  //   }
  // }

  // //grabbing initial concept list from API
  // this.getConceptsFromAPI = function () {
  //   return $http({
  //     method: "GET",
  //     url: API + "/concepts/?api_key=" + APIkey + '&format=json&limit=10'
  //   }).then(function(response) {
  //     console.log('response from API: ', response);
  //     return response;
  //   }).catch(function(err) {
  //     console.log('error getting response from API', err);
  //   });
  // }

  // GET request to APIquery router
  this.getConceptsFromAPI = function (tagListLength) {
    return $http({
      method: 'GET',
      url: '/APIquery/' + tagListLength
    }).then(function(response) {
      console.log('response from APIquery route: ', response.data.results);
      response.data.results.forEach(function(tag) {
        tagList.push(tag);
      });
      return response.data.results;
    }).catch(function(err) {
        console.log('error getting response from API', err);
      });
  }// end getConceptsFromAPI

  // GET request for more concepts to APIquery router
  this.getMoreConceptsFromAPI = function (tagListLength) {
    return $http({
      method: 'GET',
      url: '/APIquery/' + tagListLength
    }).then(function(response) {
      console.log('response from APIquery route: ', response.data.results);
      response.data.results.forEach(function(tag) {
        tagList.push(tag);
      });
      return response.data.results;
    }).catch(function(err) {
        console.log('error getting response from API', err);
      });
  } // end getMoreConceptsFromAPI

  //returns existing tagList to the controller
  this.getConceptsFromService = function() {
    return new Promise(function(resolve,reject){
      console.log(tagList);
        resolve(tagList);
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
    var id = "58ab4b433a90d24fe894572e";
    return $http({
      method: "PUT",
      url: "/user/" + id,
      data: game
    }).then(function(response) {
      console.log('POSTing game to DB: ', game);
      return response;
    }).catch(function(err) {
      console.log('error POSTing game to DB: ', err);
    });
  } // end saveToWatchlist

  //remove game from watchlist
  this.removeFromWatchlist = function(game) {
    var id = "58ab4b433a90d24fe894572e";
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

  this.searchGamesByConcept = function(concepts) {
    var promises = [];
    concepts.forEach(function(concept) {
      promises.push($http.get('/gameSearch/' + concept.id))
    });
    return $q.all(promises).then(function(results) {
      console.log('returning all promises from service with ', results);
      //all results will be pushed here
      var totalResults = [];
      results.forEach(function(concepts, status, headers, config) {
        totalResults.push(concepts.data.results.games)
        console.log('concepts: ', concepts, 'status: ', status, 'headers: ', headers, 'config: ', config);
      })
      console.log('totalResults is: ', totalResults);
      // final compared results go here, to be returned to client
      var finalResults = [];

      totalResults[0].forEach(function(game){
        totalResults[1].forEach(function(game2){
          if(game.id == game2.id){
            if(totalResults[2]){
            totalResults[2].forEach(function(game3){
              if(game.id == game3.id){
                finalResults.push(game);
              }
            });
          }
          else{
            finalResults.push(game);
          }
          }
        });
      });
      return finalResults;
    });

      // return $http({
      //   method: "GET",
      //   url: "/gameSearch/" + concept
      // }).then(function(response) {
      //   console.log('SERVICE.searchGamesByConcept received ', response, 'from gameSearch route');
      //   return response.data.results;
      // }).catch(function(err) {
      //   console.log('SERVICE.searchGamesByConcept error receiving results from gameSearch route', err);
      // });

  }



}); // end SleuthService
