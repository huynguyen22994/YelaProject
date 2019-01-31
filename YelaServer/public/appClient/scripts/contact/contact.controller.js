(function() {
    'use strict';

    angular
        .module('YelaAppClient.Contact')
        .controller('ContactController', ControllerController);

    ControllerController.$inject = ['clientConstant', '$location'];
    function ControllerController(clientConstant, $location) {
        var vm = this;
        vm.letter = {};

        vm.submitLetter = submitLetter;

        activate();

        ////////////////
        function activate() { 

        };

        function submitLetter() {
            console.log(vm.letter);
        }

    }
})();