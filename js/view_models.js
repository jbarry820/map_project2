"use strict";

var apiaryArray = [
          {
        "type":"Apiary",
        "geometry":{"type":"Point","coordinates":[33.165388,-87.739671]},
        "fieldName":"Long North",
        "owner":"Jim Barry",
        "photosetId":"72157679042637670",
        "pictureId":"732389792544"
      },

      {
        "type":"Apiary",
        "geometry":{"type":"Point","coordinates":[33.162907,-87.7428645]},
        "fieldName":"Long South",
        "owner":"Jim Barry",
        "photosetId":"72157679042637670",
        "pictureId":"33192279116"
      },
      {
        "type":"Apiary",
        "geometry":{"type":"Point","coordinates":[33.154356,-87.740085]},
        "fieldName":"Bailey",
        "owner":"Jim Barry",
        "photosetId":"72157679042637670",
        "pictureId":"32768300252"
      },
      {
        "type":"Apiary",
        "geometry":{"type":"Point","coordinates":[33.162621,-87.735356]},
        "fieldName":"Acorn Tree",
        "owner":"Jim Barry",
        "photosetId":"72157679042637670",
        "pictureId":"32921608095"
      },
      {
        "type":"Apiary",
        "geometry":{"type":"Point","coordinates":[33.170098,-87.737866]},
        "fieldName":"Money Field",
        "owner":"Jim Barry",
        "photosetId":"72157679042637670",
        "pictureId":"32767381152"
      },
      {
        "type":"Apiary",
        "geometry":{"type":"Point","coordinates":[33.157510,-87.291977]},
        "fieldName":"Chris",
        "owner":"Jim Barry",
        "photosetId":"72157679042637670",
        "pictureId":"32162511703"
      },
      {
        "type":"Apiary",
        "geometry":{"type":"Point","coordinates":[33.103980,-87.469994]},
        "fieldName":"Jamey Shows",
        "owner":"Jim Barry",
        "photosetId":"72157679042637670",
        "pictureId":"32822533512"
      },
      {
        "type":"Apiary",
        "geometry":{"type":"Point","coordinates":[33.072128,-87.665066]},
        "fieldName":"Bunn",
        "owner":"Jim Barry",
        "photosetId":"72157679042637670",
        "pictureId":"32869719971"
      },
      {
        "type":"Apiary",
        "geometry":{"type":"Point","coordinates":[33.051425,-87.715746]},
        "fieldName":"Home Side Field",
        "owner":"Jim Barry",
        "photosetId":"72157679042637670",
        "pictureId":"32155278284"
      },
      {
        "type":"Apiary",
        "geometry":{"type":"Point","coordinates":[33.051000,-87.715650]},
        "fieldName":"Home Front",
        "owner":"Jim Barry",
        "photosetId":"72157679042637670",
        "pictureId":"32155123374"
      },
      {
        "type":"Apiary",
        "geometry":{"type":"Point","coordinates":[33.050978,-87.716837]},
        "fieldName":"Home Garden",
        "owner":"Jim Barry",
        "photosetId":"72157679042637670",
        "pictureId":"32874177151"
      }
      ];

var Apiary = function(data) {
  var self = this;
  this.latitude  = ko.observable(data.geometry.coordinates[0]);
  this.longitude = ko.observable(data.geometry.coordinates[1]);
  this.fieldName = ko.observable(data.fieldName);
  this.owner     = ko.observable(data.owner);
  this.picture   = ko.observable(data.picture);
  this.photosetId = ko.observable(data.photosetId);
  this.pictureId = ko.observable(data.pictureId);

  this.marker = new google.maps.Marker({
    position: new google.maps.LatLng(data.geometry.coordinates[0],data.geometry.coordinates[1]),
    animation: google.maps.Animation.DROP,
    map: map
  });

  //apiaryList.populateInfoWindow(this.marker);

  markers().push(this.marker);
  this.marker.addListener('click', toggleBounce);

  function toggleBounce() {
    if (self.marker.getAnimation() !== null) {
      self.marker.setAnimation(null);
    } else {
      self.marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function () {
        self.marker.setAnimation(null);
      }, 700);
      apiaryList.setApiary.populateInfoWindow(this.marker);
    }
  }
}

// Receives array of apiary data
var ApiaryList = function(arr) {
  var self = this;

  this.filter = ko.observable("");
  this.filtered_apiaries = ko.observableArray([]);
  this.apiaries = ko.observableArray([])
  this.fieldName = "";
  this.filter_apiaries = function() {
    //clear filtered apiaries
    self.filtered_apiaries.removeAll();
    if (self.filter() == "" )
    {
      //add all apiaries to filtered apiaries
      for (var i = 0; i < self.apiaries().length; i++)
        self.filtered_apiaries.push(self.apiaries()[i]);
    } else {
      //add only apiaries that match filter
      for (var i = 0; i < self.apiaries().length; i++) {
        var fn = self.apiaries()[i].fieldName().toLowerCase();
        if (fn.indexOf(self.filter().toLowerCase()) > -1)
          self.filtered_apiaries.push(self.apiaries()[i]);
      }
    }
    return true;
  }

  arr.forEach(function(apiaryItem){
    self.apiaries.push( new Apiary(apiaryItem) );
  });
  this.filter_apiaries();
  this.currentApiary = ko.observable(this.apiaries()[0]);

  this.setApiary = function(clickedApiary) {

    var apHome = new google.maps.LatLng(clickedApiary.latitude(),clickedApiary.longitude());

    map = new google.maps.Map(document.getElementById('map'), {
      center: apHome,
      zoom: 20,
      mapTypeId: 'satellite'
    });

    var apHomeLatLong = {lat:clickedApiary.latitude(),lng:clickedApiary.longitude()};
        console.log(apHomeLatLong);

    var apMarker = new google.maps.Marker({
      position: apHomeLatLong,
      map: map,
      title: 'Finally'
      //title: this.fieldName
    });
    var apiaryInfowindow = new google.maps.InfoWindow();
    apMarker.addListener('click', function() {
      populateInfoWindow(this, apiaryInfowindow);
    });

    function populateInfoWindow(marker, infowindow) {
      if (infowindow.marker != marker) {
        infowindow.marker = marker;
        var id = Math.floor(Math.random()*100000);
        var apiaryHtml = ('<div>' + "This is the "  + '"' + clickedApiary.fieldName() + '"' + " Apiary" + '</div>');

        apiaryHtml += '<div id="apiary_' + id + '_image"></div>';
        infowindow.open(map, marker);

        getFlickrPhotoUrl(clickedApiary.photosetId(), clickedApiary.fieldName(), function(url) {
        var finalContent = apiaryHtml + '<img src = "' + url + '"width = 80>';
        infowindow.setContent(finalContent);
        });

        infowindow.addListener('closeclick',function(){
          infowindow.setContent(null);
        });
      }
    }
    self.currentApiary(clickedApiary);
  };

  //------------------
  this.zoomToApiary = function() {

    if (self.fieldName == '') {
      window.alert('You must enter a valid apiary name.');
    } else {
      // Find the apiary
      var foundIt = false;
      self.apiaries().forEach(function(a){
        if (a.fieldName() == self.fieldName)
        {
          self.setApiary(a);
          foundIt = true;
        }
      });
      if (!foundIt)
      {
        window.alert("Sorry, no apiaries match your search");
      }
    }
  };
};
