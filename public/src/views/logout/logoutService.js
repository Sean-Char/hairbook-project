angular.module('app').service('logoutService', function($http){

  this.logoutUser = function(){
    return http.get('/api/logout').then(response){
      return response;
    }
  }

})
