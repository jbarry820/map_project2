
function doThis() {
  console.log(fieldName);
}

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
  ko.applyBindings(new ApiaryList(arr));
}

/*document.getElementById('zoom-to-apiary').addEventListener('click', function() {
          zoomToApiary();
        });*/
document.getElementById('show-apiaries').addEventListener('click', showApiaries);
document.getElementById('hide-apiaries').addEventListener('click', hideApiaries);

function getPhotoFromAlbum(album_id)
{
  var url = "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=ffb34fbf0589ca4fe2666fb8dec51586&user_id=147854016@N08&format=json&photoset_id=" + album_id;

}

// Kick off the init function
init();