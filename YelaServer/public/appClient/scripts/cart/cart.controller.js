(function() {
    'use strict';

    angular
        .module('YelaAppClient.CartApp')
        .controller('CartController', ControllerController);

    ControllerController.$inject = ['CartService', 'clientConstant', '$rootScope', '$scope', '$location', '$q'];
    function ControllerController(CartService, clientConstant, $rootScope, $scope, $location, $q) {
        var vm = this;
        vm.cartTableConfig = CartService.getCartTableConfig();
        // shipping
        vm.cities = [];
        vm.districts = [];
        vm.CityObj = {};
        vm.DistrictObj = {};
        vm.ShippingObj = {};
        // total cart price
        vm.total = 0;
        vm.shipCost = 0;
        // config for cart table in checkout page
        vm.cartTableCheckoutConfig = CartService.getCartTableConfig();
        vm.cartTableCheckoutConfig.isView = true;
        vm.cartTableCheckoutConfig.shipCost = vm.shipCost;
        // cart cost value
        vm.cartTableConfig.cartTotal = 0;
        vm.totalCartPrice = 0;
        vm.totalCartPriceFormatted = 0;
        // vm.cartState = CartService.getCartState();

        vm.getShipCost = getShipCost;
        vm.isCheckOutValid = isCheckOutValid;
        vm.goToCheckoutPage = goToCheckoutPage;

        activate();
        ////////////////

        async function activate() { 
            await loadCart();
            vm.totalCartPriceFormatted = vm.cartTableConfig.cartTotal;
            updateTotal();
            prepareShipData();
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
            //  var total = CartService.getParseCurrencyToNumber(vm.totalCartPriceFormatted) + vm.shipCost;
            var total = CartService.getParseCurrencyToNumber(vm.totalCartPriceFormatted);
             vm.total = total.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        };

        function getShipCost() {
            return vm.shipCost ? vm.shipCost.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}) : '0';
        };

        function isCheckOutValid() {
            // for trial
            //return true;
            return CartService.getParseCurrencyToNumber(vm.total) <= 0
        };

        function goToCheckoutPage() {
            //vm.cartTableCheckoutConfig.shipCost = vm.shipCost;
            $location.path('/checkout'); 
        };

        function getCities() {
            return CartService.getAllCities();
        };

        function getDistricts(cityId) {
            if(cityId) {
                CartService.getAllDistricts(cityId)
                    .then(function(res) {
                        vm.districts = res;
                    })
            }
        };

        function getShipping(cityId, districtId) {
            return CartService.getShipping(cityId, districtId)
                .then(function(res) {
                    var theShipping = res[0];
                    vm.ShippingObj = theShipping;
                    if(theShipping) {
                        vm.shipCost = vm.ShippingObj.cost ? vm.ShippingObj.cost : 0;
                    } else {
                        vm.shipCost = 0;
                    }
                    vm.cartTableCheckoutConfig.shipCost = vm.shipCost;
                    updateTotal();
                })
        };

        function prepareShipData() {
            return $q.all([
                getCities()
            ]).then(function(data) {
                vm.cities = data[0].rows;
            })
        };

        var clearCartWatch = $scope.$watch('vm.cartTableConfig.cartTotal', function(newVal, oldVal) {
            vm.totalCartPriceFormatted = newVal;
            updateTotal();
        });

        var clearCityWatch = $scope.$watch('vm.CityObj.cityId', function(newVal, oldVal) {
            if(newVal && newVal !== oldVal) {
                getDistricts(vm.CityObj.cityId);
            }
        });

        var clearDistrictWatch = $scope.$watch('vm.DistrictObj.districtId', function(newVal, oldVal) {
            if(newVal && newVal !== oldVal) {
                getShipping(vm.CityObj.cityId, vm.DistrictObj.districtId);
            }
        });

        $scope.$on('$destroy', function () {
            clearCartWatch();
            clearCityWatch();
            clearDistrictWatch();
        });

    }
})();