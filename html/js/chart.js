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
      values: [[0,25], [25,75], [75,100]],
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

function drawDonuts(prefix, data, contributorCount, commitCount) {
  drawTotalDonut(prefix + " .total",  {
    data: data,
    totalContributor: contributorCount,
    totalCommit: commitCount
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
    description = "최근 6개월간 커밋 빈도와 전체 개발 기간 커밋 빈도의 비를 점수화한 지표.";
  }
  else if (tag == Tag.scf) {
    description = "최근 6개월간 커밋 횟수를 점수화한 지표.";
  }
  else if (tag == Tag.ccr) {
    description = "최근 6개월간 다른 이의 코드를 고친 횟수와 최근 6개월간 전체 커밋 횟수의 비를 점수화한 지표.";
  }
  else if (tag == Tag.activityGraph) {
    description = "활동성 변화 양상과 앞으로의 변화 방향을 예측하여 나타낸 그래프입니다.";
  }
  else if (tag == Tag.commitInformation) {
    description = "커밋 분포 정보를 나타냅니다. 첫번째 그래프는 커밋을 많이 한 상위 10명의 커밋 비율을 나타내고, 두번째 그래프는 상위 10명간의 커밋 비율을 나타냅니다. ";
  }

  var format = "<div class='tooltip-description'>" + description + "</div>";

  if (tag == Tag.scf || tag == Tag.rcf || tag == Tag.ccr)  {
		var grades = " <div class='tooltip-grades'"
		+ "<p>" + goodScope + " : " + "<span class='good'>높음</span>" + "</p>"
		+ "<p>" + normalScope + " : " + "<span class='normal'>보통</span>" + "</p>"
		+ "<p>" + badScope + " : " + "<span class='bad'>낮음</span>" + "</p>"
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
	drawDonuts(".donuts", data.topContributor, data.contributorCount, data.size);
	setTopContributors(".top-contributors", data.topContributor);
	$(document).tooltip({
		items: "img.helper",
		content: function() {
			return showTooltip($(this).attr("alt"));
		}
	});
});
