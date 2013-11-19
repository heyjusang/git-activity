function drawGaugeGraph(gaugeId, options) {
  var defaults = {
		margin: 50,
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
		}
	}


	options = $.extend(true,{},defaults,options);

	var width = $(gaugeId).width();
	var height = $(gaugeId).height();
	var centerX = width/2;
	var centerY = height/2;
	var radius = (Math.min(width,height) - options.margin) / 2;	

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

}

