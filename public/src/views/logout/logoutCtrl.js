angular.module('app').controller('logoutCtrl', function($scope){
  $scope.logout = function(session){
    logoutService.logoutUser
  }
})
