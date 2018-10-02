$(document).ready(function() {
  $.ajax({
    type: "GET",
    url: "https://uvdata.arpansa.gov.au/xml/uvvalues.xml",
    dataType: "xml",
    success: initXmlParser
  });
});

function changeOption() {
  var select = document.getElementById("countrySelect");
  select.addEventListener("change", function() {
    var option = select.options[select.selectedIndex].value;
    changeData(option);
  });
}

function changeData(option) {
  $.ajax({
    type: "GET",
    url: "https://uvdata.arpansa.gov.au/xml/uvvalues.xml",
    dataType: "xml",
    success: function(xml) {
      $(xml)
        .find('location[id="' + option + '"]')
        .each(function() {
          var index = $(this)
            .find("index")
            .text();
          var index1 = Number(index);
          if (index < 2) {
            attention = ". You can safely enjoy being outside!";
            risklevel = "Very Low";
            document.getElementById("test").style.color = "#348D00";
            document.getElementById("index").style.color = "#348D00";
          } else if (index < 4) {
            attention =
              ". Seek shade during midday hours! Slip on a shirt, slop on sunscreen and slap on hat!";
            risklevel = "Low";
            document.getElementById("test").style.color = "#B1AD00";
            document.getElementById("index").style.color = "#B1AD00";
          } else if (index < 6) {
            attention =
              ". Seek shade during midday hours! Slip on a shirt, slop on sunscreen and slap on hat!";
            risklevel = "Medium";
            document.getElementById("test").style.color = "#FAC100";
            document.getElementById("index").style.color = "#FAC100";
          } else if (index < 8) {
            attention =
              ". Avoid being outside during midday hours! Make sure you seek shade! Shirt, sunscreen and hat are a must!";
            risklevel = "High";
            document.getElementById("test").style.color = "#EC7928";
            document.getElementById("index").style.color = "#EC7928";
          } else if (index < 10) {
            attention =
              ". Avoid being outside during midday hours! Make sure you seek shade! Shirt, sunscreen and hat are a must!";
            risklevel = "Very High";
            document.getElementById("test").style.color = "#FB0A02";
            document.getElementById("index").style.color = "#FB0A02";
          } else {
            attention =
              ". Avoid being outside during midday hours! Make sure you seek shade! Shirt, sunscreen and hat are a must!";
            risklevel = "Extreme";
            document.getElementById("test").style.color = "purple";
            document.getElementById("index").style.color = "purple";
          }
          document.getElementById("index").innerHTML = index;
          document.getElementById("attention").innerHTML = attention;
          document.getElementById("risklevel").innerHTML = risklevel;
          document.getElementById("cities").innerHTML = option;

          zingchart.THEME = "classic";
          var myConfig = {
            graphset: [
              {
                type: "gauge",
                "background-color": "",
                plot: {
                  "background-color": "#666"
                },
                plotarea: {
                  margin: "0 0 0 0"
                },
                scale: {
                  "size-factor": 0.8,
                  "offset-y": 120
                },
                tooltip: {
                  "background-color": "black"
                },
                "scale-r": {
                  values: "0:12:1",
                  "border-color": "#b3b3b3",
                  "border-width": "2",
                  "background-color": "#eeeeee,#b3b3b3",
                  ring: {
                    size: 15,
                    "offset-r": "130px",
                    rules: [
                      {
                        rule: "%v >=0 && %v < 2",
                        "background-color": "#348D00"
                      },
                      {
                        rule: "%v >= 2 && %v < 4",
                        "background-color": "#B1AD00"
                      },
                      {
                        rule: "%v >= 4 && %v < 6",
                        "background-color": "#FAC100"
                      },
                      {
                        rule: "%v >= 6 && %v < 8",
                        "background-color": "#EC7928"
                      },
                      {
                        rule: "%v >= 8 && %v < 10",
                        "background-color": "#FB0A02"
                      },
                      {
                        rule: "%v >= 10",
                        "background-color": "purple"
                      }
                    ]
                  }
                },
                images: [
                  // {
                  //     "src":"gaugle_scale_mini.png",
                  //     "position":"50% 80%"
                  // }
                ],
                labels: [
                  {
                    id: "lbl0",
                    x: "50%",
                    y: "90%",
                    width: 80,
                    offsetX: 220,
                    textAlign: "center",
                    padding: 10,
                    anchor: "c",
                    text: "Extreme",
                    backgroundColor: "purple",
                    tooltip: {
                      padding: 10,
                      backgroundColor: "#ea0901",
                      text: ">10 <12",
                      shadow: 0
                    }
                  },
                  {
                    id: "lbl1",
                    x: "50%",
                    y: "90%",
                    width: 80,
                    offsetX: 140,
                    textAlign: "center",
                    padding: 10,
                    anchor: "c",
                    text: "Very High",
                    backgroundColor: "#FB0A02",
                    tooltip: {
                      padding: 10,
                      backgroundColor: "#ea0901",
                      text: ">8 <10",
                      shadow: 0
                    }
                  },
                  {
                    id: "lbl2",
                    x: "50%",
                    y: "90%",
                    width: 80,
                    offsetX: 60,
                    textAlign: "center",
                    padding: 10,
                    anchor: "c",
                    text: "High",
                    backgroundColor: "#EC7928",
                    tooltip: {
                      padding: 10,
                      backgroundColor: "#da6817",
                      text: ">6 <8",
                      shadow: 0
                    }
                  },
                  {
                    id: "lbl3",
                    x: "50%",
                    y: "90%",
                    width: 80,
                    offsetX: -20,
                    textAlign: "center",
                    padding: 10,
                    anchor: "c",
                    text: "Medium",
                    backgroundColor: "#FAC100",
                    tooltip: {
                      padding: 10,
                      backgroundColor: "#e9b000",
                      text: ">4 <6",
                      shadow: 0
                    }
                  },
                  {
                    id: "lbl4",
                    x: "50%",
                    y: "90%",
                    width: 80,
                    offsetX: -100,
                    textAlign: "center",
                    padding: 10,
                    anchor: "c",
                    text: "Low",
                    backgroundColor: "#B1AD00",
                    tooltip: {
                      padding: 10,
                      backgroundColor: "#a09c00",
                      text: ">2  <4",
                      shadow: 0
                    }
                  },
                  {
                    id: "lbl5",
                    x: "50%",
                    y: "90%",
                    width: 80,
                    offsetX: -180,
                    textAlign: "center",
                    padding: 10,
                    anchor: "c",
                    text: "Very Low",
                    backgroundColor: "#348D00",
                    tooltip: {
                      padding: 10,
                      backgroundColor: "#237b00",
                      text: ">0  <2",
                      shadow: 0
                    }
                  }
                ],
                series: [
                  {
                    values: [index1],
                    animation: {
                      method: 5,
                      effect: 2,
                      speed: 2500
                    }
                  }
                ],
                alpha: 1
              }
            ]
          };

          zingchart.render({
            id: "myChart",
            data: myConfig
          });

          /*
     * assign event listener 
     */
          document
            .getElementById("updateChart")
            .addEventListener("input", function(ev) {
              var inputValue = ev.currentTarget.value;
              document.getElementById("output").textContent = inputValue;

              /*
       * update the value of the chart using zingchart API 
       */
              zingchart.exec("myChart", "setseriesvalues", {
                plotindex: 0,
                values: [parseInt(inputValue)]
              });
            });
        });
    }
  });
}

