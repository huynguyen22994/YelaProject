(function() {
    'use strict';

    angular
        .module('YelaApplication.ProductMgmt')
        .controller('ProductCreateController', ControllerController);

    ControllerController.$inject = [];
    function ControllerController() {
        var vm = this;
        vm.newProduct = {};

        activate();

        ////////////////

        function activate() { }
    }
})();