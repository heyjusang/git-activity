function drawGaugeGraph(gaugeId, options) {
	var defaults = {
		margin: 25,
		data: 30,
		section: {
			startValue: 0,
			endValue: 100,
			ticks: [25, 50, 75],
			startAngle: -140,
			endAngle: 140,
			colors: ["#76c8bd", "#f7c676", "#f7c676", "#c5819a"]
		},
		spindle:{
			radius: 8,
			strokeWidth: 2,
			strokeColor: "#ffffff"
		},
		needle: {
			needleWidth: 2,
			needleColor: "#c2c2c2",
			padding: 7
		},
		interval: {
			padding: 12,
			textAnchor: "middle",
			fontSize: "10px",
			fontColor: "#a7acbc"
		}
	}


	options = $.extend(true,{},defaults,options);

	var width = $(gaugeId).width();
	var height = $(gaugeId).height();
	var centerX = width/2;
	var centerY = height/2;
	var radius = Math.min(width,height) / 2 - options.margin;	

	//draw chart
	var chart = d3.select(gaugeId).append("svg")
	.attr("class", "gaugeGraph")
	.attr("width", width)
	.attr("height", height);

	//draw arc

	var startAngle = options.section.startAngle;
	var endAngle;
	var ticks = options.section.ticks;
	var colors = options.section.colors;
	var intervalAngle = 5;
	for (var i=0; i < ticks.length; i++) {

		var tick = ticks[i]; 

		endAngle = options.section.startAngle + ((options.section.endAngle - options.section.startAngle) * tick) / (options.section.endValue - options.section.startValue);

		var arc = d3.svg.arc()
		.innerRadius(radius-2)
		.outerRadius(radius)
		.startAngle((startAngle + intervalAngle) * (Math.PI/180))
		.endAngle((endAngle - intervalAngle) * (Math.PI/180))

		chart.append("path")
		.attr("d", arc)
		.attr("transform", "translate("+ centerX + "," + centerY + ")")
		.attr("fill", colors[Math.min(i, colors.length)]);

    chart.append("text")
    .text(tick)
    .attr("x", centerX + (radius + options.interval.padding) * Math.sin(endAngle*Math.PI/180))
    .attr("y", centerY - (radius + options.interval.padding) * Math.cos(endAngle*Math.PI/180))
    .attr("dy", 5)
    .attr("text-anchor", options.interval.textAnchor)
    .attr("fill", options.interval.fontColor)
    .attr("font-size", options.interval.fontSize);


		startAngle = endAngle;
	}

	endAngle = options.section.endAngle;

	var arc = d3.svg.arc()
	.innerRadius(radius-2)
	.outerRadius(radius)
	.startAngle((startAngle + intervalAngle) * (Math.PI/180))
	.endAngle((endAngle - intervalAngle) * (Math.PI/180))

	chart.append("path")
	.attr("d", arc)
	.attr("transform", "translate("+ centerX + "," + centerY + ")")
  .attr("fill", colors[colors.length - 1]);

  chart.append("text")
  .text(options.section.startValue)
  .attr("x", centerX + (radius + options.interval.padding) * Math.sin(options.section.startAngle*Math.PI/180))
  .attr("y", centerY - (radius + options.interval.padding) * Math.cos(options.section.startAngle*Math.PI/180))
  .attr("dy", 5)
  .attr("text-anchor", options.interval.textAnchor)
  .attr("fill", options.interval.fontColor)
  .attr("font-size", options.interval.fontSize);

  chart.append("text")
  .text(options.section.endValue)
  .attr("x", centerX + (radius + options.interval.padding) * Math.sin(endAngle*Math.PI/180))
  .attr("y", centerY - (radius + options.interval.padding) * Math.cos(endAngle*Math.PI/180))
  .attr("dy", 5)
  .attr("text-anchor", options.interval.textAnchor)
  .attr("fill", options.interval.fontColor)
  .attr("font-size", options.interval.fontSize);

  //draw spindle

  var spindle = d3.svg.arc()
  .innerRadius(options.spindle.radius - options.spindle.strokeWidth)
  .outerRadius(options.spindle.radius)
  .startAngle(0)
  .endAngle(360 * (Math.PI/180));

  chart.append("path")
  .attr("d", spindle)
  .attr("transform", "translate("+ centerX + "," + centerY + ")")
  .attr("fill", options.spindle.strokeColor);

  //draw needle

  targetAngle = options.section.startAngle + ((options.section.endAngle - options.section.startAngle) * options.data) / (options.section.endValue - options.section.startValue);

  var needle = chart.append("line")
  .attr("x1", centerX)
  .attr("x2", centerX)
  .attr("y1",(centerY - options.spindle.radius))
  .attr("y2",(centerY - radius + options.needle.padding))
  .style("stroke", options.needle.needleColor)
  .style("stroke-width", options.needle.needleWidth);

  needle
  .transition()
  .duration(1000)
  .ease("linear")
  .attrTween("transform", tween);

  function tween(d, i, a) {
    return d3.interpolateString("rotate(" + options.section.startAngle + ", " + centerX + ", " + centerY + ")", "rotate(" + targetAngle + ", " + centerX + ", " + centerY + ")");
  }
}

