var apiaryArray = [
    {
        "type": "Apiary",
        "geometry": {
            "type": "Point",
            "coordinates": [33.165388, -87.739671]
        },
        "fieldName": "Long North",
        "owner": "Jim Barry",
        "photosetId": "72157679042637670",
        "pictureId": "732389792544"
    },

    {
        "type": "Apiary",
        "geometry": {
            "type": "Point",
            "coordinates": [33.162907, -87.7428645]
        },
        "fieldName": "Long South",
        "owner": "Jim Barry",
        "photosetId": "72157679042637670",
        "pictureId": "33192279116"
    },
    {
        "type": "Apiary",
        "geometry": {
            "type": "Point",
            "coordinates": [33.154356, -87.740085]
        },
        "fieldName": "Bailey",
        "owner": "Jim Barry",
        "photosetId": "72157679042637670",
        "pictureId": "32768300252"
    },
    {
        "type": "Apiary",
        "geometry": {
            "type": "Point",
            "coordinates": [33.162621, -87.735356]
        },
        "fieldName": "Acorn Tree",
        "owner": "Jim Barry",
        "photosetId": "72157679042637670",
        "pictureId": "32921608095"
    },
    {
        "type": "Apiary",
        "geometry": {
            "type": "Point",
            "coordinates": [33.170098, -87.737866]
        },
        "fieldName": "Money Field",
        "owner": "Jim Barry",
        "photosetId": "72157679042637670",
        "pictureId": "32767381152"
    },
    {
        "type": "Apiary",
        "geometry": {
            "type": "Point",
            "coordinates": [33.157510, -87.291977]
        },
        "fieldName": "Chris",
        "owner": "Jim Barry",
        "photosetId": "72157679042637670",
        "pictureId": "32162511703"
    },
    {
        "type": "Apiary",
        "geometry": {
            "type": "Point",
            "coordinates": [33.103980, -87.469994]
        },
        "fieldName": "Jamey Shows",
        "owner": "Jim Barry",
        "photosetId": "72157679042637670",
        "pictureId": "32822533512"
    },
    {
        "type": "Apiary",
        "geometry": {
            "type": "Point",
            "coordinates": [33.072128, -87.665066]
        },
        "fieldName": "Bunn",
        "owner": "Jim Barry",
        "photosetId": "72157679042637670",
        "pictureId": "32869719971"
    },
    {
        "type": "Apiary",
        "geometry": {
            "type": "Point",
            "coordinates": [33.051425, -87.715746]
        },
        "fieldName": "Home Side Field",
        "owner": "Jim Barry",
        "photosetId": "72157679042637670",
        "pictureId": "32155278284"
    },
    {
        "type": "Apiary",
        "geometry": {
            "type": "Point",
            "coordinates": [33.051000, -87.715650]
        },
        "fieldName": "Home Front",
        "owner": "Jim Barry",
        "photosetId": "72157679042637670",
        "pictureId": "32155123374"
    },
    {
        "type": "Apiary",
        "geometry": {
            "type": "Point",
            "coordinates": [33.050978, -87.716837]
        },
        "fieldName": "Home Garden",
        "owner": "Jim Barry",
        "photosetId": "72157679042637670",
        "pictureId": "32874177151"
    }
];

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

        if (self.marker.getAnimation() !== null) {
            self.marker.setAnimation(null);
        } else {
            self.marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function() {
                self.marker.setAnimation(null);
            }, 700);
            map.setCenter(self.marker.position);
        }
        apiaryList.setApiary(self);
    });
    this.infowindow = new google.maps.InfoWindow();

    markers().push(this.marker);
};

// Receives array of apiary data
var ApiaryList = function(arr) {
    "use strict";
    var self = this;
    this.filter = ko.observable("");
    this.filtered_apiaries = ko.observableArray([]);
    this.apiaries = ko.observableArray([]);
    this.fieldName = "";
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
        map.setCenter(apHome);
        self.currentApiary(clickedApiary);
        for (var i=0; i < self.filtered_apiaries().length; i++) {
            self.apiaries()[i].marker.setVisible(false);
            if (self.apiaries()[i].infowindow != undefined) {
                self.apiaries()[i].infowindow.close();
            }
        }
        for (i=0; i < self.filtered_apiaries().length; i++) {
            if (self.apiaries()[i].fieldName() === clickedApiary.fieldName()) {
                markers()[i].setVisible(true);
                populateInfoWindow(clickedApiary);
            }
        }
    };
};

function populateInfoWindow(a) {
    "use strict";
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