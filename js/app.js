 
var map = false;
var apiaryList = false;

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

  // Attach the click event listeners
  document.getElementById('show-apiaries').addEventListener('click', function() { apiaryList.showApiaries() });
  document.getElementById('hide-apiaries').addEventListener('click', function() { apiaryList.hideApiaries() });

  // Go get the apiary data
  var script = document.createElement('script');
  script.src = 'js/apiary_GeoJSONP.js';
  document.getElementsByTagName('head')[0].appendChild(script);
}

/**
 * Called when the apiary data is loaded. 
 * @param {array} arr - the array of raw apiary data.
 */
function listCallback(arr)
{
  apiaryList = new ApiaryList(arr);
  ko.applyBindings(apiaryList);     
}
