
var Apairy = function(data) {
	this.type      = ko.observable(data.type);
	this.latitude  = ko.observable(data.geometry.coordinates[0]);
	this.longitude = ko.observable(data.geometry.coordinates[1]);
	this.fieldName = ko.observable(data.fieldName);
	this.owner     = ko.observable(data.owner);
	this.picture   = ko.observable(data.picture);

	this.marker = new google.maps.Marker({
	  position: new google.maps.LatLng(data.geometry.coordinates[0],data.geometry.coordinates[1]),
	  map: map
	});
}

// Receives array of apiary data
var ApiaryList = function(arr) {
	var self = this;

	this.apiaryList = ko.observableArray([]);

	arr.forEach(function(apiaryItem){
		self.apiaryList.push( new Apairy(apiaryItem) );
	});
	this.currentApiary = ko.observable(this.apiaryList()[0]);

	this.setApiary = function(clickedApiary) {
		console.log("type      = " + clickedApiary.type());
	    console.log("latitude  = " + clickedApiary.latitude());
	    console.log("longitude = " + clickedApiary.longitude());
	    console.log("fieldName = " + clickedApiary.fieldName());
	    console.log("owner     = " + clickedApiary.owner());

	    var apHome = new google.maps.LatLng(clickedApiary.latitude(),clickedApiary.longitude());

	    map = new google.maps.Map(document.getElementById('map'), {
		  	center: apHome,
		  	zoom: 20,
		  	mapTypeId: 'satellite'
		});

	    var apHomeLatLong = {lat:clickedApiary.latitude(),lng:clickedApiary.longitude()};

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
          var apiaryHtml = ('<div>' + "This is the "  + '"' + clickedApiary.fieldName() + '"' + " Apairy" + '</div>');
          apiaryHtml += '<img src="' + clickedApiary.picture() + '" />';
          infowindow.setContent(apiaryHtml);
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick',function(){
            infowindow.setMarker(null);
          });
        }
      }

	  self.currentApiary(clickedApiary);
	};
};

function showApiaries() {
    var bounds = new google.maps.LatLngBounds();
    // Extend the boundaries of the map for each marker and display the marker
    for (var i = 0; i < ApiaryList.length; i++) {
      initMap.markers[i].setMap(map);
      bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
 }

// This function will loop through the listings and hide them all.
function hideApiaries() {
  for (var i = 0; i < ApiaryList.length; i++) {
    initMap.markers[i].setMap(null);
  }
}
