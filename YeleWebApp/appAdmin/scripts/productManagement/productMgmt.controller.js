(function() {
    'use strict';

    angular
        .module('YelaApplication.productManagement')
        .controller('productMgmtController', ControllerController);

    ControllerController.$inject = ['productMgmtConstant', 'productMgmtService', '$routeParams'];
    function ControllerController(productMgmtConstant, productMgmtService, $routeParams) {
        var vm = this;
        vm.sidebarConfig = productMgmtService.getSideBar();
        vm.home = productMgmtService.getCurrentState($routeParams.route);
        activate();

        ////////////////

        function activate() {
            console.log($routeParams);
            // if ($routeParams.route) {
            //     for (var state in productMgmtConstant.productMgmt) {
            //         if (productMgmtConstant.productMgmt[state].id === $routeParams.route) {
            //             vm.home = productMgmtConstant.productMgmt[state];
            //         }
            //     }
            // } else {
            //     vm.home = productMgmtConstant.productMgmt.home;
            // }
        }
    }
})();