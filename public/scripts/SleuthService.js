app.service('SleuthService', function($http) {
  var currentUser = '';

//POST to store user info
  this.storeUserInfo = function(user) {
    currentUser = user.userName;
    return $http({
      method: 'POST',
      url: '/user',
      data: user
    }).then(function(response) {
      console.log('ONSERVICE current user to be stored: ', user);
      return response;
    }).catch(function(err) {
      console.log('ONSERVICE error POSTing to the db', err);
    });
  }


  //this sends the currentUser to the controller from the db
    this.getUserInfo = function() {
    return $http({
      method: 'GET',
      url: '/user'
    }).then(function(response) {
      console.log('SERVICE returning from get request: ', response.data);
      return response.data[0];
    }).catch(function(err) {
      console.log('error getting userInfo on service', err);
    });
  }



}); // end SleuthService
