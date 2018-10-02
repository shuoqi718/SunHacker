
var anchors = new Array();

$(document).ready(function(){
    var prom1 = initUvisd();
    prom1.then(function(uvisd){
        var prom = initCountry();
        prom.then(function(countries){
            anchors = initAnchor(uvisd, countries)
            initialize()
        });
    });
})



function anchor(name, place, uvi, uvisd){
  this.name = name;
  this.place = place;
  this.uvi = uvi;
  this.uvisd = uvisd;
}

function initAnchor(uvisd, countries){
    var anchors = new Array();
    $.each(countries, function(i,v){
        anchors.push(new anchor(v.display, new google.maps.LatLng(v.lat, v.lng), uvisd.get(v.name).uvi, uvisd.get(v.name).uvisd))
    })
    return anchors
}

function initCountry(){
    var countries = new Array();
    var countryRef = firebase.database().ref('country');
    return countryRef.once('value').then(function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var country = new Object();
            country.name = childSnapshot.child('country').val();
            country.display = childSnapshot.child('display').val();
            country.lat = childSnapshot.child('lat').val();
            country.lng = childSnapshot.child('lng').val();
            countries.push(country);
        });
        return countries;
    });
}

function initUvisd(){
    var uvisds = new Map();
    var uvRef = firebase.database().ref('uvisd');
    return uvRef.once('value').then(function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var uvisd = new Object();
            uvisd = childSnapshot.val();
            uvisds.set(uvisd.country, uvisd);
        });
        return uvisds;
    });
}