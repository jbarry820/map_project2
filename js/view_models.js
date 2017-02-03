
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
    if (activeWindow)
    {
      activeWindow.close();
      activeWindow = false;
    }      
    if (this != self.infowindow.marker) 
    {
      self.infowindow.marker = this;                
      self.infowindow.setContent("<div>This is the \"" + self.fieldName() + "\" Apairy</div><img src='" + self.picture() + "' />");                
      self.infowindow.open(map, this);
      activeWindow = self.infowindow;      
      //self.infowindow.addListener('closeclick', function(){ self.infowindow.marker = null; });
    }
  });
}

/**
  * Apiary List View Model 
  * @param {array} arr - the array of raw apiary data.
  */
var ApiaryList = function() {
	var self = this;
	
	// Attach the click event listeners
  document.getElementById('show-apiaries').addEventListener('click', function() { self.showApiaries() });
  document.getElementById('hide-apiaries').addEventListener('click', function() { self.hideApiaries() });

	this.apiaries = ko.observableArray([]);
	this.currentApiary = ko.observable(null);
	
	/**
    * Called when the apiary data is loaded. 
    * @param {array} arr - the array of raw apiary data.
    */
  this.populate = function(arr)
  {
	  arr.forEach(function(a) { 
	    self.apiaries.push(new Apairy(a));
	  });
	  self.currentApiary(self.apiaries()[0]);	  
	};
	  
	/**
    * Called when an item in the apiary list is clicked. 
    * @param {Apiary} a - the clicked apiary.
    */
	this.apiaryClick = function(a) 
	{
	  a.marker.setMap(map);
    map.panTo(a.marker.getPosition());
    map.setZoom(20);
    map.setMapTypeId('satellite');
	  self.currentApiary(a);
	};
	
	/**
    * Called when the "Show Apiaries" button is clicked.    
    */
	this.showApiaries = function() 
  {
    var bounds = new google.maps.LatLngBounds();
    self.apiaries().forEach(function(a) {
      a.marker.setMap(map);
      bounds.extend(a.marker.position); 
    });
    map.fitBounds(bounds);
  };

  /**
    * Called when the "Hide Apiaries" button is clicked.    
    */
  this.hideApiaries = function() 
  {
    self.apiaries().forEach(function(a) {
      a.marker.setMap(null);     
    });    
  };
};
