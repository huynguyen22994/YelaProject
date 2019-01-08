(function() {
    'use strict';

    angular
        .module('YelaPieChart', [])
        .directive('ylPieChart', Directive);

    Directive.$inject = [];
    function Directive() {

        var directive = {
            restrict: 'EA',
            scope: {
                data: '=',
                config: '='
            },
            link: function (scope, element) {
                var width,
                height,
                radius,
                pie,
                arc,
                svg,
                path;

                width = element[0].clientWidth ? element[0].clientWidth : 300;
                height = element[0].clientHeight ? element[0].clientHeight : 300;
                radius = Math.min (width, height) / 2;
    
                pie = d3.layout.pie ()
                        .value (function (d) {return d.value;})
                        .sort (null);
    
                arc = d3.svg.arc ()
                        .outerRadius (radius - 20)
                        .innerRadius (radius - 80);
    
                svg = d3.select (element[0])
                        .append ("svg")
                        .attr ({width : width, height : height})
                        .append ("g")
                        .attr ("transform", "translate(" + width * 0.5 + "," + height * 0.5 + ")");
    
                path = svg.datum (scope.data)
                        .selectAll ("path")
                        .data (pie)
                        .enter ()
                        .append ("path")
                        .attr ({
                            fill : function (d, i) {return scope.data [i].color;},
                            d : arc
                        });
                    
                scope.$watch (
                    "data",
                    function () {
                        pie.value (function (d) {return d.value;});
                        path = path.data(pie);
                        path.attr ("d", arc);
                    },
                    true
                );
            }
        };
        return directive;
        
    }
})();