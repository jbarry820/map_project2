
var map;
function initMap() {
	var home = new google.maps.LatLng(33.050945,-87.715825);
	//var home = new google.maps.LatLng(2.8,-187.3);
	map = new google.maps.Map(document.getElementById('map'), {
	  center: home,
	  zoom: 11//,
	  //zoom: 2
	  //mapTypeId: 'terrain'
	});

	//var markers = [];
	var markers = ko.observableArray([]);
	var apiaryListInMap = ko.observableArray([]);
	// Loop through the results array and place a marker for each
	// set of coordinates.
	window.map_callback = function(arr) {
	  for (var i = 0; i < arr.length; i++) {
	  	var coords = arr[i].geometry.coordinates;
	    var latLng = new google.maps.LatLng(coords[0],coords[1]);
	    var fieldName = arr[i].fieldName;
	    var marker = new google.maps.Marker({
	      position: latLng,
	      map: map
	    });
	    markers.push(marker);
	    apiaryListInMap.push(fieldName);
	  }
	  //Add a marker clusterer to manage the markers.
    /*var markerCluster = new MarkerClusterer(map, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});*/
	};	
}
