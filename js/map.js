
var map;
var markers;
function initMap() {
	var home = new google.maps.LatLng(33.050945,-87.715825);
	map = new google.maps.Map(document.getElementById('map'), {
	  center: home,
	  zoom: 11
	});

	markers = ko.observableArray([]);
}

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