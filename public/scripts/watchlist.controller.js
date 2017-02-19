app.controller('watchlistController', ['SleuthService', '$location', '$anchorScroll', function(SleuthService, $location, $anchorScroll) {
  console.log('watchCtrl is loaded');

  var watchCtrl = this;

  //watchList will be stored here
  watchCtrl.watchList = [];


// grabs watchlist from DB
  watchCtrl.getWatchlist = function () {
    SleuthService.getWatchlist().then(function(response) {
      console.log('storing watchlist to controller', response);
      watchCtrl.watchlist = response;
    }).catch(function(err) {
      console.log('error getting watchlist', err);
    });
  }// end getWatchlist

//grabs watchlist on page load
watchCtrl.getWatchlist();

  }]); // end controller
