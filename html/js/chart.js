function drawChart(chartId, dataSource, valueMin, valueMax) {
  var range = valueMax-valueMin;
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
  var range = valueMax-valueMin;
  drawGaugeGraph(gaugeId, {
    data: value,
    section: {
      startValue: valueMin,
      endValue: valueMax,
      ticks: [range/4, range/2, 3*range/4]
    }
  });
}

function drawAnimatingNumber(prefix, data, valueMin, valueMax) {
  var range = valueMax - valueMin;
  var value = Number(data[data.length-1].toFixed(2));
  
   
  $(prefix + " .label-value").animateNumbers(value, valueMin, valueMax);
  $(prefix + " .max-value").text(" / " + valueMax);
}

function processAll(prefix, data, valueMin, valueMax) {
  drawChart(prefix + " .col3", data, valueMin, valueMax);
  drawGauge(prefix + " .col2 .circularGauge", data[data.length-1], valueMin, valueMax);
  drawAnimatingNumber(prefix, data, valueMin, valueMax);
}

$(window).load(function() {
  $('.header-text').text("Project Activity - " + data.name);
      processAll("#scf", data.scf, 0, 16);
      processAll("#rcf", data.rcf, 0, 100);
      processAll("#ccr", data.ccr, 0, 100);
});
