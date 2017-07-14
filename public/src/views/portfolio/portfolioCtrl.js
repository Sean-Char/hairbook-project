angular.module('app').controller('portfolioCtrl', function($scope, portfolioService){

  var url;
   document.getElementById('file-input')
   .addEventListener('change', function(e) {
      console.log(e)
      var file = e.target.files[0]

      portfolioService.getSignedUrl(file)
      .then(function(response) {
         console.log(response)
         url = response.data.url
         return portfolioService.uploadFile(file, response.data.signed_request, response.data.url)
      })
      .then(function(response) {
         console.log(response)
         $scope.imageUrl = url


         $scope.submitPortfolio = function(profile){
           profile.image = url;
           portfolioService.submitProfile(profile).then(function(){
             $scope.profile = {}
           })
         }

      })
   })

   $scope.getImages = function() {
     portfolioService.getImages()
     .then(function(images){
       console.log(images)
       $scope.images = images;
     })
   }

   $scope.getImages()



})
