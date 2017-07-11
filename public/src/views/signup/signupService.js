angular.module('app').service('signupService', function($http){
  this.submitStylist = function(stylist){
    return $http.post('/api/stylists', stylist)
  }

  this.getStylist = function(){
    return $http.get('/api/stylists').then(response => {
      return response.data
    })
  }

})
