"use strict";
var map;
var markers;
var apiaryList;

function initMap() {
    var home = new google.maps.LatLng(33.050945, -87.715825);
    map = new google.maps.Map(document.getElementById("map"), {
        center: home,
        zoom: 11
    });

    if (!map) {
        setTimeout (function () {
            init();
        }, 100);
        return;
    }

    markers = ko.observableArray([]);

    apiaryList = new ApiaryList(apiaryArray);
    ko.applyBindings(apiaryList);
}