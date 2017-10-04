(function() {
    'use strict';

    angular
        .module('YelaApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['HomeService', 'config', 'Value'];
    function HomeController(HomeService, config, Value) {
        var vm = this;
        vm.offset = 0;
        vm.countProductNew = 0;
        vm.offsetProductBestseller = 0;
        vm.countProductBestseller = 0;
        vm.productFreatures = null;

        activate();

        ////////////////

        function activate() { }

        function loadProductFreature() {
            HomeService.getProductFreature()
                .then((res) => {
                    vm.productFreatures = res.data.rows;
                }, (err) => {

                });
        };

        function setProductId() {
            // productId in rootCtrl
            Value.productId = productId;
        };

        function loadProductNew() {
            HomeService.getProductNew($scope.offset)
                .then((res) => {
                    vm.getProductNews = res.data.rows;
                    vm.countProductNew = res.data.count;
                    if (vm.offset == 0) {
                        vm.leftDisableProNew = true;
                    }
                }, (err) => {

                });
        };

    }
})();