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
    ControllerController.$inject = ['$scope', '$i18next', 'ModalService'];
    /* @ngInject */
    function ControllerController ($scope, $i18next, ModalService) {
        var vm = this;
        vm.changeLanguage = changeLanguage;
        vm.openMapDialog = openMapDialog;

        ///////////////////////////////
        function changeLanguage(key) {
            $i18next.changeLanguage(key);
        };

        function openMapDialog() {
            ModalService.Open('foodtech-map-dialog');
        };
    }
})();