function drawTopContributors(parentId, options) {

  var defaults = {
    data : {},
    color : ["#209D61", "#175E94", "#E68D17", "#E65217", "#90BADB", "#F6D09C", "#F6B69C", "#5FA5DB", "#58DEA4", "#F68C62"]
  };
  options = $.extend(true,{},defaults,options);

  var color = options.color;

  for (var i = 0; i < options.data.length; i++) {
    var contributor = options.data[i];
    var id = "contributor" + i;
    $(parentId).append('<div class="contributor" id="' + id + '"></div>');
    $("#"+id).append('<div class="row1"></div>');
    $("#"+id).append('<div class="row2"></div>');
    $("#"+id + " .row1").append('<img class="contributor-image" src="css/images/contributor_default.png"></img>');
    $("#"+id + " .row1").append('<div class="contributor-information"></div>');
    $("#"+id + " .contributor-information").append('<div class="contributor-name"></div>');
    $("#"+id + " .contributor-information").append('<div class="contributor-commit-title"></div>');
    $("#"+id + " .contributor-information").append('<div class="contributor-commit-count"></div>');
    $("#"+id + " .contributor-name").text(contributor.name);
    $("#"+id + " .contributor-commit-title").text("커밋 수 : ");
    $("#"+id + " .contributor-commit-count").text(contributor.count);
    $("#"+id + " .row2").css("background-color", color[i]);
  }
}

function drawTotalDonut(chartId, options) {
  var defaults = {
    data : {},
    totalContributor: 0,
    totalCommit: 0,
    color : ["#f7c676","#f2f2f2"]
  };
  options = $.extend(true,{},defaults,options);

  var counts = 0;

  for (var i = 0; i < options.data.length; i++) {
    counts += options.data[i].count;
  }

  var data = [];
  data.push({name:"상위 " + options.data.length + "명", count:counts});
  data.push({name:"나머지 " + (options.totalContributor - options.data.length) + "명", count:options.totalCommit - counts});

  drawDonutGraph(chartId, data, options.totalCommit ,options.color);

}

function drawTopDonut(chartId, options) {

  var defaults = {
    data : {},
    color : ["#109D61", "#175E94", "#E68D17", "#E65217", "#90BADB", "#F6D09C", "#F6B69C", "#5FA5DB", "#58DEA4", "#F68C62"]
  };
  options = $.extend(true,{},defaults,options);

  var counts = 0;

  for (var i = 0; i < options.data.length; i++) {
    counts += options.data[i].count;
  }

  var data = options.data;

  var color = options.color;

  var chart = drawDonutGraph(chartId, data, counts, options.color);

}

function drawDonutGraph(chartId, data, total, color) {
  var width = $(chartId).width();
  var height = $(chartId).height();
  var radius = Math.min(width, height) / 2;

  d3.select(chartId + " svg").remove();

  var chart = d3.select(chartId).append("svg")
  .attr("class", "donutGraph")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + radius + "," + radius + ")");

  var arc = d3.svg.arc()
  .outerRadius(radius - 10)
  .innerRadius(radius - 80);

  var pie = d3.layout.pie()
  .sort(null)
  .value(function(d) {return d.count;});

  var g = chart.selectAll(".arc")
  .data(pie(data))
  .enter().append("g")
  .attr("class", "arc");

  g.append("path")
  .attr("d", arc)
  .style("fill", function(d, i) { return color[i]; });

  g.append("text")
  .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
  .attr("dy", ".35em")
  .style("text-anchor", "middle")
  .style("font-size", 15)
  .text(function(d) {
    var p = Math.round(100 * d.data.count/total);
    if (p >= 6) {
      return p + "%";
    }
    else {
      return ;
    }
  });


  var legend = chart.selectAll(".legend")
  .data(data)
  .enter().append("g")
  .attr("class", "legend")
  .attr("transform", function(d, i) { return "translate(" + (radius + 20) + "," + (((i+1) * 20) - radius)  + ")"; });

  legend.append("rect")
  .attr("width", 15)
  .attr("height", 15)
  .style("fill", function(d,i) { return color[i];});

  legend.append("text")
  .attr("x", 24)
  .attr("y", 9)
  .attr("dy", ".20em")
  .attr("font-size", 12)
  .text(function(d) { return d.name; });

  return chart;

}
