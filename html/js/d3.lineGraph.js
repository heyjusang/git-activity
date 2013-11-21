function drawLineGraph(chartId, options) {
	var defaults = {
		data : {},
		margin : {
			left : 30,
			right : 5,
			top : 10,
			bottom : 20
		},
		axis : {
			fontSize: "12px",
      opacity: 0.5
    },
    dataLine: {
      stroke : "#7cd2c7",
      strokeWidth : "2px",
      fill : "none"
    },
    x : {
      max : 50,
      min : 0,
      tick : 2
    },
    y : {
      max : 100,
      min : 0,
      tick : 25
    },
    guideLine: {
      values: [25, 75],
			colors: ["#f7c676", "#c5819a"]
    }
  };

  options = $.extend(true,{},defaults,options);

  var width = $(chartId).width();
  var height = $(chartId).height();

  var xStart = 0 + options.margin.left;
  var xEnd = width - options.margin.right;
  var yStart = height - options.margin.bottom;
  var yEnd = 0 + options.margin.top;

  var xMin = options.x.min;
  var xMax = options.x.max;
  var yMin = options.y.min;
  var yMax = options.y.max;

  d3.select(chartId + " svg").remove();

  var chart = d3.select(chartId).append("svg")
  .attr("class", "lineGraph")
  .attr("width", width)
  .attr("height", height);


  var x = d3.scale.linear().domain([xMin, xMax]).range([xStart, xEnd]);
  var y = d3.scale.linear().domain([yMin, yMax]).range([yStart, yEnd]);

  //TODO control tick
  var xAxis = d3.svg.axis().scale(x).ticks(25);
  var yAxis = d3.svg.axis().scale(y).ticks(4).orient("left");

  chart.append("g")
  .attr("transform", "translate(0,"+ yStart + ")")
  .attr("class", "xAxis")
  .style("shape-rendering", "crispEdges")
  .style("opacity", options.axis.opacity)
  .style("font-size", options.axis.fontSize)
  .call(xAxis);

  chart.append("g")
  .attr("transform", "translate(" + xStart + ",0)")
  .attr("class", "yAxis")
  .style("shape-rendering", "crispEdges")
  .style("opacity", options.axis.opacity)
  .style("font-size", options.axis.fontSize)
  .call(yAxis);

  //draw GuideLine

  for (var i = 0; i < options.guideLine.values.length; i++) {
    value = options.guideLine.values[i];
    color = options.guideLine.colors[Math.min(i, options.guideLine.colors.length)];
    var guideLine = d3.svg.line()
    .x(function(d) {
      return x(d);
    })
    .y(function(d) {
      return y(value);
    });

    var path = chart.append("path")
    .attr("d", guideLine([xMin,xMax]))
    .style("shape-rendering", "crispEdges")
    .style("stroke", color);
  }



  var line = d3.svg.line()
  .interpolate("basis")
  .x(function(d,i) {
    return x(i);
  })
  .y(function(d) {
    return y(d);
  });

  var path = chart.append("path")
  .attr("d", line(options.data))
  .style(options.dataLine)
  .style("stroke-width", options.dataLine.strokeWidth);

  //animation
  var totalLength = path.node().getTotalLength();
  path
  .attr("stroke-dasharray", totalLength + " " + totalLength)
  .attr("stroke-dashoffset", totalLength)
  .transition()
  .duration(1000)
  .ease("linear")
  .attr("stroke-dashoffset", 0);

}
