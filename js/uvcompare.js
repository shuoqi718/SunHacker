$(document).ready(function(){
    var prom1 = initUv();
    prom1.then(function(uvs){
        var melbourne = getUv(uvs, 'melbourne', null);
        // initZingChart(null, melbourne);
        var myChart = initChart(null, melbourne);
        var prom = initCountry();
        prom.then(function(countries){
            initOption(countries);
            changeOption(uvs, melbourne, myChart, countries);
        });
        
    });
})

var currentConfig;
var ctx = document.getElementById('myChart').getContext('2d')

function initChart(country, melbourne){
    var country = new Object();
    var charts = new Object();
    country.country = 'Not Chosen'
    country.uv_index = 0
    barConfig.data.datasets[0].data = melbourne.year_uv;
    lineConfig.data.datasets[0].data = melbourne.month_uv;
    donutConfig.data.datasets[0].data = [melbourne.year_total, 0]
    var myChart = new Chart(ctx, lineConfig);
    currentConfig = 'line'
    return myChart;
}



function getUv(uvs, country, countries){
    var year_uv = uvs.get(country).year_average;
    var month_uv = uvs.get(country).month_average;
    var uvs = new Object();
    var uvy = new Array();
    var uvm = new Array();
    var uvmTotal = 0;
    var uvyTotal = 0;
    $.each(year_uv, function(i,v){
        uvyTotal += v['uv index'] * 365
        uvy.push(v['uv index']);
    })
    $.each(month_uv, function(i,v){
        uvmTotal += v['uv index']
        uvm.push(v['uv index'])
    })
    uvs.year_uv = uvy;
    uvs.month_uv = uvm;
    uvs.month_total = uvmTotal;
    uvs.year_total = uvyTotal;
    if(countries == null)
        uvs.country = 'Melbourne';
    else
        uvs.country = countries.get(country).display;

    return uvs;
}

function changeData(uv, melbourne, charts){
    if(uv == null){
        switch(currentConfig){
            case 'bar':
                charts.data.datasets[1].label = 'Not Chosen';
                charts.data.datasets[1].data = 0;
                break;
            case 'donut':
                charts.data.labels = ['Melbourne', 'Not Chosen']
                charts.data.datasets[0].data = [melbourne.year_total]
                break;
            case 'line':
                charts.data.datasets[1].label = 'Not Chosen'
                charts.data.datasets[1].data = 0
                break;

        }
    }
    else{
        switch(currentConfig){
            case 'bar':
                charts.data.datasets[1].label = uv.country;
                charts.data.datasets[1].data = uv.year_uv;
                break;
            case 'donut':
                charts.data.labels = ['Melbourne', uv.country]
                charts.data.datasets[0].data = [melbourne.year_total, uv.year_total]
                break;
            case 'line':
                charts.data.datasets[1].label = uv.country
                charts.data.datasets[1].data = uv.month_uv
                break;

        }
        
    }
    charts.update();
}

function changeChart(uvs, option, melbourne, charts, countries){
    if(option == null)
        changeData(null, melbourne, charts)
    else{
        var uv = getUv(uvs, option, countries);
        changeData(uv, melbourne, charts)
    }
}

