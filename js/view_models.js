
var Apairy = function(data) {
	this.type      = ko.observable(data.type);
	this.latitude  = ko.observable(data.geometry.coordinates[0]);
	this.longitude = ko.observable(data.geometry.coordinates[1]);
	this.fieldName = ko.observable(data.fieldName);
	this.owner     = ko.observable(data.owner);
	this.picture   = ko.observable(data.picture);	
}

var ApiaryList = function(arr) {
	var self = this;

	this.apiaries = ko.observableArray([]);
  
	arr.forEach(function(a) { 
	  self.apiaries.push(new Apairy(a));
	});
	this.currentApiary = ko.observable(this.apiaries()[0]);
  
	this.setApiary = function(clickedApiary) {
		//console.log("type      = " + clickedApiary.type());
	  //console.log("latitude  = " + clickedApiary.latitude());
	  //console.log("longitude = " + clickedApiary.longitude());
	  //console.log("fieldName = " + clickedApiary.fieldName());
	  //console.log("owner     = " + clickedApiary.owner());  
	  controller.apiaryClick(clickedApiary);	  
	  self.currentApiary(clickedApiary);
	};
};
