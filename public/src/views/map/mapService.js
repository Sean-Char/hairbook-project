angular.module('app').service('mapService', function($http){

    this.mapDefault = {
      lat: 32.777641
    , lng: -96.795974
    }

    this.getLocation = function(address){
      return $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address)
      .then(function(response){
        console.log(response)
        return response
      })
    }

    var self = this;
    this.getSalons = function(location){
      return $http.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=5000&type=beauty_salon&key=AIzaSyAtgOq_TzC-WfK07vK-ZAhinzXV8dvPuJs&location=' + location.lat + ',' + location.lng)
        .then(function(response){
          var salons = response.data.results
          self.map.panTo(location)

        for (var salon of salons) {
          var marker = new google.maps.Marker({
            position: salon.geometry.location,
            title: salon.name,
            map: self.map
          })
        }

        return response

      })
    }


    this.initMap = function() {
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: self.mapDefault
      });
      var marker = new google.maps.Marker({
        position: self.mapDefault,
        map: map
      });

      self.map = map
    }


})
