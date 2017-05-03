
var Apiary = function(data) {
  this.type      = ko.observable(data.type);
  this.latitude  = ko.observable(data.geometry.coordinates[0]);
  this.longitude = ko.observable(data.geometry.coordinates[1]);
  this.fieldName = ko.observable(data.fieldName);
  this.owner     = ko.observable(data.owner);
  this.picture   = ko.observable(data.picture);
  this.photosetId = ko.observable(data.photosetId);
  this.pictureId = ko.observable(data.pictureId);

  this.marker = new google.maps.Marker({
    position: new google.maps.LatLng(data.geometry.coordinates[0],data.geometry.coordinates[1]),
    map: map
  });
  markers().push(this.marker);
}

// Receives array of apiary data
var ApiaryList = function(arr) {
  var self = this;

  this.apiaries = ko.observableArray([]);
  this.fieldName = "My Search";

  arr.forEach(function(apiaryItem){
    self.apiaries.push( new Apiary(apiaryItem) );
  });
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
    });
    var apiaryInfowindow = new google.maps.InfoWindow();
    apMarker.addListener('click', function() {
      populateInfoWindow(this, apiaryInfowindow);
    });

    function populateInfoWindow(marker, infowindow) {
      // Check to make sure the infowindow is not already opened on this marker.
      if (infowindow.marker != marker) {
        infowindow.marker = marker;
        var id = Math.floor(Math.random()*100000);//what is purpose of this line
        var apiaryHtml = ('<div>' + "This is the "  + '"' + clickedApiary.fieldName() + '"' + " Apiary" + '</div>');

        apiaryHtml += '<div id="apiary_' + id + '_image"></div>';
        infowindow.setContent(apiaryHtml);
        infowindow.open(map, marker);

        getFlickrPhotoUrl(clickedApiary.photosetId(), clickedApiary.fieldName(), function(url) {
        $('#apiary_' + id + '_image').append($('<img/>').attr('src', url));
        });

        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick',function(){
          infowindow.setMarker(null);
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

function showApiaries() {
    var bounds = new google.maps.LatLngBounds();
    // Extend the boundaries of the map for each marker and display the marker
    for (var i = 0; i < markers().length; i++) {
      markers()[i].setMap(map);
      bounds.extend(markers()[i].position);
    }
    map.fitBounds(bounds);
 }

// This function will loop through the listings and hide them all.
function hideApiaries() {
    for (var i = 0; i < markers().length; i++) {
      markers()[i].setMap(null);
  }
}
