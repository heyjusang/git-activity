function drawGaugeGraph(gaugeId, options) {
	var defaults = {

	}

	var width,height,centerX,centerY;

	options = $.extend(true,{},defaults,options);

	width = $(gaugeId).width();
	height = $(gaugeId).height();
	centerX = width/2;
	centerY = height/2;

	var chart = initialize(gaugeId);

	function initialize(gaugeId) {
		var chart = d3.select(gaugeId).append("svg")
		.attr("class", "gaugeGraph")
		.attr("width", width)
		.attr("height", height);

		return chart;
	}

	function drawArc(chart, options) {

	}

}

