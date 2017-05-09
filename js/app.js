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

document.getElementById('show-apiaries').addEventListener('click', showApiaries);
document.getElementById('hide-apiaries').addEventListener('click', hideApiaries);

function getFlickrPhotoUrl(photoset_id, title, callback) {
  var url = "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=ffb34fbf0589ca4fe2666fb8dec51586&user_id=147854016@N08&photoset_id=" + photoset_id + "&format=json&nojsoncallback=1";
  $.ajax({
    url: url,
    type: 'get',
    success: function(resp) {
      console.log(resp);
      //-------------------------------
      var photos = resp.photoset.photo;

      photos.forEach(function(p) {
        if (p.title === title) {
          var url = getFlickrImageUrl(p);
          callback(url);
        }
        else{
      alert('Flickr could not be loaded.');
        }
      });
    },
    error: function(xhr, stats, err) {
      alert('Flickr could not be loaded.');
    }
  });
}

function getFlickrImageUrl(p)
{
  return "https://farm" + p.farm + ".staticflickr.com/" + p.server + "/" + p.id + "_" + p.secret + ".jpg";
}

/*
 * Open the drawer when the menu icon is clicked.
 */
$('#menu').click(function(e) {
  e.stopPropagation();
  $('#drawer').toggleClass('open');
});
$('#map').click(function() {
  $('#drawer').removeClass('open');
});

// Kick off the init function
init();

$(document).ready(function() {
  $('#map').css('height', $(window).height() + 'px');
});
