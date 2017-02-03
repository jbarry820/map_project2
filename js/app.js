
var AppController = function(params) { this.init(params); };

AppController.prototype = {
 
  map: false,
  markers: [],
  apiaryList: false,
    
  init: function(params)
  {
    var that = this;
    for (var i in params)
      this[i] = params[i];
    
    // Initialize the map
    this.map = new google.maps.Map(document.getElementById('map'), {
	    center: new google.maps.LatLng(33.050945,-87.715825),
	    zoom: 11
	  });

    // Attach the click event listeners
    document.getElementById('show-apiaries').addEventListener('click', function() { that.showApiaries() });
    document.getElementById('hide-apiaries').addEventListener('click', function() { that.hideApiaries() });

    // Go get the apiary data
    var script = document.createElement('script');
    script.src = 'js/apiary_GeoJSONP.js';
    document.getElementsByTagName('head')[0].appendChild(script);
  },
	
	listCallback: function(arr) 
	{
	  var that = this;
	  
	  // Create the apiary list view model
    this.apiaryList = new ApiaryList(arr);
    ko.applyBindings(this.apiaryList);
    
    // Create the markers    
    this.apiaryList.apiaries().forEach(function(a) {
      var m = new google.maps.Marker({
        position: new google.maps.LatLng(a.latitude(), a.longitude()),
        map: that.map
      }); 
      that.markers.push(m);      
    });
  },
  
  showApiaries: function() 
  {
    var that = this;    
    var bounds = new google.maps.LatLngBounds();
    this.markers.forEach(function(m) {
      m.setMap(that.map);
      bounds.extend(m.position); 
    });
    that.map.fitBounds(bounds);
  },
  
  // This function will loop through the listings and hide them all.
  hideApiaries: function() 
  {
    var that = this;
    this.markers.forEach(function(m) { 
      m.setMap(null); 
    });    
  },
  
  apiaryClick: function(a)
  {
    var that = this;
    var apHome = new google.maps.LatLng(a.latitude(),a.longitude());
	  that.map = new google.maps.Map(document.getElementById('map'), {
		  center: apHome,
		  zoom: 20,
		  mapTypeId: 'satellite'
		});		
		var m = new google.maps.Marker({
		  position: { lat: a.latitude(), lng: a.longitude() },
		  map: that.map,
		  title: 'Finally'
		});
		var infowindow = new google.maps.InfoWindow();
		m.addListener('click', function() {		  	 
		  // Check to make sure the infowindow is not already opened on this marker.
		  if (this != infowindow.marker) 
		  {
        infowindow.marker = this;                
        infowindow.setContent("<div>This is the \"" + a.fieldName() + "\" Apairy</div><img src='" + a.picture() + "' />");                
        infowindow.open(that.map, this);
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', function(){ infowindow.marker = null; });
      }
    });
  }
};

//*******************************************************************************
// Main 
//******************************************************************************

var controller = false;
function initController()
{
  controller = new AppController();
}
