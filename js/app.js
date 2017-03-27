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

function getFlickrImage() {
  $.getJSON(url, function(data) {
    var detail = data.photos.photo[0];
    var $body = $('body');
    $body.append('<img class="infowndw-img" src="https://farm' + detail.farm + '.staticflickr.com/' + detail.server + '/' + detail.id + '_' + detail.secret + '_n.jpg">');
  }).fail(function(){
    $body.append('<p style="text-align: center;">Sorry! The photo</p><p style="text-align: center;">could not be loaded</p>');
  });
};

function getFlickrPhotoUrl(photoset_id, callback) {
  var url = "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=ffb34fbf0589ca4fe2666fb8dec51586&user_id=147854016@N08&photoset_id=" + photoset_id + "&format=json&nojsoncallback=1";
  $.ajax({
    url: url,
    type: 'get',
    success: function(resp) {
      var p = resp.photoset.photo[0];
      var url = getFlickrImageUrl(p);
      callback(url);
    },
    error: function(xhr, stats, err) {
      console.log(err);
    }
  });
}

  function getFlickrPhoto() {
    var API_KEY = ffb34fbf0589ca4fe2666fb8dec51586;
    var USER_ID = '147854016@N08';
    var photosetid = 72157679042637670;
    var base_url = 'https://api.flickr.com/services/rest/?';
    var method = 'flickr.photosets.getPhotos';
    var url = base_url +
      'method=' + method +
      '&api_key=' + API_KEY +
      '&user_id=' + USER_ID +
      '&photoset_id=' + photosetid +
      '&format=' + json +
      '&nojsoncallback=1';
    $.ajax({
      url: url,
      type: 'get',
      success: function(resp) {
        var p = resp.photoset.photo[0];
        var url = getFlickrImageUrl(p);
        $('#flickr_image_test').append($('<img/>').attr('src', url));
      },
      error: function(xhr, stats, err) {
        console.log(err);
      }
    })
}

function getFlickrImageUrl(p)
{
  console.log(p);
  return "https://farm" + p.farm + ".staticflickr.com/" + p.server + "/" + p.id + "_" + p.secret + ".jpg";
}

// Kick off the init function
init();