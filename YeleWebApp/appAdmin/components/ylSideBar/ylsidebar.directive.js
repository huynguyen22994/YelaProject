(function() {
    'use strict';

    angular
        .module('YelaSidebar', [])
        .directive('ylSideBar', Directive);

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
                config: '='
            },
            templateUrl: '/admin/components/ylSideBar/ylsidebar.directive.html'
        };
        return directive;

    }
    /* @ngInject */
    function ControllerController ($scope) {
        console.log($scope.config);
    }
})();