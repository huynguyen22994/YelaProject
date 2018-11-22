(function() {
    'use strict';

    angular
        .module('YelaAppClient.CartApp')
        .controller('CheckoutController', ControllerController);

    ControllerController.$inject = ['CartService', 'clientConstant', '$rootScope', '$scope'];
    function ControllerController(CartService, clientConstant, $rootScope, $scope) {
        var vm = this;
        // total cart price
        vm.total = 0;
        vm.shipCost = 20000;
        vm.isCheckoutSuccessPage = false;
        // config for cart table in checkout page
        vm.cartTableCheckoutConfig = CartService.getCartTableConfig();
        vm.cartTableCheckoutConfig.isView = true;
        vm.cartTableCheckoutConfig.shipCost = vm.shipCost;
        // Bill Info
        vm.billInfo = CartService.getBillInfo();
        vm.billInfoSuccess = CartService.getBillInfoSuccess();

        vm.getShipCost = getShipCost;
        vm.isCheckOutValid = isCheckOutValid;
        vm.goToCheckoutPage = goToCheckoutPage;
        vm.isHaveProductInCart = isHaveProductInCart;
        vm.isCheckoutSuccess = isCheckoutSuccess;
        vm.onCheckOut = onCheckOut;
        vm.formatMoney = formatMoney;

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
         
        function isCheckOutValid() {
            return CartService.getParseCurrencyToNumber(vm.total) <= 0
        };

        function goToCheckoutPage() {
            vm.cartState.isCartPage = false;
            vm.cartTableCheckoutConfig.shipCost = vm.shipCost;
        };

        function isHaveProductInCart() {
            return angular.isArray(vm.cartData) ? vm.cartData.length > 0 : false;
        }

        function onCheckOut() {
            vm.billInfo.items = {
                foods: angular.copy(vm.cartData),
                shipCost: vm.shipCost
            }
            var billParsed = CartService.getParseBillRequest(vm.billInfo);
            CartService.createBill(billParsed).then(function(response) {
                var data = response.data;
                if(data) {
                    vm.billInfoSuccess = data;
                    goToCheckOutSuccessPage();
                }
            }, function(err) {
                console.log(err);
            }).catch(function(err) {
                console.log(err);
            })
        }

        function goToCheckOutSuccessPage() {
            vm.isCheckoutSuccessPage = true;
        }

        function isCheckoutSuccess() {
            return vm.isCheckoutSuccessPage;
        }

        function formatMoney(number) {
            return number.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        }

    }
})();