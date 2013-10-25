
function parseData(data, valueMax) {
    var result = [];
    for (var i = 0; i < data.length; i++)
        result.push({ index: i, value: Math.min(valueMax, Number(data[i].toFixed(2)))});
    return result;
}

function drawChart(chartId, dataSource, valueMin, valueMax) {
    $(chartId).dxChart({
        dataSource: dataSource,
        commonSeriesSettings: {
            type: "spline",
            argumentField: "index",
            color: "#7cd2c7"
        },
        commonAxisSettings: {
            grid: {
                visible: true
            }
        },
        argumentAxis: {
            title: {
                margin: 2,
                text: "Month",
                font: {
                    size: 13
                }
            },
            valueMarginsEnabled: false,
            min: 0,
            max: dataSource.length - 1,
            tickInterval: 1
        },
        valueAxis: {
            valueMarginsEnabled: false,
            min: valueMin,
            max: valueMax,
            tickInterval: (valueMax - valueMin) / 4
        },
        series: {
            valueField: "value", 
            point: {
                size: 0
            }
        },
        tooltip: {
            enabled: true
        },
        legend: {
            visible: false
        },
        commonPaneSettings: {
            border: {
                visible: true,
                bottom: false
            }
        }
    });
};

function drawGauge(gaugeId, value, valueMin, valueMax) {
    $(gaugeId).dxCircularGauge({
        margin: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
        },
        containerBackgroundColor: "#363e5b",
        spindle: {
            color: "#ffffff"
        },
        scale: {
            startValue: valueMin,
            endValue: valueMax,
            majorTick: {
                color: 'none',
                tickInterval : (valueMax - valueMin) / 4
            },
            label: {
                font: {
                    color: '#a7acbc',
                    indentFromTick: 8
                }
            },
        },
        rangeContainer: {
            width :3,
            backgroundColor: 'none',
            ranges: [
                {
                    startValue: valueMin,
                    endValue : valueMin + (valueMax - valueMin) / 4 - (valueMax - valueMin) / 40,
                    color: '#76c8bd'
                },
                {
                    startValue: valueMin + (valueMax - valueMin) / 4 + (valueMax - valueMin) / 40,
                    endValue : valueMin + (valueMax - valueMin) / 2 - (valueMax - valueMin) / 40,
                    color: '#f7c676'
                },
                {
                    startValue: valueMin + (valueMax - valueMin) / 2 + (valueMax - valueMin) / 40,
                    endValue : valueMin + (valueMax - valueMin) * 3 / 4 - (valueMax - valueMin) / 40,
                    color: '#f7c676'
                },
                {
                    startValue: valueMin + (valueMax - valueMin) * 3 / 4 + (valueMax - valueMin) / 40,
                    endValue : valueMax,
                    color: '#c5819a'
                },
            ]
        },
        needles: [
            {
                offset: 5,
                indentFromCenter: 7,
                value: value 
            }
        ],
        preset: 'preset1'
    });
};

function processAll(prefix, data, valueMin, valueMax) {
    var source = parseData(data, valueMax);
    drawChart(prefix + " .col3", source, valueMin, valueMax);
    drawGauge(prefix + " .circularGauge", source[source.length-1].value, valueMin, valueMax);
    $(prefix + " .label-value").animateNumbers(source[source.length-1].value);
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
