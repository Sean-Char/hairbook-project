angular.module('app').controller('signupCtrl', function($scope,$state,signupService){

  $scope.signupStylist = function(stylist){
    signupService.submitStylist(stylist).then(response => {
      console.log(response)
      if (response.status === 200){
        $state.go('home')
      }
    })
  }

})
