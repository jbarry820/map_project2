var Apiary = function(data) {
    "use strict";
    var self = this;
    this.latitude = ko.observable(data.geometry.coordinates[0]);
    this.longitude = ko.observable(data.geometry.coordinates[1]);
    this.latLong = ko.computed(function() {
        return self.latitude() + "," + self.longitude();
    });
    this.fieldName = ko.observable(data.fieldName);
    this.owner = ko.observable(data.owner);
    this.picture = ko.observable(data.picture);
    this.photosetId = ko.observable(data.photosetId);
    this.pictureId = ko.observable(data.pictureId);

    this.marker = new google.maps.Marker({
        position: new google.maps.LatLng(data.geometry.coordinates[0], data.geometry.coordinates[1]),
        animation: google.maps.Animation.DROP,
        map: map
    });

    this.marker.addListener('click', function() {
        apiaryList.setApiary(self);
    });
    this.infowindow = new google.maps.InfoWindow();

    markers().push(this.marker);
};

var bouncy = function(marker) {
    for (var i = 0; i < apiaryList.apiaries().length; i++) {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function() {
                marker.setAnimation(null);
            }, 700);
            //map.setCenter(self.marker.position);
            /*window.setTimeout(function() {
                map.panTo(marker.position);
            }, 3000);*/
        }
        }
}

// Receives array of apiary data
var ApiaryList = function(arr) {
    "use strict";
    var self = this;
    this.filter = ko.observable("");
    this.filtered_apiaries = ko.observableArray([]);
    this.apiaries = ko.observableArray([]);
    //this.fieldName = "";
    this.filter_apiaries = function() {
        //clear filtered apiaries
        self.filtered_apiaries.removeAll();
        if (self.filter() === "") {
            //add all apiaries to filtered apiaries
            for (var i = 0; i < self.apiaries().length; i++)
                self.filtered_apiaries.push(self.apiaries()[i]);
        } else {
            //add only apiaries that match filter
            for (i = 0; i < self.apiaries().length; i++) {
                var fn = self.apiaries()[i].fieldName().toLowerCase();
                self.apiaries()[i].infowindow.close();
                if (fn.indexOf(self.filter().toLowerCase()) > -1) {
                    self.filtered_apiaries.push(self.apiaries()[i]);
                    self.apiaries()[i].marker.setVisible(true);
                    self.apiaries()[i].infowindow.open();
                } else {
                    self.apiaries()[i].marker.setVisible(false);
                }
            }
        }
        return true;
    }

    arr.forEach(function(apiaryItem) {
        self.apiaries.push(new Apiary(apiaryItem));
    });
    this.filter_apiaries();
    this.currentApiary = ko.observable(this.apiaries()[0]);

    this.setApiary = function(clickedApiary) {
        var apHome = new google.maps.LatLng(clickedApiary.latitude(), clickedApiary.longitude());
        map.panTo(apHome);
        self.currentApiary(clickedApiary);
        self.apiaries()[i].infowindow.close();
        for (var i=0; i < self.filtered_apiaries().length; i++) {
            self.apiaries()[i].marker.setVisible(false);
            /*if (self.apiaries()[i].infowindow != undefined) {
                self.apiaries()[i].infowindow.close();
            }*/
        }
        for (i=0; i < self.filtered_apiaries().length; i++) {
            if (self.apiaries()[i].fieldName() === clickedApiary.fieldName()) {
                markers()[i].setVisible(true);
            }
        }
        bouncy(clickedApiary.marker);
        populateInfoWindow(clickedApiary);
    };
};

function populateInfoWindow(a) {
    //"use strict";
    var id = Math.floor(Math.random() * 100000);
    var apiaryHtml = ('<div>' + "This is the " + '"' + a.fieldName() + '"' + " Apiary" + '</div>');
    apiaryHtml += '<div id="apiary_' + id + '_image"></div>';
    a.infowindow.open(map, a.marker);

    getFlickrPhotoUrl(a.photosetId(), a.fieldName(), function(url) {
        var finalContent = apiaryHtml + '<img src = "' + url + '"width = 80>';
        a.infowindow.setContent(finalContent);
    });

    a.infowindow.addListener("closeclick", function() {
        a.infowindow.setContent(null);
    });
}