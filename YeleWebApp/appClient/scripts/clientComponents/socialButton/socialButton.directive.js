(function() {
    'use strict';

    angular
        .module('SocialButton', [])
        .directive('socialButton', Directive);

    Directive.$inject = [];
    function Directive() {
        var directive = {
            controller: ControllerController,
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
            },
            templateUrl: 'scripts/clientComponents/socialButton/socialButton.directive.html'
        };
        return directive;
        
    }
    /* @ngInject */
    function ControllerController ($scope) {
        var vm = this;
    }
})();