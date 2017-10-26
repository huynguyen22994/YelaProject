(function() {
    'use strict';

    angular
        .module('YelaAppClient')
        .controller('ClientController', ControllerController);

    ControllerController.$inject = [];
    function ControllerController() {
        var vm = this;
        vm.test = 'ddsf';

        activate();

        ////////////////

        function activate() { }
    }
})();