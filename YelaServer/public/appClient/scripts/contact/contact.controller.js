(function() {
    'use strict';

    angular
        .module('YelaAppClient.Contact')
        .controller('ContactController', ControllerController);

    ControllerController.$inject = ['clientConstant', '$location'];
    function ControllerController(clientConstant, $location) {
        var vm = this;

        activate();

        ////////////////

        function activate() { 

        };

    }
})();