app.controller('tagController', function(SleuthService) {
  console.log('tagController is loaded');

var tagCtrl = this;

tagCtrl.currentUserName = "";

//asks the SleuthService for the current username.
tagCtrl.getUserInfo = function() {
  SleuthService.getUserInfo().then(function(response) {
    console.log('CONTROLLER current user is: ', response.userName);
    tagCtrl.currentUserName = response.userName;
  });
} // end sleuth.getUsername
//calls getUsername on page load
tagCtrl.getUserInfo();

}); // end tagController
