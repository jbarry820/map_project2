
var Apairy = function(data) {
	this.type      = ko.observable(data.type);
	this.latitude  = ko.observable(data.geometry.coordinates[0]);
	this.longitude = ko.observable(data.geometry.coordinates[1]);
	this.fieldName = ko.observable(data.fieldName);
	this.owner     = ko.observable(data.owner);

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
	    var apMarker = clickedApiary.marker;
	    map = new google.maps.Map(document.getElementById('map'), {
	  	center: apHome,
	  	zoom: 20,
	  	mapTypeId: 'satellite'
	});

		//console.log("Just clicked on apiary, " + clickedApiary.fieldName);
		self.currentApiary(clickedApiary);
	};
};
