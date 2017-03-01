
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
	markers().push(this.marker);
}

// Receives array of apiary data
var ApiaryList = function(arr) {
	var self = this;

	this.apiaries = ko.observableArray([]);
  this.fieldName = "My Search";

	arr.forEach(function(apiaryItem){
		self.apiaries.push( new Apairy(apiaryItem) );
	});
	this.currentApiary = ko.observable(this.apiaries()[0]);
	//console.log(this.apiaries.length);

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

  //------------------
  this.zoomToApiary = function() {
    console.log(self.fieldName);

    if (self.fieldName == '') {
      window.alert('You must enter a valid apiary name.');
    } else {
      // Find the apiary
      var foundIt = false;
      self.apiaries().forEach(function(a){
        if (a.fieldName() == self.fieldName)
        {
          // We found it
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
	//console.log(markers().length);
  //for (var i = 0; i < apiaries.length; i++) {
  	for (var i = 0; i < markers().length; i++) {
    	markers()[i].setMap(null);
  }
}

// This function takes the input value in the find nearby area text input
      // locates it, and then zooms into that area. This is so that the user can
      // show all listings, then decide to focus on one area of the map.
      /*function zoomToApiary() {
        // Initialize the geocoder.
        var geocoder = new google.maps.Geocoder();
        // Get the address or place that the user entered.
        var fldName = document.getElementById('zoom-to-apiary-text').value;
        console.log(fldName);
        //console.log(apiaries([0].this.type()));
        // Make sure the address isn't blank.
        if (fldName == '') {
          window.alert('You must enter a valid apiary name.');
        } else {
          // Geocode the address/area entered to get the center. Then, center the map
          // on it and zoom in
          geocoder.geocode(
            { address: address,
              //componentRestrictions: {locality: 'Alabama '}
            }, function(results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                map.setZoom(15);
              } else {
                window.alert('That is not a valid apiary name.');
              }
            });
        }
      }*/