function initXmlParser(xml) {
  $(xml)
    .find('location[id="Melbourne"]')
    .each(function() {
      var index = $(this)
        .find("index")
        .text();
      var index1 = Number(index);
      var attention;
      var risklevel;
      if (index < 2) {
        attention = ". You can safely enjoy being outside!";
        risklevel = "Very Low";
        document.getElementById("test").style.color = "#348D00";
        document.getElementById("index").style.color = "#348D00";
      } else if (index < 4) {
        attention =
          ". Seek shade during midday hours! Slip on a shirt, slop on sunscreen and slap on hat!";
        risklevel = "Low";
        document.getElementById("test").style.color = "#B1AD00";
        document.getElementById("index").style.color = "#B1AD00";
      } else if (index < 6) {
        attention =
          ". Seek shade during midday hours! Slip on a shirt, slop on sunscreen and slap on hat!";
        risklevel = "Medium";
        document.getElementById("test").style.color = "#FAC100";
        document.getElementById("index").style.color = "#FAC100";
      } else if (index < 8) {
        attention =
          ". Avoid being outside during midday hours! Make sure you seek shade! Shirt, sunscreen and hat are a must!";
        risklevel = "High";
        document.getElementById("test").style.color = "#EC7928";
        document.getElementById("index").style.color = "#EC7928";
      } else if (index < 10) {
        attention =
          ". Avoid being outside during midday hours! Make sure you seek shade! Shirt, sunscreen and hat are a must!";
        risklevel = "Very High";
        document.getElementById("test").style.color = "#FB0A02";
        document.getElementById("index").style.color = "#FB0A02";
      } else {
        attention =
          ". Avoid being outside during midday hours! Make sure you seek shade! Shirt, sunscreen and hat are a must!";
        risklevel = "Extreme";
        document.getElementById("test").style.color = "purple";
        document.getElementById("index").style.color = "purple";
      }
      $("#index").append(index);
      $("#attention").append(attention);
      $("#risklevel").append(risklevel);
      $("#cities").append("Melbourne");
      changeOption();

      zingchart.THEME = "classic";
      var myConfig = {
        graphset: [
          {
            type: "gauge",
            "background-color": "",
            plot: {
              "background-color": "#666"
            },
            plotarea: {
              margin: "0 0 0 0"
            },
            scale: {
              "size-factor": 0.8,
              "offset-y": 120
            },
            tooltip: {
              "background-color": "black"
            },
            "scale-r": {
              values: "0:12:1",
              "border-color": "#b3b3b3",
              "border-width": "2",
              "background-color": "#eeeeee,#b3b3b3",
              ring: {
                size: 15,
                "offset-r": "130px",
                rules: [
                  {
                    rule: "%v >=0 && %v < 2",
                    "background-color": "#348D00"
                  },
                  {
                    rule: "%v >= 2 && %v < 4",
                    "background-color": "#B1AD00"
                  },
                  {
                    rule: "%v >= 4 && %v < 6",
                    "background-color": "#FAC100"
                  },
                  {
                    rule: "%v >= 6 && %v < 8",
                    "background-color": "#EC7928"
                  },
                  {
                    rule: "%v >= 8 && %v < 10",
                    "background-color": "#FB0A02"
                  },
                  {
                    rule: "%v >= 10",
                    "background-color": "purple"
                  }
                ]
              }
            },
            images: [
              // {
              //     "src":"gaugle_scale_mini.png",
              //     "position":"50% 80%"
              // }
            ],
            labels: [
              {
                id: "lbl0",
                x: "50%",
                y: "90%",
                width: 80,
                offsetX: 220,
                textAlign: "center",
                padding: 10,
                anchor: "c",
                text: "Extreme",
                backgroundColor: "purple",
                tooltip: {
                  padding: 10,
                  backgroundColor: "#ea0901",
                  text: ">10 <12",
                  shadow: 0
                }
              },
              {
                id: "lbl1",
                x: "50%",
                y: "90%",
                width: 80,
                offsetX: 140,
                textAlign: "center",
                padding: 10,
                anchor: "c",
                text: "Very High",
                backgroundColor: "#FB0A02",
                tooltip: {
                  padding: 10,
                  backgroundColor: "#ea0901",
                  text: ">8 <10",
                  shadow: 0
                }
              },
              {
                id: "lbl2",
                x: "50%",
                y: "90%",
                width: 80,
                offsetX: 60,
                textAlign: "center",
                padding: 10,
                anchor: "c",
                text: "High",
                backgroundColor: "#EC7928",
                tooltip: {
                  padding: 10,
                  backgroundColor: "#da6817",
                  text: ">6 <8",
                  shadow: 0
                }
              },
              {
                id: "lbl3",
                x: "50%",
                y: "90%",
                width: 80,
                offsetX: -20,
                textAlign: "center",
                padding: 10,
                anchor: "c",
                text: "Medium",
                backgroundColor: "#FAC100",
                tooltip: {
                  padding: 10,
                  backgroundColor: "#e9b000",
                  text: ">4 <6",
                  shadow: 0
                }
              },
              {
                id: "lbl4",
                x: "50%",
                y: "90%",
                width: 80,
                offsetX: -100,
                textAlign: "center",
                padding: 10,
                anchor: "c",
                text: "Low",
                backgroundColor: "#B1AD00",
                tooltip: {
                  padding: 10,
                  backgroundColor: "#a09c00",
                  text: ">2  <4",
                  shadow: 0
                }
              },
              {
                id: "lbl5",
                x: "50%",
                y: "90%",
                width: 80,
                offsetX: -180,
                textAlign: "center",
                padding: 10,
                anchor: "c",
                text: "Very Low",
                backgroundColor: "#348D00",
                tooltip: {
                  padding: 10,
                  backgroundColor: "#237b00",
                  text: ">0  <2",
                  shadow: 0
                }
              }
            ],
            series: [
              {
                values: [index1],
                animation: {
                  method: 5,
                  effect: 2,
                  speed: 2500
                }
              }
            ],
            alpha: 1
          }
        ]
      };

      zingchart.render({
        id: "myChart",
        data: myConfig
      });

      /*
 * assign event listener 
 */
      document
        .getElementById("updateChart")
        .addEventListener("input", function(ev) {
          var inputValue = ev.currentTarget.value;
          document.getElementById("output").textContent = inputValue;

          /*
   * update the value of the chart using zingchart API 
   */
          zingchart.exec("myChart", "setseriesvalues", {
            plotindex: 0,
            values: [parseInt(inputValue)]
          });
        });
    });
}
