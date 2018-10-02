// var hospitals = initHospital();


$(document).ready(function(){
	var prom = initHospital();
    prom.then(function(records){
        datatable(records)
        var prom1 = initMap();
        prom1.then(function(position){
        	findHospital(position.pos, position.map, records);
        })
    })

	
})

function findHospital(pos, map, hospitals){
	var availableHospitals = [];
	$.each(hospitals, function(i,v){
		if(distanceCalculator(pos.lat, pos.lng, v.lat, v.lng) < 5){
			availableHospitals.push(v);
		}
	});

	var marker;
	infoWindow = new google.maps.InfoWindow;
	var markers = [];
	
	$.each(availableHospitals, function(i,v){
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(v.lat,v.lng),
			// label: labels[labelIndex++ % labels.length],
			map: map,
			icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
			title: v.name
		});

		google.maps.event.addListener(marker, 'click', (function(marker,i){
			return function(){
				var content = '<div>' + v.name + '</div>' + '<div><b>Address</b>: ' + v.address + '</div>'
				infoWindow.setContent(content);
				infoWindow.open(map, marker);
			}
		})(marker,i))
		markers.push(marker);
	});
	updateUI(availableHospitals, markers);
}

function initMap(){
	var labelIndex = 0;
	var infoWindow;
	var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -37.813, lng: 144.963},
          zoom: 12
        });
	infoWindow = new google.maps.InfoWindow;


	var config = {
		timeout: 60000,
     	enableHighAccuracy: false,
        maximumAge: 0
	}

	return new Promise(function(resolve, reject){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(function(position){
				var pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};
				var position = {
					pos: pos,
					map: map
				}
				marker = new google.maps.Marker({
					position: new google.maps.LatLng(pos.lat, pos.lng),
					map: map
				});
				map.setCenter(pos);
				resolve(position)
				// updateUI(availableHospitals, map, markers);
			},function(){
				handleLocationError(false, infoWindow, map.getCenter());
				reject("service error")
			}, config);
		} else{
			handleLocationError(false, infoWindow, map.getCenter());
			reject("gps error")
		}
	});
	
}


function updateUI(availableHospitals, markers){
	var link = document.getElementById('hospitals').childNodes;
	if(link.length >= 2)
		return;
	$.each(availableHospitals, function(i,v){
		var li = '<li class="list-group-item borderless bounce" id="'+ i + '"><p class="bounce"><strong>' + 
			v.name + '</strong><br><span style="font-size:15px" class="bounce">' + v.address + ', ' + v.suburb + ',' + 
			v.state + ' ' + v.postcode + '</span></p></li>';
		$('#hospitals').append(li);
	});
	$('.bounce').on('mouseenter', function(e){
		var id = e.target.id;
		toggleBounce(markers[id], true)
	});
	$('.bounce').on('mouseout', function(e){
		var id = e.target.id;
		toggleBounce(markers[id], false)
	});
}

function handleLocationError(browserHasGeolocation, infoWindow, pos){
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation?
		'Error: The Geolocation service failed.' :
		'Error: Your browser doesn\'t support geolocation.');
	infoWindow.open(map);
}

function toggleBounce(marker, condition){
 	if(condition && marker){
		marker.setAnimation(google.maps.Animation.BOUNCE);
 	}
 	else if(!condition && marker){
 		marker.setAnimation(null);
 	}
}



function initHospital(){
	var hospitals = new Array();
	var ref = firebase.database().ref('hospital_detail');
	var index = 0
	return ref.once('value').then(function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var hospital = new Object();
            hospital.lat = childSnapshot.child('Latitude').val()
            hospital.lng = childSnapshot.child('Longitude').val()
            hospital.name = childSnapshot.child('Hospital name').val()
            hospital.address = childSnapshot.child('Street address').val();
            hospital.suburb = childSnapshot.child('Suburb').val()
            hospital.state = childSnapshot.child('State').val()
            hospital.sector = childSnapshot.child('Sector').val()
            hospital.postcode = childSnapshot.child('Postcode').val()
            hospital.phone = childSnapshot.child('Phone number').val()
            if(childSnapshot.child('Website').val() == null){
            	hospital.website = "No website yet"
            }
            else
            	hospital.website = childSnapshot.child('Website').val()

            
            hospitals[index] = hospital;
            index += 1
        });
        
        return hospitals;
    });

	
}

function isEmptyObject(obj){
	for(var key in obj){
		return false;
	}
	return true
}

function distanceCalculator(lat1, lon1, lat2, lon2){
	var R = 6371; // Radius of the earth in km
  	var dLat = deg2rad(lat2-lat1);  // deg2rad below
  	var dLon = deg2rad(lon2-lon1); 
  	var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  	var d = R * c; // Distance in km
  	return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}





function format(d){
	return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<tr>'+
            '<td>Hospital address:</td>'+
            '<td>'+d.address+','+d.suburb+','+d.state+' '+d.postcode+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Website:</td>'+
            '<td>'+d.website+'</td>'+
        '</tr>'+
    '</table>';
}

function datatable(d){
	var table = $('#table').DataTable({
		"data": d,
		"columns":[
		{
			"className": 'details-control',
			"orderable": false,
			"data": null,
			"defaultContent": '',
			"width": "4%"
		},
		{ "data": 'name'},
		{ "data": 'phone',
			"width": "15%"},
		{ "data": 'address'},
		{ "data": 'sector'}
		],
		"order":[[1, 'asc']]
	});

	$('#table tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row( tr );
 
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child( format(row.data()) ).show();
            tr.addClass('shown');
        }
    } );
    return d;
}


