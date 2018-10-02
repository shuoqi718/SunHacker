$(document).ready(function(){
   
    var prom1 = initUvisd();
    prom1.then(function(uvs){
        var prom = initCountry();
        prom.then(function(countries){
            initOption(countries);
            changeOption(uvs);
        });
    })
})

var age;
var weekday;
var weekend;
var country;
var melbourne;

function initOption(countries){
    var year = 2017;
    var yearSelect = $('#birthday');
    var weekdaySelect = $('#weekday');
    var weekendSelect = $('#weekend');
    while(year >= 1900){
        var option = '<option value="' + year + '">' + year + '</option>';
        year -= 1;
        yearSelect.append(option);
    }
    for(var i=1;i<=6;i++){
        var option = '<option value="' + i + '">' + i + '</option>';
        weekdaySelect.append(option);
        weekendSelect.append(option);
    }

    countries.forEach(function(v, k, m){
        var option = '<option value="' + v.name + '">' + v.display + '</option>';
        $('#country').append(option);
    })
}


function initCountry(){
    var countries = new Map();
    var countryRef = firebase.database().ref('country');
    return countryRef.once('value').then(function(snapshot){
        snapshot.forEach(function(childSnapshot){
            if(childSnapshot.child('country').val() != 'melbourne'){
                var country = new Object();
                country.name = childSnapshot.child('country').val();
                country.display = childSnapshot.child('display').val();
                country.lat = childSnapshot.child('lat').val();
                country.lng = childSnapshot.child('lng').val();
                countries.set(country.name, country);
            }
        });
        return countries;
    });
}

function changeOption(uvs){
    var start = document.getElementById('start');
    var yearSelect = document.getElementById('birthday');
    var weekdaySelect = document.getElementById('weekday');
    var weekendSelect = document.getElementById('weekend');
    var countrySelect = document.getElementById('country');
    var melbourneSelect = document.getElementById('melbourne-stay');
    var clinic = document.getElementById('clinic-finder');
    clinic.addEventListener('click',function(){
        window.location.href = 'clinic.html'
    })
    start.addEventListener('click', function(){
        // $('#riskassess').toggleClass('hover');
        $('#0').fadeOut(600, function(){
            $('#0').toggleClass('hidden');
            $('#1').toggleClass('hidden');
            document.getElementById('progress').setAttribute('style', 'width:16%');
        })
    })
    yearSelect.addEventListener('change', function(){
        option = yearSelect.options[yearSelect.selectedIndex].value;
        if(option == 0)
            return
        age = 2018 - option;
        initMelbourneOption();
        $('#1').fadeOut(600, function(){
            $('#1').toggleClass('hidden');
            // $('#1').toggleClass('back');
            // $('#0').toggleClass('front');
            // $('#2').toggleClass('front');
            $('#2').toggleClass('hidden');
            document.getElementById('progress').setAttribute('style', 'width:32%');
        })
        // $('#riskassess').toggleClass('hover');
    })
    weekdaySelect.addEventListener('change', function(){
        option = weekdaySelect.options[weekdaySelect.selectedIndex].value;
        if(option == 0)
            return
        weekday = option;
        $('#2').fadeOut(600, function(){
            $('#2').toggleClass('hidden');
            // $('#2').toggleClass('front'); //delete back
            // $('#1').toggleClass('front'); //delete front
            // $('#3').toggleClass('back'); //add front
            $('#3').toggleClass('hidden');
        })
        // $('#riskassess').toggleClass('hover');
        
        document.getElementById('progress').setAttribute('style', 'width:48%');
    })
    weekendSelect.addEventListener('change', function(){
        option = weekendSelect.options[weekendSelect.selectedIndex].value;
        if(option == 0)
            return
        weekend = option
        $('#3').fadeOut(600, function(){
            $('#3').toggleClass('hidden');
            // $('#3').toggleClass('back'); // delete front
            // $('#4').toggleClass('front'); // add back

            $('#4').toggleClass('hidden');
        })
        // $('#riskassess').toggleClass('hover');
        document.getElementById('progress').setAttribute('style', 'width:64%');
    })
    countrySelect.addEventListener('change', function(){
        option = countrySelect.options[countrySelect.selectedIndex].value;
        if(option == 0)
            return
        country = option

        $('#4').fadeOut(600, function(){
            $('#4').toggleClass('hidden');
            // $('#4').toggleClass('front'); // delete back
            // $('#5').toggleClass('back'); // add front
            $('#5').toggleClass('hidden');
        })
        // $('#riskassess').toggleClass('hover');
        document.getElementById('progress').setAttribute('style', 'width:80%');
    })
    melbourneSelect.addEventListener('change', function(){
        option = melbourneSelect.options[melbourneSelect.selectedIndex].value;
        if(option == -1)
            return
        melbourne = option
        initResult(uvs)
        $('#5').fadeOut(600, function(){
            $('#5').toggleClass('hidden');
            // $('#5').toggleClass('back'); // delete front
            // $('#6').toggleClass('front'); // add back

            $('#6').toggleClass('hidden');
        })
        // $('#riskassess').toggleClass('hover');
        document.getElementById('progress').setAttribute('style', 'width:100%');
    })
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

function initMelbourneOption(){
    for(var i=0;i<age;i++){
        var option = '<option value="' + i + '">' + i + '</option>';
        $('#melbourne-stay').append(option);
    }
}

function initResult(uvs){
    var cue = (112 * weekend + 253 * weekday) * (uvs.get(country).uvi * (age - melbourne) + uvs.get('melbourne').uvi * melbourne)
    cue = cue - cue % 1000;
    if(cue < 205000){
        var level = '<span id="risk-level" style="font-weight:bold; font-size: 150%">Low or Average</span>'
        $('#risk-level').replaceWith(level)
    }else if(cue >= 205000 && cue < 242000){
        var level = '<span id="risk-level" style="font-weight:bold; font-size: 150%">Moderately increased</span>'
        $('#risk-level').replaceWith(level)
    }else{
        var level = '<span id="risk-level" style="font-weight:bold; font-size: 150%">Potentially High</span>'
        $('#risk-level').replaceWith(level)
    }
    var uvDose = '<span id="uv-dose" style="font-weight:bold; font-size: 150%">' + cue + '</span>'
    $('#uv-dose').replaceWith(uvDose);
    bar.animate(cue/484000); 
}

var bar = new ProgressBar.Line(container, {
    strokeWidth: 4,
    easing: 'easeInOut',
    duration: 1400,
    color: '#FFEA82',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: {width: '100%', height: '100%'},
    from: {color: '#FFEA82'},
    to: {color: '#ED6A5A'},
    step: (state, bar) => {
      bar.path.setAttribute('stroke', state.color);
    }
  })

 
  
  


