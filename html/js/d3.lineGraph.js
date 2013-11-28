function drawLineGraph(chartId, options) {
	var defaults = {
		data : {},
		margin : {
			left : 5,
			right : 5,
			top : 10,
			bottom : 50
		},
		axis : {
			fontSize: "12px",
      opacity: 0.5
    },
    dataLine: {
      stroke : "#7cd2c7",
      strokeWidth : "7px",
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
    },
    lastDate: "2013-11"
  };

  options = $.extend(true,{},defaults,options);

  var width = options.data.length * 50;
  var height = $(chartId).height();

  var xStart = 0 + options.margin.left + 20;
  var xEnd = width - options.margin.right;
  var yStart = height - options.margin.bottom - 30;
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

  var yAxisArea = d3.select(".yAxis-area").append("svg")
  .attr("width", $(".yAxis-area").width())
  .attr("height", height);


  var x = d3.scale.linear().domain([xMin, xMax]).range([xStart, xEnd]);
  var y = d3.scale.linear().domain([yMin, yMax]).range([yStart, yEnd]);

  var year = options.lastDate.split("-")[0];
  var month = options.lastDate.split("-")[1];
  var markedYear;
  //TODO control tick
  var xAxis = d3.svg.axis().scale(x).ticks(options.data.length)
  .tickFormat(function(d,i) {
    if (i == options.data.length)
      return; 

    date = new Date(year, month - (options.data.length - i));
    if (markedYear == date.getFullYear()) {
      return (date.getMonth() + 1);
    }
    else {
      markedYear = date.getFullYear();
      return date.getFullYear() + "-" + (date.getMonth() + 1); 
    }
  });
  var yAxis = d3.svg.axis().scale(y).ticks(4).orient("left");

  chart.append("g")
  .attr("transform", "translate(0,"+ yStart + ")")
  .attr("class", "xAxis")
  .style("shape-rendering", "crispEdges")
  .style("opacity", options.axis.opacity)
  .style("font-size", options.axis.fontSize)
  .call(xAxis)
  .selectAll("text")
  .style("text-anchor", "end")
  .attr("dx", "-.8em")
  .attr("dy", ".15em")
  .attr("transform", function(d) {
    return "rotate(-65)" 
  });




  yAxisArea.append("g")
  .attr("transform", "translate(" + 30 + ",0)")
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
    .style("stroke-width", 2)
    .style("stroke", color);
  }


  var initLine = d3.svg.line()
  .interpolate("basis")
  .x(function(d,i) {
    return x(i);
  })
  .y(function(d) {
    return y(0);
  });

  var line = d3.svg.line()
  .interpolate("basis")
  .x(function(d,i) {
    return x(i);
  })
  .y(function(d) {
    return y(d);
  });

  var path = chart.append("path")
  .attr("d", initLine(options.data))
  .style(options.dataLine)
  .style("stroke-width", options.dataLine.strokeWidth)
  .transition()
  .duration(1000)
  .ease("linear")
  .attr("d", line(options.data));

}
