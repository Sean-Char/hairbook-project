angular.module('app').service('mapService', function($http){
    var map;
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

          var markers = []
          var windows = []
        for (var salon of salons) {
          var marker = new google.maps.Marker({
            position: salon.geometry.location,
            title: salon.name,
            map: self.map
          });

          var infoWindow = new google.maps.InfoWindow({
             content: salon.name + "</br>" + salon.rating + " Rating"
          });

          markers.push(marker)
          windows.push(infoWindow)

          marker.addListener('mouseover', function(e){
            console.log("Marker clicked", this)
            for (var i = 0; i < markers.length; i++) {
              if (markers[i].title === this.title) {
                console.log(this.title)
                windows[i].open(map, this)
              }
            }
          });

          marker.addListener('mouseout', function() {
            for (var i = 0; i < markers.length; i++) {
              if (markers[i].title === this.title) {
                console.log(this.title)
                windows[i].close()
              }
            }
          });

        }// end of for loop

        return response
      });
    }


    this.initMap = function() {
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: self.mapDefault
      });

      var marker = new google.maps.Marker({
        position: self.mapDefault,
        map: map
      });

      self.map = map
    }



});
