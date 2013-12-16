function drawLineGraph(chartId, options) {
	var defaults = {
		data : [],
    predictionData : [],
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
    y : {
      max : 100,
      min : 0,
      tick : 25
    },
    guideLine: {
      values: [[0,25], [75,100]],
			colors: ["#f7c676", "#c5819a"]
    },
    lastDate: "2013-11",
    unit: 0
  };

  options = $.extend(true,{},defaults,options);

  var totalData = options.data.concat(options.predictionData);

  var width = (options.data.length + options.predictionData.length) * 40;
  var height = $(chartId).height();

  var xStart = 0 + options.margin.left + 20;
  var xEnd = width - options.margin.right;
  var yStart = height - options.margin.bottom - 30;
  var yEnd = 0 + options.margin.top;

  var xMin = 0;
  var xMax = options.data.length + options.predictionData.length - 1;
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

  var predictedDay = new Date(options.lastDate + options.unit * (options.predictionData.length + 1));

  var markedYear;

  var xAxis = d3.svg.axis().scale(x).ticks(totalData.length)
  .tickFormat(function(d,i) {
    date = new Date(predictedDay - (options.unit *  (totalData.length - i)));
    console.log(date, i);
    if (markedYear == date.getFullYear()) {
      return (date.getMonth() + 1) + ". " + date.getDate();
    }
    else {
      markedYear = date.getFullYear();
      return date.getFullYear() + ". " + (date.getMonth() + 1) + ". " + date.getDate(); 
    }
  });

  var yAxis = d3.svg.axis().scale(y).ticks((yMax-yMin)/options.y.tick).orient("left");

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
    scope = options.guideLine.values[i];
    color = options.guideLine.colors[Math.min(i, options.guideLine.colors.length)];
    var area = d3.svg.area()
    .x(function(d) { 
      return x(d);
    })
    .y0(function(d) {
      return y(scope[0]);
    })
    .y1(function(d) {
      return y(scope[1]);
    });

    var path = chart.append("path")
    .attr("d", area([xMin, xMax]))
    .style("fill", color)
    .style("opacity", 0.4);
  }

  var halfLine = chart.append("line")
  .attr("x1", x(xMin))
  .attr("x2", x(xMax))
  .attr("y1", y((yMin+yMax)/2))
  .attr("y2", y((yMin+yMax)/2))
  .style("stroke", "#d2d2d2")
  .style("stroke-width", 2)
  .style("stroke-dasharray", ("1","1"));


  var activityPath = drawPath(options.data, 0, false);

  var predictions = options.predictionData;
  predictions.unshift(options.data[options.data.length-1]);
  var predictionPath = drawPath(predictions, options.data.length-1, true);

  function drawPath(data, init, isFuture) {
    var initLine = d3.svg.line()
    .interpolate("basis")
    .x(function(d,i) {
      return x(i + init);
    })
    .y(function(d) {
      return y(0);
    });

    var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d,i) {
      return x(i + init);
    })
    .y(function(d) {
      return y(d);
    });

    var path = chart.append("path")
    .attr("d", initLine(data))
    .style(options.dataLine)
    .style("stroke-width", options.dataLine.strokeWidth)
    .style("stroke-dasharray", function() {
      if(isFuture)
        return ("3","3");
      else
        return;
    })
    .transition()
    .duration(1000)
    .ease("linear")
    .attr("d", line(data));

    return path;
  };

}
