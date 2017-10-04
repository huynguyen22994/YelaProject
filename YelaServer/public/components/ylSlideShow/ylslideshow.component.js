(function() {
    'use strict';

    angular
        .module('test')
        .directive('slideShow', Directive);

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
            //link: link,
            restrict: 'A',
            scope: {
            },
            templateUrl: '/components/ylslideshow.html'
        };
        return directive;
        
        // function link(scope, element, attrs) {
        // }
    }
    /* @ngInject */
    function ControllerController () {
        
    }
})();