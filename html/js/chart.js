function drawActivityGraph(chartId, dataSource, lastDate, valueMin, valueMax) {
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
    },
    lastDate: lastDate
  });

  $(chartId).scrollLeft(2000);

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
  var value = Number(data[data.length-1].toFixed(2));
   
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

function drawDonuts(prefix, data) {
  drawTotalDonut(prefix + " .total",  {
    data: data,
    total: 20000
  });
  drawTopDonut(prefix + " .top",  {
    data: data
  });
}

function processAll(prefix, data, valueMin, valueMax) {
  drawAnimatingNumber(prefix, data, valueMin, valueMax);
  drawProgressBar(prefix + " .row3", data[data.length-1], valueMin, valueMax);
}


$(window).load(function() {
  $('.header-text').text("Project Activity - " + data.name);
  processAll("#rcf", data.rcf, 0, 100);
  processAll("#scf", data.scf, 0, 12);
  processAll("#ccr", data.ccr, 0, 100);
  drawActivityGraph(".activity-graph", data.rcf, data.lastDate, 0, 100);
  drawDonuts(".donuts", data.topContributor);
  setTopContributors(".top-contributors", data.topContributor);
  $(document).tooltip({
    items: "img.helper",
    content: "ddddd"
  });
});
