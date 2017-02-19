app.controller('suggestionsController', ['SleuthService', '$location', '$anchorScroll', function(SleuthService, $location, $anchorScroll) {
  console.log('sugCtrl is loaded');
  // console.log('metroid test: ', sugCtrl.metroidData.aliases);
  var sugCtrl = this;

  //searched list of games will go here
  sugCtrl.gameList = [];


  sugCtrl.getGames = function() {
    SleuthService.getGames().then(function(response) {
      sugCtrl.gameList = response;
    });
  }
}]); // end controller
