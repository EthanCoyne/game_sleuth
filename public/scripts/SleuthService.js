app.service('SleuthService', function($http) {
  var currentUser = '';
  var API = "https://www.giantbomb.com/api";
  var APIkey = "3f1edf4d108b204cf9ed1583dd3c082ca2514468";
  //stores tagList to be referenced later without querying API
  var tagList = [];

  // var params = {
  //   params: {
  //     api_key: APIkey,
  //     format: "json",
  //     limit: "10"
  //   }
  // }

  // //grabbing initial concept list from API
  // this.getConceptsFromAPI = function () {
  //   return $http({
  //     method: "GET",
  //     url: API + "/concepts/?api_key=" + APIkey + '&format=json&limit=10'
  //   }).then(function(response) {
  //     console.log('response from API: ', response);
  //     return response;
  //   }).catch(function(err) {
  //     console.log('error getting response from API', err);
  //   });
  // }

  // GET request to APIquery router
  this.getConceptsFromAPI = function () {
    return $http({
      method: 'GET',
      url: '/APIquery'
    }).then(function(response) {
      console.log('response from APIquery route: ', response.data.results);
      response.data.results.forEach(function(tag) {
        tagList.push(tag);
      });
      return response.data.results;
    }).catch(function(err) {
        console.log('error getting response from API', err);
      });
  }

  // GET request for more concepts to APIquery router
  this.getMoreConceptsFromAPI = function () {
    return $http({
      method: 'GET',
      url: '/APIquery'
    }).then(function(response) {
      console.log('response from APIquery route: ', response.data.results);
      response.data.results.forEach(function(tag) {
        tagList.push(tag);
      });
      return response.data.results;
    }).catch(function(err) {
        console.log('error getting response from API', err);
      });
  }

  //returns existing tagList to the controller
  this.getConceptsFromService = function() {
    return new Promise(function(resolve,reject){
      console.log(tagList);
        resolve(tagList);
      });
  }

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