function changeOption(uvs, melbourne, charts, countries){
    var select = document.getElementById('countrySelect');
    select.addEventListener('change',function(){
        var option = select.options[select.selectedIndex].value;
        if(option != '0')
            changeChart(uvs, option, melbourne, charts, countries);
        else
            changeChart(uvs, null, melbourne, charts, countries);
    })
    var button = document.getElementById('annual');
    // var button1 = document.getElementById('total');
    var button2 = document.getElementById('month');
    button.addEventListener('click', function(){
        if(currentConfig != 'bar'){
            charts.destroy();
            currentConfig = 'bar';
            $('#annual-text').removeClass('hidden');
            if(!$('#total-text').hasClass('hidden'))
                $('#total-text').addClass('hidden');
            if(!$('#month-text').hasClass('hidden'))
                $('#month-text').addClass('hidden');
            var option = select.options[select.selectedIndex].value;
            if(option == '0'){
                barConfig.data.datasets[1].label = 'Not Chosen';
                barConfig.data.datasets[1].data = 0;
                charts = new Chart(ctx, barConfig);
            }
            else{
                var uv = getUv(uvs, option, countries);
                barConfig.data.datasets[1].label = uv.country;
                barConfig.data.datasets[1].data = uv.year_uv;
                charts = new Chart(ctx, barConfig);
            }
        }
    })
    // button1.addEventListener('click', function(){
    //     if(currentConfig != 'donut'){
    //         charts.destroy();
    //         currentConfig = 'donut';
    //         $('#total-text').removeClass('hidden');
    //         if(!$('#annual-text').hasClass('hidden'))
    //             $('#annual-text').addClass('hidden');
    //         if(!$('#month-text').hasClass('hidden'))
    //             $('#month-text').addClass('hidden');
    //         var option = select.options[select.selectedIndex].value;
    //         if(option == '0'){
    //             donutConfig.data.datasets[0].data = [melbourne.year_total, 0];
    //             donutConfig.data.datasets[0].labels = ['Melbourne, Not Chosen'];
    //             charts = new Chart(ctx, donutConfig);
    //         }
    //         else{
    //             var uv = getUv(uvs, option, countries);
    //             donutConfig.data.labels = ['Melbourne', uv.country]
    //             donutConfig.data.datasets[0].data = [melbourne.year_total, uv.year_total]
    //             charts = new Chart(ctx, donutConfig);
    //         }
    //     }
    // })
    button2.addEventListener('click', function(){
        if(currentConfig != 'line'){
            charts.destroy();
            currentConfig = 'line';
            $('#month-text').removeClass('hidden');
            if(!$('#annual-text').hasClass('hidden'))
                $('#annual-text').addClass('hidden');
            if(!$('#total-text').hasClass('hidden'))
                $('#total-text').addClass('hidden');
            var option = select.options[select.selectedIndex].value;
            if(option == '0'){
                lineConfig.data.datasets[1].label = 'Not Chosen';
                lineConfig.data.datasets[1].data = 0;
                charts = new Chart(ctx, lineConfig);
            }
            else{
                var uv = getUv(uvs, option, countries);
                lineConfig.data.datasets[1].label = uv.country
                lineConfig.data.datasets[1].data = uv.month_uv
                charts = new Chart(ctx, lineConfig);
            }
        }
    })
}

function initOption(countries){
    countries.forEach(function(v, k, m){
        var option = '<option value="' + v.name + '">' + v.display + '</option>';
        $('#countrySelect').append(option);
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

function initUv(){
    var uvs = new Map();
    var uvRef = firebase.database().ref('uv_index_history');
    return uvRef.once('value').then(function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var countryUv = new Object();
            countryUv = childSnapshot.val();
            countryUv.month_average.splice(0,1);
            delete countryUv.year_average['2018']
            uvs.set(countryUv.country, countryUv);
        });
        return uvs;
    });
}


var barConfig = {
        type: 'bar',
        data: {
            labels: ["2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", 
                "2012", "2013", "2014", "2015", "2016", "2017"],
            datasets: [{
                label: 'Melbourne',
                data: 0,
                backgroundColor: 'rgba(255, 80, 80, 0.5)',
                borderWidth: 1
            },
            {
                label: 'Not Chosen',
                data: 0,
                backgroundColor: 'rgba(84, 158, 149, 0.5)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    }

var donutConfig = {
        type: 'doughnut',
        data: {
            datasets:[{
                data: [0],
                backgroundColor:[
                'rgb(114,255,234)',
                'rgb(25,33,244)',
                'rgb(123,122,33)'
            ]
            }],
            
            labels:[
            'Melbourne',
            'not Chosen'
            ]
        }
    }

var lineConfig = {
        type: 'line',
        data: {
            labels: ["January", "Febrary", "March", "April", "May", "June", "July", "August", "September", "October", 
                "November", "December"],
            datasets: [{
                label: 'Melbourne',
                data: 0,
                backgroundColor: 'rgba(255, 80, 80, 0.5)',
                borderWidth: 1
            },
            {
                label: 'not Chosen',
                data: 0,
                backgroundColor: 'rgba(84, 158, 149, 0.5)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    }