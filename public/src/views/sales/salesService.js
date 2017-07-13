angular.module('app').service('salesService', function($http){

  this.submitSale = function(sale){
    return $http.post('/api/sales', sale).then(function(response){
      console.log(response)
    })
  }

  this.getSalesSum = function(){
    return $http.get('/api/sales').then(function(response){
      return response.data
    })
  }


})
