(function() {
    'use strict';

    angular
        .module('FooterApp', [
            'jm.i18next'
        ])
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
    function ControllerController ($scope, $i18next) {
        var vm = this;
        vm.changeLanguage = changeLanguage;

        ///////////////////////////////
        function changeLanguage(key) {
            $i18next.changeLanguage(key);
        };
    }
})();