$(document).ready(function(){
	$('#datepicker').datepicker({minDate:0,maxDate: "+7D"});
	var prom1 = initForecast();
	prom1.then(function(forecasts){
		changeOption(forecasts);
	})
})


var date;
var activity;
var uv;
var myChart;

function initForecast(){
	var forecasts = new Map();
	var uvRef =firebase.database().ref('forecast');
	return uvRef.once('value').then(function(snapshot){
		snapshot.forEach(function(childsnapshot){
			var forecast = new Object();
			forecast = childsnapshot.val();
			forecasts.set(forecast.date, forecast);
		});
		return forecasts
	});
}


function initChart(forecasts){
	var ctx = document.getElementById('uv-trend').getContext('2d')
	var today = moment();
	var data = []
	var labels = [];
	for(var i=0; i<7; i++){
		var id = today.add(1,'day').format('YYYYMMDD');
		var label = today.format('MMM/DD');
		labels.push(label);
		data.push(forecasts.get(parseInt(id)).uv);
	}
	barConfig.data.labels = labels;
    barConfig.data.datasets[0].data = data;
    barConfig.data.datasets[1].data = data;
    myChart = new Chart(ctx, barConfig);
}

function changeOption(forecasts){
	var start = document.getElementById('start');
	var con = document.getElementById('date');
	var act = document.getElementById('activity');
	var submit = document.getElementById('send-email');
	var trend = document.getElementById('trend-start');
	var trend_return = document.getElementById('trend-return');
	trend_return.addEventListener('click',function(){
		$('#5').fadeOut(600, function(){
			myChart.destroy();
			$('#planner-trend').animate({width: '45%'}, function(){
				$('#planner-blank').toggleClass('hidden');
				$('#planner-content').toggleClass('hidden');
				$('#5').toggleClass('hidden');
				$('#4').toggleClass('hidden');
				$('#4').fadeIn(600);
			});
			
		})
	})
	start.addEventListener('click', function(){
		$('#0').fadeOut(600, function(){
			$('#planner-content').animate({width: '100%'});
			$('#planner-blank').toggleClass('hidden');
			$('#planner-trend').toggleClass('hidden');
			$('#progress').toggleClass('hidden');
			$('#0').toggleClass('hidden');
			$('#1').toggleClass('hidden');
			$('#1').fadeIn(600);
			document.getElementById('progress').setAttribute('style','width:33%');
		})
	})
	trend.addEventListener('click',function(){
		$('#4').fadeOut(600, function(){
			$('#planner-trend').animate({width: '100%'})
			$('#planner-blank').toggleClass('hidden');
			$('#planner-content').toggleClass('hidden');
			$('#4').toggleClass('hidden');
			$('#5').toggleClass('hidden');
			$('#5').fadeIn(600);
			initChart(forecasts);
		})
	})
	con.addEventListener('click', function(){
		date = $('#datepicker').val();
		if(date == '')
			return;
		$('#1').fadeOut(600, function(){
			$('#1').toggleClass('hidden');
			$('#2').toggleClass('hidden');
			$('#2').fadeIn(600);
			document.getElementById('progress').setAttribute('style','width:66%');
		})
	})
	act.addEventListener('change', function(){
		option = act.options[act.selectedIndex].value;
		if(option == 0)
			return
		activity = option
		initResult(forecasts);
		$('#2').fadeOut(600, function(){
			
			$('#2').toggleClass('hidden');
			$('#3').toggleClass('hidden');
			$('#3').fadeIn(600);
			
			document.getElementById('progress').setAttribute('style','width:100%');
		})
	})
	submit.addEventListener('click', function(){
		var email = $('#email-address').val();
		sendEmail(email);
	})
}

