function parseData(data, valueMax) {
    var result = [];
    for (var i = 0; i < data.length; i++)
        result.push({ index: i, value: Math.min(valueMax, Number(data[i].toFixed(2)))});
    return result;
}

function drawChart(chartId, dataSource, valueMin, valueMax) {
	drawLineGraph(chartId,{
		data : dataSource});
}

function drawGauge(gaugeId, value, valueMin, valueMax) {
  range = valueMax-valueMin;
	drawGaugeGraph(gaugeId, {
    data: value,
    section: {
      startValue: valueMin,
      endValue: valueMax,
      ticks: [range/4, range/2, 3*range/4]
    }
	});
}

function processAll(prefix, data, valueMin, valueMax) {
	var source = parseData(data, valueMax);
	drawChart(prefix + " .col3", data, valueMin, valueMax);
	drawGauge(prefix + " .circularGauge", data[data.length-1], valueMin, valueMax);
	$(prefix + " .label-value").animateNumbers(Number(data[data.length-1].toFixed(2)));
}


$(window).load(function() {
	$('.header-text').text("Project Activity - " + data.name);
	if (data.scf.length > 0) {
		processAll("#scf", data.scf, 0, 16);
		processAll("#rcf", data.rcf, 0, 100);
		processAll("#ruci", data.ruci, 0, 100);
		processAll("#ccr", data.ccr, 0, 100);
	}
});
