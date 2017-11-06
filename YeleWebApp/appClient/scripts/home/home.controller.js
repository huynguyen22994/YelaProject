(function() {
    'use strict';

    angular
        .module('YelaAppClient.Home')
        .controller('HomeController', ControllerController);

    ControllerController.$inject = ['products'];
    function ControllerController(products) {
        var vm = this;
        vm.products = products;

        activate();

        ////////////////

        function activate() { }
    }
})();