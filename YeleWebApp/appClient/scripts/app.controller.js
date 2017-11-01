(function() {
    'use strict';

    angular
        .module('YelaAppClient')
        .controller('ClientController', ControllerController);

    ControllerController.$inject = ['$i18next'];
    function ControllerController($i18next) {
        var vm = this;

        activate();

        ////////////////

        function activate() { };

    }
})();