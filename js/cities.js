var cities = [];
var prom = initCountry();
prom.then(function(countries){
    $.each(countries, function(i,v){
    	cities.push(v.display);
    })
})

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