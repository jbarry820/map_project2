var apiaryList;
function init() {

  // Wait for the map to be ready
  if (!map)
  {
    setTimeout(function() { init(); }, 100);
    return;
  }

  // Go get the apiary data
  var script = document.createElement('script');
  script.src = 'js/apiary_GeoJSONP.js';
  document.getElementsByTagName('head')[0].appendChild(script);
}

function list_callback(arr) {
  apiaryList = new ApiaryList(arr);
  ko.applyBindings(apiaryList);
  //ko.applyBindings(new ApiaryList(arr));
}

document.getElementById('show-apiaries').addEventListener('click', showApiaries);
document.getElementById('hide-apiaries').addEventListener('click', hideApiaries);

// Kick off the init function
init();