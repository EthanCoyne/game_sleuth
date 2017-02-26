app.controller('suggestionsController', ['SleuthService', '$location', '$anchorScroll', function(SleuthService, $location, $anchorScroll) {
  console.log('sugCtrl is loaded');
  // console.log('metroid test: ', sugCtrl.metroidData.aliases);
  var sugCtrl = this;

  //searched list of games to display will go here
  sugCtrl.searchResults = [];

  // concepts you searched by are stored here
  sugCtrl.searchedConcepts = [];

  // search history is stored here
  sugCtrl.searchHistory = [];

//ask the service>>router>>API for games
  sugCtrl.getSearchResults = function() {
    SleuthService.getSearchResults().then(function(objToGet) {
      console.log('searchedConcepts: ', objToGet.searchedConcepts);
      sugCtrl.searchResults = objToGet.gameData;
      sugCtrl.searchedConcepts = objToGet.searchedConcepts;
      console.log('searchResults are: ', objToGet.gameData );

      //save search to DB
    }).then(function() {
      //array with game.name and game.id to store
      sugCtrl.resultsToStore = [];
      sugCtrl.searchResults.forEach(function(result) {
        sugCtrl.resultsToStore.push(result.id);
      });
    });
  }

  sugCtrl.saveSearch = function() {
    // stops search results storing process if there are no results to save
    if( sugCtrl.searchResults.length == 0) {
      return;
    }
    SleuthService.saveSearch(sugCtrl.resultsToStore, sugCtrl.searchedConcepts);
  }


  // //grabs search results from service on page load.
   sugCtrl.getSearchResults();

  //queries the API for game data


//save game from suggestions to the watchlist
  sugCtrl.saveToWatchlist = function (game) {
    SleuthService.saveToWatchlist(game);
  }

  // //get search history
  // sugCtrl.getSearchHistory = function () {
  //   SleuthService.getSearchHistory().then(function(history) {
  //     sugCtrl.searchHistory = history;
  //   });
  // }
  // //grabs search history on page load
  // sugCtrl.searchHistory();

}]); // end controller
