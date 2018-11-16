(function() {
    'use strict';

    angular
        .module('YelaAppClient.CartApp')
        .controller('CartController', ControllerController);

    ControllerController.$inject = ['CartService', 'clientConstant', '$rootScope', '$scope'];
    function ControllerController(CartService, clientConstant, $rootScope, $scope) {
        var vm = this;
        vm.cartTableConfig = CartService.getCartTableConfig();
        // cart cost value
        vm.cartTableConfig.cartTotal = 0;
        vm.totalCartPrice = 0;
        vm.totalCartPriceFormatted = 0;
        // total cart price
        vm.total = 0;
        vm.shipCost = 0;

        vm.getShipCost = getShipCost;

        activate();
        ////////////////

        async function activate() { 
            await loadCart();
            vm.totalCartPriceFormatted = vm.cartTableConfig.cartTotal;
            updateTotal();
        };

        function loadCart() {
            return new Promise((resolve, reject) => {
                vm.cartData = $rootScope.Cart.getProductList();
                resolve(vm.cartData);
            });
        };

        function getCartTotal() {
            return new Promise((resolve, reject) => {
                if(angular.isArray(vm.cartData)) {
                    angular.forEach(vm.cartData, function(product) {
                        vm.totalCartPrice = vm.totalCartPrice + product.price;
                    })
                }
                resolve(vm.totalCartPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}));
            });
        };

        function updateTotal() {
             var total = CartService.getParseCurrencyToNumber(vm.totalCartPriceFormatted) + vm.shipCost;
             vm.total = total.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        };

        function getShipCost() {
            return vm.shipCost ? vm.shipCost.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}) : 'Miễn Phí';
        };

        $scope.$watch('vm.cartTableConfig.cartTotal', function(newVal, oldVal) {
            vm.totalCartPriceFormatted = newVal;
            updateTotal();
        });

    }
})();