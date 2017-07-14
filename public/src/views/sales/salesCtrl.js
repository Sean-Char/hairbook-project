angular.module('app').controller('salesCtrl', function($scope, salesService){

  $scope.submitSales = function(sale){
    salesService.submitSale(sale).then(function(){
      $scope.sale = {};
      $scope.getSalesSum()
    })
  }

  $scope.getSalesSum = function(){
    salesService.getSalesSum().then(function(sales){
      $scope.sales = sales
      console.log($scope.sales)
    })
  }
  $scope.getSalesSum()

})
