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
            templateUrl: '/admin/components/ylNavBar/ylnavbar.directive.html'
        };
        return directive;
        
    }
    /* @ngInject */
    function ControllerController ($scope) {

        $scope.isSubMenu = isSubMenu;

        function isSubMenu(menu) {
            return (angular.isArray(menu.apps) && menu.apps.length !== 0) ? true : false;  
        };
    }
})();