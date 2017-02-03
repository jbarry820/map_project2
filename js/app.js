 
var map = false;
var apiaryList = false;
var activeWindow = false;

/**
  * Called when the google maps javascript is loaded.
  * We're using this to kick off all the functionality on the page.
  */
function init()
{
  // Initialize the map
  map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(33.050945,-87.715825),
    zoom: 11
  });
  
  // Initialize the apiary list
  apiaryList = new ApiaryList();
  ko.applyBindings(apiaryList);

  // Go get the apiary data
  var script = document.createElement('script');
  script.src = 'js/apiary_GeoJSONP.js';
  document.getElementsByTagName('head')[0].appendChild(script);
}
