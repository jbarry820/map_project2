function getFlickrPhotoUrl(photoset_id, title, callback) {
    "use strict";
    var url = "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=fb34fbf0589ca4fe2666fb8dec51586&user_id=147854016@N08&photoset_id=" + photoset_id + "&format=json&nojsoncallback=1";
    //-------------------
    $.ajax({
        url: url,
        type: "get",
        success: function (resp) {
            if (resp.stat !== "fail") {
                var photos = resp.photoset.photo;
                photos.forEach(function (p) {
                    if (p.title === title) {
                        var url2 = getFlickrImageUrl(p);
                        callback(url2);
                    }
                });
            } else {
                alert(resp.message);
            }
        },
        error: function (xhr, status, error) {
            var err = ("(" + xhr.responseText + ")");
        }
    });
}

function getFlickrImageUrl(p) {
    "use strict";
    return "https://farm" + p.farm + ".staticflickr.com/" + p.server + "/" + p.id + "_" + p.secret + ".jpg";
}

$("#menu").click(function (e) {
    "use strict";
    e.stopPropagation();
    $("#drawer").toggleClass("open");
});
$("#map").click(function () {
    "use strict";
    $("#drawer").removeClass("open");
});

$(document).ready(function () {
    "use strict";
    $("#map").css("height", $(window).height() + "px");
});