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
		guideLine : {
			line : {
				stroke : "#a7acbc",
				strokeWidth : "1px",
				opacity : 0.5
			}
		},
		dataLine: {
			line: {
				stroke : "#7cd2c7",
				strokeWidth : "2px",
				fill : "none"
			}
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
		}
	};
	var width,height,xStart,xEnd,yStart,yEnd,xMin,xMax,xTick,yMax,yMin,yTick;

	options = $.extend(true,{},defaults,options);

	width = $(chartId).width();
	height = $(chartId).height();

	xStart = 0 + options.margin.left;
	xEnd = width - options.margin.right;
	yStart = height - options.margin.bottom;
	yEnd = 0 + options.margin.top;
	xMin = options.x.min;
	xMax = options.x.max;
	xTick = options.x.tick;
	yMin = options.y.min;
	yMax = options.y.max;
	yTick = options.y.tick;


	var chart = initialize(chartId);

	drawAxis(chart, options.axis);
	drawData(chart, options.data, options.dataLine); 

	function initialize(chartId) {
		var chart = d3.select(chartId).append("svg")
		.attr("class", "lineGraph")
		.attr("width", width)
		.attr("height", height);

		return chart;
	}

	function drawAxis(chart, options) {
		var x = d3.scale.linear().domain([xMin, xMax]).range([xStart, xEnd]);
		var y = d3.scale.linear().domain([yMin, yMax]).range([yStart, yEnd]);

		var xAxis = d3.svg.axis().scale(x).ticks(25);
		var yAxis = d3.svg.axis().scale(y).ticks(4).orient("left");

		chart.append("g")
		.attr("transform", "translate(0,"+ yStart + ")")
		.attr("class", "xAxis")
		.style("shape-rendering", "crispEdges")
		.style("opacity", options.opacity)
		.style("font-size", options.fontSize)
		.call(xAxis);

		chart.append("g")
		.attr("transform", "translate(" + xStart + ",0)")
		.attr("class", "yAxis")
		.style("shape-rendering", "crispEdges")
		.style("opacity", options.opacity)
		.style("font-size", options.fontSize)
		.call(yAxis);
	}

	function drawData(chart, data, options) {
		var x = d3.scale.linear().domain([xMin, xMax]).range([xStart, xEnd]);
		var y = d3.scale.linear().domain([yMin, yMax]).range([yStart, yEnd]);
		var line = d3.svg.line()
		.interpolate("basis")
		.x(function(d,i) {
			return x(i);
		})
		.y(function(d) {
			return y(d);
		});


		var path = chart.append("svg:path")
		.attr("d", line(data))
		.style(options.line)
		.style("stroke-width", options.line.strokeWidth);

		//animation
		var totalLength = path.node().getTotalLength();
		path
		.attr("stroke-dasharray", totalLength + " " + totalLength)
		.attr("stroke-dashoffset", totalLength)
		.transition()
		.duration(2000)
		.ease("linear")
		.attr("stroke-dashoffset", 0);

	}
}