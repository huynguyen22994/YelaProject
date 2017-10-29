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
    function ControllerController ($scope, $location) {
        //console.log($scope.config);
        $scope.isSubSidebar = isSubSidebar;
        $scope.toggleSubSideBar = toggleSubSideBar;
        $scope.routeUrl = routeUrl;

        function isSubSidebar(sidebar) {
            return angular.isArray(sidebar.apps) && sidebar.apps.length > 0 ; 
        };

        function toggleSubSideBar(sidebar) {
            if (isSubSidebar(sidebar)) {
                $scope.toogle = !$scope.toogle;
            } else {
                routeUrl(sidebar);
            }
        };

        function routeUrl(sidebar) {
            $location.path(sidebar.url);
        };
    }
})();