angular.module('app').controller('summaryCtrl', function($scope, salesService){

  $scope.getSalesSum = function(){
    salesService.getSalesSum().then(function(sales){
      $scope.sales = sales
      console.log($scope.sales)
    })
  }
  $scope.getSalesSum()

})
