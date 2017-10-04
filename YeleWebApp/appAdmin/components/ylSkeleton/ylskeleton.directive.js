(function() {
    'use strict';

    angular
        .module('YelaApplication')
        .directive('ylSkeleton', Directive);

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
            templateUrl: '/components/ylSkeleton/ylskeleton.directive.html'
        };
        return directive;
        
        function link(scope, element, attrs) {
        }
    }
    /* @ngInject */
    function ControllerController () {
        
    }
})();