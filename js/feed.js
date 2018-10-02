
window.feed = function(callback) { 
  var tick = {};
  tick.plot0 = Math.floor(Math.random() * 3);
  callback(JSON.stringify(tick));
};


var myConfig ={
  type:"line",
  title: {
    text:'JS Feed'
  },
  plot:{
    aspect:"spline" 
  },
  scaleY:{
    values:'-1:3:1'
  },
  "background-color": "transparent",
  "refresh":{
    "type":"feed",
    "transport":"http",
    "url":"https://uvdata.arpansa.gov.au/xml/uvvalues.xml",
    maxTicks:20,
    "interval":200,
    "adjust-scale":true,
    resetTimeout:1000
  },
  series:[
    {
      values:[]
    }
  ]
};

zingchart.render({ 
  id : 'myChart', 
  data : myConfig, 
  height: 400, 
  width: '100%' 
});