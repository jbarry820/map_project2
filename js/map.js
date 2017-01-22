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
	window.apiary_callback = function(results) {
	  for (var i = 0; i < results.apiaries.length; i++) {
	  	var coords = results.apiaries[i].geometry.coordinates;
	    var latLng = new google.maps.LatLng(coords[0],coords[1]);
	    var fieldName = results.apiaries[i].fieldName;
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

	// Create a <script> tag and set the USGS URL as the source.
	var script = document.createElement('script');
		// This example uses a local copy of the GeoJSON stored at
	    script.src = 'js/apiary_GeoJSONP.js';
	  	document.getElementsByTagName('head')[0].appendChild(script);
	};