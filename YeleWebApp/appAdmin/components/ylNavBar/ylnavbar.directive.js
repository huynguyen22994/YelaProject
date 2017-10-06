(function() {
    'use strict';

    angular
        .module('YelaApplication')
        .directive('ylNavBar', Directive);

    Directive.$inject = [];
    function Directive() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            controller: ControllerController,
            restrict: 'EA',
            scope: {
                config: '='
            },
            templateUrl: '/components/ylNavBar/ylnavbar.directive.html'
        };
        return directive;
        
    }
    /* @ngInject */
    function ControllerController ($scope) {
        console.log($scope.config);
    }
})();