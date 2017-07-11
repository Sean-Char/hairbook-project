angular.module('app').controller('mapCtrl', function($scope, mapService, $timeout){

  $timeout(function() {
    mapService.initMap()
    mapService.getSalons(mapService.mapDefault)
      .then(function(response) {
        console.log('get salons:',response)
      })

    mapService.getLocation()
      .then(function(response){
        console.log('get Location:',response)
      })
  }, 100)

  $scope.getGeoCode = function(address) {
    mapService.getLocation(address)
    .then(function(response) {
      if(response.data && response.data.results && response.data.results[0].geometry.location) {
        mapService.getSalons(response.data.results[0].geometry.location)
      }

    })
  }



})
