(function() {
    var data = [
        d3.range(40).map(function(i) {
            return {x: i / 39, y: (Math.sin(i / 3) + 2) / 4};
        }),
        d3.range(41).map(function(i) {
            return {x: 5 * Math.cos((i % 40) * Math.PI * 2 / 40), y: 5 * Math.sin((i % 40) * Math.PI * 2 / 40)};
        }),
        d3.range(50).map(function(i) {
            return {x: (i - 25) / 5, y: (Math.pow(Math.E, -Math.pow(((i - 25) / 5), 2) / 2)) / (1 * Math.sqrt(2 * Math.PI))};
        })
    ];
    var lineSet = [
        "line1", "", "line2"
    ], dotSet = [
        "dot1", "", "dot2"
    ];

    var data2 = [
        d3.range(40).map(function(i) {
            return {x: i / 39, y: (Math.sin(i / 3) + 2) / 4};
        }),
        d3.range(40).map(function(i) {
            return {x: i / 39, y: (Math.cos(i / 3) + 2) / 4};
        })
    ];

    var margin = {top: 10, right: 15, bottom: 25, left: 40},
        width = 400 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var x = [
            [0, 1], [-5, 5], [-5, 5]
    ], x2 = [0, 1];
    var y = [
        [0, 1], [-5, 5], [0, 0.7]
    ], y2 = [0, 1];
    var line = d3.svg.line()
        .interpolate("basis")
        .x(function(d) { return ex(d.x); })
        .y(function(d) { return ey(d.y); });


    document.addEventListener('DOMContentLoaded', function() {
        d3.selectAll(".d3").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .append("path")
            .data(data)
            .map(function(data_i, idx) {
                var dx = d3.scale.linear()
                        .domain(x[idx])
                        .range([0, width]);
                var dy = d3.scale.linear()
                        .domain(y[idx])
                        .range([height, 0]);
                var line = d3.svg.line()
                    .interpolate("basis")
                    .x(function(d) { return dx(d.x); })
                    .y(function(d) { return dy(d.y); });
                d3.select(this)
                    .datum(data_i)
                    .attr("class", (lineSet[idx].length) ? (lineSet[idx]) : ("line1"))
                    .attr("d", line);
                var _ppnode = d3.select(d3.select(this)[0][0].parentNode);

                (dotSet[idx].length &&
                 _ppnode.selectAll(".dot")
                     .data(data_i)
                     .enter().append("circle")
                     .attr("class", dotSet[idx])
                     .attr("cx", line.x())
                     .attr("cy", line.y())
                     .attr("r", 2.5)
                );

                var xAxis = d3.svg.axis()
                    .scale(d3.scale.linear()
                            .domain(x[idx])
                            .range([0, width]))
                    .orient("bottom");

                var yAxis = d3.svg.axis()
                        .scale(d3.scale.linear()
                                .domain(y[idx])
                                .range([height, 0]))
                        .orient("left");

                _ppnode.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);
                _ppnode.append("g")
                        .attr("class", "y axis")
                        .call(yAxis);
            });
        var $svgs = d3.selectAll("#multilines").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        data2.map(function(data_i, idx) {
            var dx = d3.scale.linear()
                .domain(x2)
                .range([0, width]);
            var dy = d3.scale.linear()
                .domain(y2)
                .range([height, 0]);
            var line = d3.svg.line()
                .interpolate("basis")
                .x(function(d) { return dx(d.x); })
                .y(function(d) { return dy(d.y); });
            var tmp = $svgs.append("g").append("path")
                .attr("class", ("line" + (idx + 1)))
                .datum(data_i)
                .attr("d", line);

            d3.select(tmp[0][0].parentNode).selectAll(".dot")
                .data(data_i)
                .enter().append("circle")
                .attr("class", ("dot" + (idx + 1)))
                .attr("cx", line.x())
                .attr("cy", line.y())
                .attr("r", 2.5);
        });
        var xAxis2 = d3.svg.axis()
            .scale(d3.scale.linear()
                    .domain(x2)
                    .range([0, width]))
            .orient("bottom");

        var yAxis2 = d3.svg.axis()
            .scale(d3.scale.linear()
                    .domain(y2)
                    .range([height, 0]))
            .orient("left");

        $svgs.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis2);
        $svgs.append("g")
            .attr("class", "y axis")
            .call(yAxis2);


        var x3 = d3.scale.linear()
            .domain([.05, .95])
            .range([0, width]);

        var y3 = d3.scale.linear()
            .range([0, height]);

        var height2 = 80;
        var svg = d3.select("#axis").append("svg")
            .attr("width", width + margin.right + margin.left)
            .attr("height", height2 + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.append("g")
            .attr("class", "x minor")
            .attr("transform", "translate(0," + height2 + ")")
            .call(d3.svg.axis().scale(x3).tickSubdivide(2).tickSize(-6));

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height2 + ")")
            .call(d3.svg.axis().scale(x3));

    }, false);
})();
