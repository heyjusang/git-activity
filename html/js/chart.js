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

function showTooltip(tag) {

  var Tag = {
    rcf: "rcf",
    scf: "scf",
    ccr: "ccr",
    activityGraph: "activity-graph",
    commitInformation: "commit-information"
  };

  var description;
  var badScope = "0 ~ 24";
  var normalScope = "25 ~ 74";
  var goodScope = "75 ~ 100";
  
  if (tag == Tag.rcf) {
    description = "활동성을 나타냅니다. 활동성은 이렇게 이렇게 저렇게 저렇게 구합니다.";
  }
  else if (tag == Tag.scf) {
    description = "성장규모를 나타냅니다. 성장규모는 이렇게 이렇게 저렇게 저렇게 구합니다.";
  }
  else if (tag == Tag.ccr) {
    description = "협업정도를 나타냅니다. 협업정도는 이렇게 이렇게 저렇게 저렇게 구합니다.";
  }
  else if (tag == Tag.activityGraph) {
    description = "활동성의 변화 그래프입니다. 활동성은 이렇게 이렇게 저렇게 저렇게 구합니다.";
  }
  else if (tag == Tag.commitInformation) {
    description = "커밋 분포 정보를 나타냅니다. 첫번째는 커밋을 많이 한 상위 10명의 커밋 비율이고 두번째 그래프는 그냥 딱보면 아는 그거입니다";
  }

  var format = "<div class='tooltip-description'>" + description + "</div>";

  if (tag == Tag.rcf || tag == Tag.scf || tag == Tag.ccr) {

    var grades = " <div class='tooltip-grades'"
    + "<p>" + goodScope + " : " + "<span class='good'>좋아요</span>" + "</p>"
    + "<p>" + normalScope + " : " + "<span class='normal'>보통이요</span>" + "</p>"
    + "<p>" + badScope + " : " + "<span class='bad'>나빠요</span>" + "</p>"
    + "</div>";

    format += grades;
  }


  return format;
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
    content: function() {
      return showTooltip($(this).attr("alt"));
    }
  });
});
