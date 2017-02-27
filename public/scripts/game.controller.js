app.controller('gameController', ['SleuthService', '$location', '$anchorScroll', '$sce', function(SleuthService, $location, $anchorScroll, $sce) {
  console.log('gameCtrl is loaded');

var gameCtrl = this;
//game to display on dateFormat
gameCtrl.game = {};
gameCtrl.gameHTML = '';

//grab full game from service to display
  gameCtrl.displayGame = function () {
    SleuthService.displayGame().then(function(gameToDisplay) {
      gameCtrl.game = gameToDisplay;
      gameCtrl.gameHTML = $sce.trustAsHtml(gameToDisplay.description);
    });
  }

//displays the game on page load
  gameCtrl.displayGame();

  }]);