function sendEmail(email){
	var body = '<h2 class="text-center">Your plan</h2><p>Your selected activity is ' + activity + ',and date is ' + date + '</p><p>Our predicted UV index at that day is :' 
		+ uv + '</p>' + 
		'<p>Here is our suggestions:</p>'
	if(activity == "Victoria's snowfields"){
		body += '<ol>'+
			'<li>The atmosphere is thinner at high altitude and absorbs less uv radiation.</li>'+
			'<li>Snow is highly reflective.</li>'+
			'<li>Slop on SPF30 or higher broad-spectrum, water-resistant sunscreen.</li>'+
			'<li>Apply a generous amount of sunscreen to all exposed skin 20 minutes before going outside and re-apply every two hours.</li>'+
			'<li>Slide on goggles or wrap-around sunglasses. Make sure your eye protection meets Australian Standard AS:1067. If you wear prescription glasses, talk to your optometrist about getting prescription lenses fitted in your goggles or sunglasses.</li>'+
			'</ol>'
	}else if(activity == 'Camping'){
		body += '<ol>'+
			'<li>Reducing exposure to ultraviolet radiation when outdoors can be achieved for people by</li>'+
			'<li>wearing sun safe hats that protect the head, neck and ears</li>'+
			'<li>implementing a ‘no hat, stay in the shade’ strategy for people not wearing sun safe hats</li>'+
			'<li>seek shade when outdoors during peak ultraviolet radiation times</li>'+
			'<li>wear swim shirts during outdoor water based activities</li>'+
			'<li>apply 30+ (or higher), broad spectrum and water resistant sunscreen prior to outdoor activities such as carnivals and excursions.</li>'+
		'</ol>'
	}else if(activity == 'Fishing'){
		body +=  '<ol>'+
			'<li>Cover skin: Wearing long sleeve shirts and lightweight pants to cover skin is a good precaution during UV ratings of 3 or greater. Quality outdoor apparel with a high ultraviolet protective factor (UPF) will provide the best protection.</li>'+
			'<li>Protect Your Eyes: Wearing a pair of quality sunglasses to shield eyes from harmful UV rays is another must-do.</li>'+
			'<li>Use Sunscreen:Applying sunscreen 20 minutes before going outside and reapplying it as per the product’s directions will prevent sunburns and protect skin.</li>'+
			'<li>UV rays can pass through clouds, making skin protection just as important when it’s overcast as when it’s sunny</li>'+
			'<li>During very high UV ratings consider fishing early or late, avoiding midday when UV rays are the strongest</li>'+
			'<li>Water reflects the sun, which can mean getting hit with UV rays from below as well as above; protect yourself accordingly when fishing</li>'+
		'</ol>'
	}else if(activity == 'Hiking and walking'){
		body += '<ol>'+
			'<li>Limit time in the midday sun. Try to limit exposure during the day when the sun’s rays are strongest — between 10 a.m. and 4 p.m. </li>'+
			'<li>Wear a hat and cover up. A hat with a wide brim protects areas prone to overexposure, such as your eyes, ears, face, and the back of your neck. </li>'+
			'<li>Wear sunglasses that block UV rays. Check the label when buying sunglasses. </li>'+
			'<li>Sunglasses that provide 99-100% UVA and UVB protection will greatly reduce sun exposure that can lead to cataracts and other forms of eye damage.</li>'+
			'<li>Always use sunscreen. Apply a sunscreen with SPF 15 or higher half an hour before going outdoors to achieve adequate UV protection. Use products that provide broad-spectrum protection against both UVA and UVB rays. Reapply every two hours or more frequent if exercising outdoors. Even waterproof sunscreen can come off when you sweat.</li>'+
			'<li>Watch the UV index.</li>'+
			'<li>See your doctor. Early detection is paramount to a successful skin cancer treatment. Know the skin you’re in. If you notice any changes, see a doctor.</li>'+
		'</ol>'
	}
	else{
		body += '<ol>'+
			'<li>SWIMMING:If you are swimming one metre under the water 50% of the UVB and 75% of the UVA rays are still reaching your skin.</li>'+
			'<li>Because you can still burn when swimming, it is always a good idea to apply a water resistant sunscreen.</li>'+
			'<li>SAILING: When you are sailing, don’t be fooled by the cool wind and rem ember that water increases UV intensity by reflection.</li>'+
			'<li>The length of time a water resistant sunscreen protects your skin will depend on how long you stay in the water. Water resistant sunscreen usually maintains 50% of its SPF after 40 minutes of bathing.</li>'+
		'</ol>'
	}

	firebase.database().ref('user_email').set({
		email: email,
		subject: `Your sun protection plan for your future activity`,
		body: body
	});
	document.getElementById('send-email').disabled = true;
	alert('Thank you for using our tools. Please check your emails');
}

function initResult(forecasts){
	var day = date.split('/')
	day = day[2] + day[0] + day[1]
	uv = forecasts.get(parseInt(day)).uv.toFixed(2);
	var suggestion = '<p id="suggestion" class="w-100">';
	if(activity == 'Camping'){
		$('#Camping').toggleClass('hidden')
	}else if(activity=="Fishing"){
		$('#Fishing').toggleClass('hidden')
	}else if(activity=="Hiking and walking"){
		$('#Hiking').toggleClass('hidden')
	}else if(activity=="Water sports"){
		$('#Watersports').toggleClass('hidden')
	}else {
		$('#Snow').toggleClass('hidden')
	};
	$('#suggestion').replaceWith(suggestion)
	var uvDose = '<span id="uv-index" style="font-weight:bold; font-size: 150%">' + uv + '</span>'
	$('#uv-index').replaceWith(uvDose);
	if(uv < 3){
        var level = '<span id="risk-level" style="font-weight:bold; font-size: 150%">Low or Average</span>'
        $('#risk-level').replaceWith(level)
    }else if(uv >= 3 && uv < 8){
        var level = '<span id="risk-level" style="font-weight:bold; font-size: 150%">Moderately increased</span>'
        $('#risk-level').replaceWith(level)
    }else{
        var level = '<span id="risk-level" style="font-weight:bold; font-size: 150%">Potentially High</span>'
        $('#risk-level').replaceWith(level)
    }
}

var barConfig = {
        type: 'bar',
        data: {
            labels: ['none'],
            datasets: [{
                data: 0,
                label: 'Bar trend',
                backgroundColor:'rgba(237, 16, 79, 0.5)',
                borderWidth: 1
            },
            {
                data: 0,
                borderWidth: 1,
                label: 'Line trend',
                borderColor: 'rgb(13, 9, 247)',
                type: 'line',
                fill:false
            }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            },
            responsive:false
        }
    }