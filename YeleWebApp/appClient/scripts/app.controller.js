(function() {
    'use strict';

    angular
        .module('YelaAppClient')
        .controller('ClientController', ControllerController);

    ControllerController.$inject = ['$i18next', '$timeout'];
    function ControllerController($, $timeout) {
        var vm = this;

        activate();

        ////////////////

        function activate() { 
            $timeout(function() {
                vm.spinnerHide = true;
            }, 3000);
        };

    }
})();