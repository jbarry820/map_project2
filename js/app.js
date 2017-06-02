"use strict";

var apiaryList;
function list_callback(arr) {
  apiaryList = new ApiaryList(arr);
  ko.applyBindings();
}

function getFlickrPhotoUrl(photoset_id, title, callback) {
  var $flickrElem = $();
  var url = "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=ffb34fbf0589ca4fe2666fb8dec51586&user_id=147854016@N08&photoset_id=" + photoset_id + "&format=json&nojsoncallback=1";
  //-------------------
  $.ajax({
    url: url,
    type: 'get',
    success: function(resp) {
      console.log(resp);
      if (resp.stat != "fail") {
        console.log("not fail")
        var photos = resp.photoset.photo;
        photos.forEach(function(p) {
          if (p.title === title) {
            var url = getFlickrImageUrl(p);
            callback(url);
          }
        });
      } else {
        alert(resp.message);
      }
    }
  });
}

function getFlickrImageUrl(p) {
  return "https://farm" + p.farm + ".staticflickr.com/" + p.server + "/" + p.id + "_" + p.secret + ".jpg";
}

$('#menu').click(function(e) {
  e.stopPropagation();
  $('#drawer').toggleClass('open');
});
$('#map').click(function() {
  $('#drawer').removeClass('open');
});

$(document).ready(function() {
  $('#map').css('height', $(window).height() + 'px');
});
