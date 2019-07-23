(function() {
    'use strict';

    angular
        .module('YelaLineChart', [])
        .directive('ylLineChart', Directive);

    Directive.$inject = [];
    function Directive() {

        var directive = {
            restrict: 'EA',
            scope: {
                data: '=',
                config: '='
            },
            link: function (scope, element) {
                var vis;
                var width;
                var height;
                var margin;
                var xRange;
                var yRange;
                var xAxis;
                var yAxis;
                var lineFunc;
     
                function getWidthDefault() {
                    if(_.get(scope, 'config.svgWidth')) {
                        return _.get(scope, 'config.svgWidth');
                    }
                    return window.innerWidth < 700 ? 300 : 600;
                }

                element.addClass ('line-chart');

                width = element[0].clientWidth ? element[0].clientWidth : getWidthDefault();
                        height = element[0].clientHeight ? element[0].clientHeight : 300;
                        margin = 35;

                vis = d3.select (element[0])
                        .append ("svg")
                        .attr ({width : width, height : height});
     
                xRange = d3.scale.linear ()
                            .range ([margin, width - margin])
                            .domain ([0,_.get(scope, 'data').length]);
     
                xAxis = d3.svg.axis ()
                            .scale (xRange)
                            .tickValues([]);
     
                vis.append ("svg:g")
                    .attr ("class", "x axis")
                    .attr ("transform", "translate(0," + (height - margin) + ")")
                    .call (xAxis);
     
                yRange = d3.scale.linear ()
                            .range ([height - margin, margin])
                            .domain ([0, 100]);
                
                yAxis = d3.svg.axis()
                            .scale(yRange)
                            .tickValues([])
                            .orient("left");
     
                vis.append ("svg:g")
                    .attr ("class", "y axis")
                    .attr ("transform", "translate(" + (margin) + ",0)")
                    .call (yAxis);
     
                lineFunc = d3.svg.line ()
                    .x (function (d, i) {return xRange (i);})
                    .y (function (d) {return yRange (d.value);})
                    .interpolate ('cardinal');
     
                var path = vis.append ("svg:path")
                    .attr ("d", lineFunc (scope.data))
                    .attr ("stroke", "black")
                    .attr ("stroke-width", 1)
                    .attr ("fill", "none");
     
                var circle = vis.selectAll ("circle")
                                .data (scope.data);
     
                circle.enter ().append ("circle")
                    .attr ("cx", function (d, i) {return i * ((width - margin*2)/_.get(scope, 'data').length) + margin;})
                    .attr ("cy", function (d) {return height - margin - (d.value/100)*height;})
                    .attr ("r", 4)
                    .style ("fill", function (d) {return d.color;});
     
                circle.enter ().append ('text')
                .attr("dx", function(d, i){return i * ((width - margin*2)/_.get(scope, 'data').length) + margin;})
                .attr("dy", function(d){return height - margin - (d.value/100)*height;})
                .text(function(d){return d.label})
                
                
                scope.$watch (
                    "data",
                    function () {
                        path.attr ("d", lineFunc (scope.data));
     
                        vis.selectAll ("circle")
                            .attr ("cy", function (d) {return height - margin - (d.value/100)*(height-margin*2);});
                    },
                    true
                );
            }
        };
        return directive;
        
    }
})();