app.controller('sleuthController', function(SleuthService) {
  console.log('sleuthController is loaded');
  var sleuth = this;

  //username will be stored here, to be used across controllers
  sleuth.userName = "";

  //this grabs the username from the DOM, and stores it in SleuthService
  sleuth.storeUsername = function(userName) {
    SleuthService.storeUsername(userName).then(function() {
      console.log('CONTOLLER sending ', userName, ' to the service');
    });
  }

  //asks the SleuthService for the current username.
  sleuth.getUsername = function() {
    SleuthService.getUsername().then(function(response) {
      console.log('CONTROLLER current user is: ', response);
      sleuth.userName = response;
    });
  } // end sleuth.getUsername
  //calls getUsername on page load
  sleuth.getUsername();


}); // end sleuthController
