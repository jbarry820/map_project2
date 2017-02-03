
/**
 * Apiary View Model 
 * @param {hash} data - hash object containing data of single apiary.
 */
var Apairy = function(data) {
  var self = this;
  
	this.type      = ko.observable(data.type);
	this.latitude  = ko.observable(data.geometry.coordinates[0]);
	this.longitude = ko.observable(data.geometry.coordinates[1]);
	this.fieldName = ko.observable(data.fieldName);
	this.owner     = ko.observable(data.owner);
	this.picture   = ko.observable(data.picture);
		    
  this.marker = new google.maps.Marker({
    position: new google.maps.LatLng(this.latitude(), this.longitude()),
    map: map
  });
  this.infowindow = new google.maps.InfoWindow();
  this.marker.addListener('click', function() {
    if (this != self.infowindow.marker) 
    {
      self.infowindow.marker = this;                
      self.infowindow.setContent("<div>This is the \"" + self.fieldName() + "\" Apairy</div><img src='" + self.picture() + "' />");                
      self.infowindow.open(map, this);      
      self.infowindow.addListener('closeclick', function(){ self.infowindow.marker = null; });
    }
  });
}

/**
 * Apiary List View Model 
 * @param {array} arr - the array of raw apiary data.
 */
var ApiaryList = function(arr) {
	var self = this;

	this.apiaries = ko.observableArray([]);
  
	arr.forEach(function(a) { 
	  self.apiaries.push(new Apairy(a));
	});
	this.currentApiary = ko.observable(this.apiaries()[0]);
  
	this.setApiary = function(a) 
	{		            
    map.panTo(a.marker.getPosition());
    map.setZoom(20);
    map.setMapTypeId('satellite');
	  self.currentApiary(a);
	};
	
	this.showApiaries = function() 
  {
    var bounds = new google.maps.LatLngBounds();
    self.apiaries().forEach(function(a) {
      a.marker.setMap(map);
      bounds.extend(a.marker.position); 
    });
    map.fitBounds(bounds);
  };

  this.hideApiaries = function() 
  {
    self.apiaries().forEach(function(a) {
      a.marker.setMap(null);     
    });    
  };
};
