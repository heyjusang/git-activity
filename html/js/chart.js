function showCurrentMetrics() {

  var rcf = (data.activity.length < 1) ? 0 : data.activity[data.activity.length-1];
  var scf = (data.scale.length < 1) ? 0 : data.scale[data.scale.length-1];
  var ccr = (data.cooperation < 1) ? 0 : data.cooperation[data.cooperation.length-1];

  showAnimatingNumber("#rcf", rcf, 0,100);
  showAnimatingNumber("#scf", scf, 0,100);
  showAnimatingNumber("#ccr", ccr, 0,100);

  showMetricProgress("#rcf .row3", rcf, 0, 100);
  showMetricProgress("#scf .row3", scf, 0, 100);
  showMetricProgress("#ccr .row3", ccr, 0, 100);
}

function showAnimatingNumber(prefix, data, valueMin, valueMax) {
  var range = valueMax - valueMin;
  var value = Number(data.toFixed(2));

	$(prefix + " .label-value").animateNumbers(value, valueMin, valueMax);
  $(prefix + " .max-value").text(" / " + valueMax);
  if (value < 25) {
    $(prefix + " .row1 .helper").text(" 낮음");
    $(prefix + " .row1 .helper").css("color", "#c5819a");
  }
  else if (value >= 75) { 
    $(prefix + " .row1 .helper").text(" 높음");
    $(prefix + " .row1 .helper").css("color", "#7cd2c7");
  }
  else {
    $(prefix + " .row1 .helper").text(" 보통");
    $(prefix + " .row1 .helper").css("color", "#f7c676");
  }
}

function showMetricProgress(graphId, value, valueMin, valueMax) {
  var range = valueMax-valueMin;
  drawProgressBarGraph(graphId, {
    value: value,
    valueMin: valueMin,
    valueMax: valueMax,
    guides: [range/4, 3*range/4],
  });
}

function showActivityGraph(chartId, dataSource, predictions, lastDate, unit, valueMin, valueMax) {

  if (dataSource.length < 1)
    return;

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
      values: [[0,25], [25,75], [75,100]],
      colors: ["#c5819a", "#f7c676", "#7cd2c7"]
    },
    lastDate: lastDate,
    unit: unit
  });

  $(chartId).scrollLeft($(chartId + ' .lineGraph').width());

  var scrollPane = $(chartId).jScrollPane();

  var api = scrollPane.data('jsp'); 
  scrollPane.bind( 
    'mousewheel',
    function (event, delta, deltaX, deltaY) 
    { 
      if (Math.abs(deltaX) < Math.abs(deltaY)) {
        api.scrollByX(deltaY*-50);
        return false;
      }
    } 
  ); 


}

function showCommitDistribution() {
  drawCommitDonuts(".donuts", data.topContributor, data.contributorCount, data.size);
  showTopContributors(".top-contributors", data.topContributor);
}

function drawCommitDonuts(prefix, data, contributorCount, commitCount) {
  drawTotalDonut(prefix + " .total .donuts-graph",  {
    data: data,
    totalContributor: contributorCount,
    totalCommit: commitCount
  });
  drawTopDonut(prefix + " .top .donuts-graph",  {
    data: data
  });
}

function showTopContributors(parentId, data) {
  drawTopContributors(parentId, {
    data: data
  });
}

$(window).load(function() {
  $('.header-text').text("Project Activity - " + data.name);
  showCurrentMetrics();
  showActivityGraph(".activity-graph", data.activity, data.future, data.today, data.unit, 0, 100);
  showCommitDistribution();
});
