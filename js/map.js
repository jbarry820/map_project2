
var map;
var markers;
function initMap() {
	var home = new google.maps.LatLng(33.050945,-87.715825);
	map = new google.maps.Map(document.getElementById('map'), {
	  center: home,
	  zoom: 11
	});

	markers = ko.observableArray([]);
	//var apiaryListInMap = ko.observableArray([]);
}