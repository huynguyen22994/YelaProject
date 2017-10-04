(function() {
    'use strict';

    angular
        .module('YelaApplication')
        .directive('ylSideBar', Directive);

    Directive.$inject = [];
    function Directive() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: ControllerController,
            controllerAs: 'vm',
            link: link,
            restrict: 'EA',
            scope: {
            },
            templateUrl: '/components/ylSideBar/ylsidebar.directive.html'
        };
        return directive;
        
        function link(scope, element, attrs) {
        }
    }
    /* @ngInject */
    function ControllerController () {
        
    }
})();