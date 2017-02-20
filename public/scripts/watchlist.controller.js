app.controller('watchlistController', ['SleuthService', '$location', '$anchorScroll', function(SleuthService, $location, $anchorScroll) {
  console.log('watchCtrl is loaded');

  var watchCtrl = this;

  //watchList will be stored here
  watchCtrl.watchList = [];


// grabs watchlist from DB
  watchCtrl.getWatchlist = function () {
    SleuthService.getWatchlist().then(function(response) {
      console.log('storing watchlist to controller', response);
      watchCtrl.watchList = response;
    }).catch(function(err) {
      console.log('error getting watchlist', err);
    });
  }// end getWatchlist

//grabs watchlist on page load
watchCtrl.getWatchlist();

//removes game from watchlist
watchCtrl.removeFromWatchlist = function (game) {
  SleuthService.removeFromWatchlist(game).then(function() {
    console.log('CTRL game to be deleted: ', game.name);
  }).catch(function(err) {
    console.log('error removing ', game.name, ' from watchlist', err);
  });
  watchCtrl.getWatchlist();
}

  }]); // end controller
