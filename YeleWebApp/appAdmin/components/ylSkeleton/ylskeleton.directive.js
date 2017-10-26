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
                sidebarConfig: '=',
                currentState: '='
            },
            templateUrl: '/admin/components/ylSkeleton/ylskeleton.directive.html'
        };
        return directive;
        
    }
    /* @ngInject */
    function ControllerController ($scope) {
        console.log($scope.sidebarConfig);

        activate();
        function activate() {
            if (angular.isArray($scope.sidebarConfig.apps)) {
                $scope.sidebarConfig.apps.forEach(function (state) {
                    if (state.name === $scope.currentState.name) {
                        state.active = 'active';
                    } else {
                        state.active = '';
                    }
                });
            }    
        }
    }
})();