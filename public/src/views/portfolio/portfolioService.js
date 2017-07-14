angular.module('app').service('portfolioService', function($http){

  this.submitProfile = function(profile){
    return $http.post('/api/portfolios', profile)
  }

  this.getSignedUrl = function(file) {
    return $http.get(`/api/s3?file_name=${file.name}&file_type=${file.type}`)
  }
   this.uploadFile = function(file, signed_request) {
      return $http.put(signed_request, file, {headers: {'x-amz-acl': 'public-read'}})
   }


   this.getImages = function(){
     return $http.get('/api/images')
     .then(function(response){
       console.log(response);
       return response.data
     })
   }

})
