(function() {
    'use strict';

    angular
        .module('YlTable', [])
        .directive('ylTable', Directive);

    Directive.$inject = [];
    function Directive() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            controller: ControllerController,
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
            },
            templateUrl: '/admin/components/ylTable/yltable.directive.html'
        };
        return directive;

    }
    /* @ngInject */
    function ControllerController ($scope) {
        
    }
})();