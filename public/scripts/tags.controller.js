app.controller('tagController', ['SleuthService', '$location', '$anchorScroll', function(SleuthService, $location, $anchorScroll) {
  console.log('tagController is loaded');

var tagCtrl = this;

tagCtrl.currentUserName = "";
//this holds the list of tags to be displayed in survey page
tagCtrl.tagList = [];
//currently selected tags will be saved here
tagCtrl.currentlySelectedTags=[];
//results of game search by concepts go here. an array of arrays containing game results
tagCtrl.gameSearchResults = [];


//asks service to query API for inital concept list
tagCtrl.getConceptsFromAPI = function() {
  SleuthService.getConceptsFromAPI(tagCtrl.tagList.length).then(function(response) {
    console.log('CONTROLLER API concepts received from service: ', response);
    tagCtrl.tagList = response;
  }).catch(function(err) {
    console.log('CONTROLLER error requesting concepts from service');
  });
}

//gets taglist from service without querying the API
tagCtrl.getConceptsFromService = function() {
  SleuthService.getConceptsFromService().then(function(response) {
    tagCtrl.tagList = response;
  });
}


//asks service to query API for MORE concepts
tagCtrl.getMoreConceptsFromAPI = function() {
  SleuthService.getMoreConceptsFromAPI(tagCtrl.tagList.length).then(function(response) {
    console.log('CONTROLLER API concepts received from service: ', response);
    response.forEach(function(concept) {
      tagCtrl.tagList.push(concept);
    })
  }).catch(function(err) {
    console.log('CONTROLLER error requesting concepts from service');
  });
}
//get concepts from API on page load
tagCtrl.getConceptsFromAPI();

// //grabs list of concept tags from API on page load.
// tagCtrl.getConceptsFromService();

//scroll area
tagCtrl.goToBottom = function() {
  $location.hash('bottom');

  $anchorScroll();
};

//on click of tag button, adds tag to currentlySelectedTags to use as search params
tagCtrl.selectThisTag = function (tag) {
  console.log('selected tag is: ', tag);
  if (tagCtrl.currentlySelectedTags.length == 3) {
    return;
  }
  tagCtrl.currentlySelectedTags.push(tag);
}

//removes a selected tag from currentlySelectedTags
tagCtrl.removeTag = function (tagIndex) {
  console.log(tagCtrl.currentlySelectedTags);
  tagCtrl.currentlySelectedTags.splice(tagIndex, 1)
  console.log(tagCtrl.currentlySelectedTags);
}

//asks the SleuthService for the current username.
tagCtrl.getUserInfo = function() {
  SleuthService.getUserInfo().then(function(response) {
    console.log('CONTROLLER current user is: ', response.userName);
    tagCtrl.currentUserName = response.userName;
  });
} // end sleuth.getUsername
//calls getUsername on page load
tagCtrl.getUserInfo();


//Search query with multiple concepts
  tagCtrl.searchGamesByConcept = function() {
    SleuthService.searchGamesByConcept(tagCtrl.currentlySelectedTags).then(function(response) {
        console.log('CTRL returned search results: ', response);
        tagCtrl.gameSearchResults = response;
      }).catch(function(err) {
        console.log('CTRL error searching by concept ', err);
      });
  } // end searchGamesByConcept


}]); // end tagController
