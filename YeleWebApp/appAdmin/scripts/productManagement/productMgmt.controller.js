(function() {
    'use strict';

    angular
        .module('YelaApplication.productManagement')
        .controller('productMgmtController', ControllerController);

    ControllerController.$inject = ['productMgmtConstant'];
    function ControllerController(productMgmtConstant) {
        var vm = this;
        vm.sidebarConfig = productMgmtConstant.sideBar;

        activate();

        ////////////////

        function activate() { }
    }
})();