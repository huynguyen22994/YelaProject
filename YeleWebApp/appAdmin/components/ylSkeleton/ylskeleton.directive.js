(function() {
    'use strict';

    angular
        .module('YelaSkeleton', ['YelaSidebar', 'YlTable'])
        .directive('ylSkeleton', Directive);

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
                sidebarConfig: '='
            },
            templateUrl: '/admin/components/ylSkeleton/ylskeleton.directive.html'
        };
        return directive;
        
    }
    /* @ngInject */
    function ControllerController ($scope) {
        //console.log($scope.sidebarConfig);
    }
})();