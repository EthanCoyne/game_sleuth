app.controller('tagController', ['SleuthService', '$location', '$anchorScroll', function(SleuthService, $location, $anchorScroll) {
  console.log('tagController is loaded');

var tagCtrl = this;

tagCtrl.currentUserName = "";
//this holds the list of tags to be displayed in survey page
tagCtrl.tagList = [];

//asks service to query API for inital concept list
tagCtrl.getConceptsFromAPI = function() {
  SleuthService.getConceptsFromAPI().then(function(response) {
    console.log('CONTROLLER API concepts received from service: ', response);
    tagCtrl.tagList = response;
  }).catch(function(err) {
    console.log('CONTROLLER error requesting concepts from service');
  });
}
//grabs list of concept tags from API on page load.
tagCtrl.getConceptsFromAPI();

//scroll area
tagCtrl.goToBottom = function() {
  $location.hash('bottom');

  $anchorScroll();
};

//asks the SleuthService for the current username.
tagCtrl.getUserInfo = function() {
  SleuthService.getUserInfo().then(function(response) {
    console.log('CONTROLLER current user is: ', response.userName);
    tagCtrl.currentUserName = response.userName;
  });
} // end sleuth.getUsername
//calls getUsername on page load
tagCtrl.getUserInfo();

}]); // end tagController
