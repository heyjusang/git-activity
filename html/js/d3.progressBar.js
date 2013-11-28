function drawProgressBarGraph(chartId, options) {

  var defaults = {
    width: 200,
    height: 50,
    margin : {
      left : 0,
      right: 0,
      top : 0,
      bottom : 0
    },
    value: 50,
    valueMin: 0,
    valueMax: 100,
    guides: [25, 60],
	  guideColors: ["#76c8bd", "#f7c676", "#c5819a"]
  }

  options = $.extend(true,{},defaults,options);

  var width = options.width;
  var height = options.height;
  var value = options.value;

  var xStart = 0 + options.margin.left;
  var xEnd = width - options.margin.right;

  d3.select(chartId + " svg").remove();

  var chart = d3.select(chartId).append("svg")
  .attr("class", "progressBar")
  .attr("width", width)
  .attr("height", height);

  var x = d3.scale.linear()
  .domain([options.valueMin, options.valueMax])
  .range([xStart, xEnd]);

  chart.append("rect")
  .attr("width", xEnd)
  .attr("height", 16)
  .attr("rx", 8)
  .attr("ry", 8)
  .attr("fill", "#f2f2f2");

  var progress = chart.append("rect")
  .attr("height", 16)
  .attr("rx", 8)
  .attr("ry", 8)
  .attr("fill", "#76c8bd")
  .attr("width", x(options.valueMin));

  var guides = options.guides;
  var guideColors = options.guideColors;
  var ticks = [];

  var i;

  for (i=0;i<guides.length;i++) {
    if (guides[i] <= value) {
      ticks.push({
        tick: guides[i],
        color: guideColors[i]
      });
    }
    else {
      break;
    }
  }

  ticks.push({
    tick: value,
    color: guideColors[i]
  });

  var lastTick = ticks[ticks.length - 1];

  progress
  .attr("width", x(options.valueMin))
  .attr("fill", ticks[0].color)
  .transition()
  .duration((ticks[0].tick-options.valueMin)*1000/lastTick.tick)
  .ease("linear")
  .attr("width", x(ticks[0].tick))
  .attr("fill", ticks[0].color) 
  .each("end", function() {generateAnimation(1)});



//TODO duration
  function generateAnimation(i) {
    if (ticks.length < i + 1) {
      return;
    }
    else {
      progress
      .transition()
      .attr("width", x(ticks[i-1].tick))
      .attr("fill", ticks[i-1].color) 
      .duration(1000/ticks.length)
      .duration((ticks[i].tick-ticks[i-1].tick)*1000/lastTick.tick)
      .ease("linear")
      .attr("width", x(ticks[i].tick))
      .attr("fill", ticks[i].color) 
      .each("end", function() {generateAnimation(i+1)});
    }
  };


}
