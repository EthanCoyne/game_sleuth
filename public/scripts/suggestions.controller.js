app.controller('suggestionsController', ['SleuthService', '$location', '$anchorScroll', function(SleuthService, $location, $anchorScroll) {
  console.log('sugCtrl is loaded');
  // console.log('metroid test: ', sugCtrl.metroidData.aliases);
  var sugCtrl = this;

  //searched list of games to display will go here
  sugCtrl.searchResults = [];

  // concepts you searched by are stored here
  sugCtrl.searchedConcepts = [];

//ask the service>>router>>API for games
  sugCtrl.getSearchResults = function() {
    SleuthService.getSearchResults().then(function(objToGet) {
      console.log('searchedConcepts: ', objToGet.searchedConcepts);
      sugCtrl.searchResults = objToGet.gameData;
      sugCtrl.searchedConcepts = objToGet.searchedConcepts;
      console.log('searchResults are: ', objToGet.gameData );
    });
  }

  // //grabs search results from service on page load.
   sugCtrl.getSearchResults();

  //queries the API for game data


//save game from suggestions to the watchlist
  sugCtrl.saveToWatchlist = function (game) {
    SleuthService.saveToWatchlist(game);
  }
}]); // end controller
