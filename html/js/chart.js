function drawActivityGraph(chartId, dataSource, predictions, lastDate, valueMin, valueMax) {
  var range = valueMax-valueMin;
	drawLineGraph(chartId,{
    data : dataSource,
    predictionData: predictions,
    x : {
      max : dataSource.length
    },
    y : {
      max : valueMax,
      min : valueMin
    },
    guideLine: {
      values: [25, 50, 75],
			colors: ["#7cd2c7", "#f7c676", "#c5819a"]
    },
    lastDate: lastDate
  });

  $(chartId).scrollLeft($(chartId + ' .lineGraph').width());

  var element = $(chartId).jScrollPane();
  var api = element.data('jsp');
  element.bind(
    'mousewheel',
    function (event, delta, deltaX, deltaY)
    {
      api.scrollByX(delta * 30);
      return false;
    }
  );
}

function drawAnimatingNumber(prefix, data, valueMin, valueMax) {
  var range = valueMax - valueMin;
  var value = Number(data.toFixed(2));
   
	$(prefix + " .label-value").animateNumbers(value, valueMin, valueMax);
  $(prefix + " .max-value").text(" / " + valueMax);
}

function drawProgressBar(graphId, value, valueMin, valueMax) {
  var range = valueMax-valueMin;
  drawProgressBarGraph(graphId, {
    value: value,
    valueMin: valueMin,
    valueMax: valueMax,
    guides: [range/4, 3*range/4],
  });
}

function setTopContributors(parentId, data) {
  drawTopContributors(parentId, {
    data: data
  });
}

function drawDonuts(prefix, data, total) {
  drawTotalDonut(prefix + " .total",  {
    data: data,
    total: total
  });
  drawTopDonut(prefix + " .top",  {
    data: data
  });
}

function processAll(prefix, data, valueMin, valueMax) {
  drawAnimatingNumber(prefix, data, valueMin, valueMax);
  drawProgressBar(prefix + " .row3", data, valueMin, valueMax);
}


$(window).load(function() {
  $('.header-text').text("Project Activity - " + data.name);
  processAll("#rcf", data.activity[data.activity.length -1], 0, 100);
  processAll("#scf", data.scale, 0, 100);
  processAll("#ccr", data.cooperation, 0, 100);
  drawActivityGraph(".activity-graph", data.activity, data.future, data.today, 0, 100);
  drawDonuts(".donuts", data.topContributor, data.size);
  setTopContributors(".top-contributors", data.topContributor);
  $(document).tooltip({
    items: "img.helper",
    content: "ddddd"
  });
});
