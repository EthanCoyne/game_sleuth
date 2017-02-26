app.controller('historyController', ['SleuthService', '$location', '$anchorScroll', function(SleuthService, $location, $anchorScroll) {
  console.log('histController is loaded');

var histCtrl = this;

//search history is stored here
histCtrl.searchHistory = [];

histCtrl.getSearchHistory = function() {
  SleuthService.getSearchHistory().then(function(history) {
    // //concatenated search concept names go here
    // sugCtrl.searches = []
    //list of search options go here

    // history.forEach(function(search) {
    //   sugCtrl.searches.concepts =
    // })
    histCtrl.searchHistory = history;
    console.log('search history returned to histCtrl: ', histCtrl.searchHistory);
  });
}
//gets search history on page load.
histCtrl.getSearchHistory();

//displays full search results
histCtrl.fullSearchResults = function(searchConcepts) {
  console.log('concepts to send for searching: ', searchConcepts);
  SleuthService.searchGamesByConcept(searchConcepts).then(function(response) {
       console.log('search complete');

    }).then(function() {
      $location.path('/suggestions')
    });
}

histCtrl.discardSearch = function (search) {
  SleuthService.discardSearch(search).then(function() {
    histCtrl.getSearchHistory();
  });
}

}]); // end histController
