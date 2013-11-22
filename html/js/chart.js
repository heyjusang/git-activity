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
  drawGauge(prefix + " .col2 .circularGauge", data[data.length-1], valueMin, valueMax);
  $(prefix + " .label-value").animateNumbers(Number(data[data.length-1].toFixed(2)));
}

function setDataInterval(interval) {
    if (interval == 3) {
      processAll("#scf", data.scf3, 0, 16);
      processAll("#rcf", data.rcf3, 0, 100);
      processAll("#ccr", data.ccr3, 0, 100);
    }
    else if (interval == 6) {
      processAll("#scf", data.scf, 0, 16);
      processAll("#rcf", data.rcf, 0, 100);
      processAll("#ccr", data.ccr, 0, 100);
    }
    else if (interval == 12){
      processAll("#scf", data.scf12, 0, 16);
      processAll("#rcf", data.rcf12, 0, 100);
      processAll("#ccr", data.ccr12, 0, 100);
    }
}

$(window).load(function() {
  $('.header-text').text("Project Activity - " + data.name);
  setDataInterval(6);
});
