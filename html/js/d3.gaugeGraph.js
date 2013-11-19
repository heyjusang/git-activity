function drawGaugeGraph(gaugeId, options) {
  var defaults = {
		margin: 50,
		scale: {
			startValue: 0,
			endValue: 100,
			ticks: [25, 50, 75],
			colors: ["#76c8bd", "#f7c676", "#f7c676", "#c5819a"]
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
	
	var startAngle = 0;
	var endAngle;
	var ticks = options.scale.ticks;
	var colors = options.scale.colors;
	var intervalAngle = 5;
	for (var i=0; i < ticks.length; i++) {

		var tick = ticks[i]; 

		endAngle = (260 * tick) / (options.scale.endValue - options.scale.startValue);

		var arc = d3.svg.arc()
		.innerRadius(radius-2)
		.outerRadius(radius)
		.startAngle((startAngle - 130 + intervalAngle) * (Math.PI/180))
		.endAngle((endAngle - 130 - intervalAngle) * (Math.PI/180))

		chart.append("path")
		.attr("d", arc)
		.attr("transform", "translate("+ centerX + "," + centerY + ")")
		.attr("fill", colors[Math.min(i, colors.length)]);

		startAngle = endAngle;
	}

	endAngle = 260;

	var arc = d3.svg.arc()
	.innerRadius(radius-2)
	.outerRadius(radius)
	.startAngle((startAngle - 130 + intervalAngle) * (Math.PI/180))
	.endAngle((endAngle - 130 - intervalAngle) * (Math.PI/180))

	chart.append("path")
	.attr("d", arc)
	.attr("transform", "translate("+ centerX + "," + centerY + ")")
	.attr("fill", colors[colors.length - 1]);


}

