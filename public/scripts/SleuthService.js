app.service('SleuthService', function($http) {
  var currentUser = '';

  this.storeUsername = function(userName) {
    currentUser = userName;
    console.log('ONSERVICE current user is: ', currentUser);
  }


  //this sends the currentUser to the controller
  this.getUsername = function() {
    return new Promise(function(resolve,reject){
      resolve(currentUser);
    });
  }



}); // end SleuthService
