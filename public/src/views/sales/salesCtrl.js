angular.module('app').controller('salesCtrl', function($scope, salesService){

  $scope.submitSales = function(sale){
      sale.date = Date()
    salesService.submitSale(sale).then(function(){
      $scope.sale = {};
    })
  }

  $scope.getSalesSum = function(){
    salesService.getSalesSum().then(function(sales){
      $scope.sales = sales
    })
  }
  $scope.getSalesSum()




})
