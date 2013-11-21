function drawChart(chartId, dataSource, valueMin, valueMax) {
  range = valueMax-valueMin;
	drawLineGraph(chartId,{
    data : dataSource,
    x : {
      max : dataSource.length
    },
    y : {
      max : valueMax,
      min : valueMin
    },
    guideLine: {
      values: [range/4, 3*range/4]
    }
  });
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
