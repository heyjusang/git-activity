function drawProgressBarGraph(chartId, options) {

  var defaults = {
    width: 200,
    height: 50,
    margin : {
      left : 0,
      right: 0,
      top : 0,
      bottom : 0
    },
    value: 50,
    valueMin: 0,
    valueMax: 100
  }

  options = $.extend(true,{},defaults,options);

  var width = options.width;
  var height = options.height;

  var xStart = 0 + options.margin.left;
  var xEnd = width - options.margin.right;

  d3.select(chartId + " svg").remove();

  var chart = d3.select(chartId).append("svg")
  .attr("class", "progressBar")
  .attr("width", width)
  .attr("height", height);

  var x = d3.scale.linear()
  .domain([options.valueMin, options.valueMax])
  .range([xStart, xEnd]);

  chart.append("rect")
  .attr("width", xEnd)
  .attr("height", 16)
  .attr("rx", 8)
  .attr("ry", 8)
  .attr("fill", "#f2f2f2");

  var progress = chart.append("rect")
  .attr("height", 16)
  .attr("rx", 8)
  .attr("ry", 8)
  .attr("fill", "#76c8bd");

  var range = options.valueMax - options.valueMin;

  progress
  .attr("width", x(options.valueMin))
  .transition()
  .duration(1000)
  .ease("linear")
  .attr("width", x(options.value)); //TODO color
}
