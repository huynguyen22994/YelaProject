(function() {
    'use strict';

    angular
        .module('FooterApp', [])
        .directive('footerApp', Directive);

    Directive.$inject = [];
    function Directive() {
        var directive = {
            controller: ControllerController,
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
            },
            templateUrl: 'scripts/clientComponents/footer/footer.directive.html'
        };
        return directive;

    }
    /* @ngInject */
    function ControllerController ($scope) {
        var vm = this;

    }
})();