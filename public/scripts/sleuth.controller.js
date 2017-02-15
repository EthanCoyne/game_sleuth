app.controller('sleuthController', function(SleuthService) {
  console.log('sleuthController is loaded');
  var sleuth = this;



  //this grabs the username from the DOM, and stores sends it to SleuthService to be stored in the db
  sleuth.storeUserInfo = function(user) {
    SleuthService.storeUserInfo(user).then(function() {
      console.log('CONTROLLER storing: ', user.userName);
    }).catch(function(err) {
      console.log('CONTROLLER error storing userInfo', err);
    });
  }




}); // end sleuthController
