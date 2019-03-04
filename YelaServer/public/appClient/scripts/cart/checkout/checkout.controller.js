(function() {
    'use strict';

    angular
        .module('YelaAppClient.CartApp')
        .controller('CheckoutController', ControllerController);

    ControllerController.$inject = ['CartService', 'clientConstant', '$rootScope', '$scope', '$q', 'toastr'];
    function ControllerController(CartService, clientConstant, $rootScope, $scope, $q, toastr) {
        var vm = this;
        // total cart price
        vm.total = 0;
        vm.shipCost = 0;
        vm.isCheckoutSuccessPage = false;
        vm.cities = [];
        vm.districts = [];
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
        vm.onCityChange = onCityChange;
        vm.onDistrictChange = onDistrictChange;

        activate();
        ////////////////

        async function activate() { 
            await loadCart();
            vm.totalCartPriceFormatted = vm.cartTableCheckoutConfig.cartTotal;
            updateTotal();
            prepareShipData();
        };

        function loadCart() {
            return new Promise((resolve, reject) => {
                vm.cartData = $rootScope.Cart.getProductList();
                resolve(vm.cartData);
            });
        };

        function getDistrictByCity(cityId) {
            return CartService.getDistrictByCity(cityId);
        };

        function getShipping(cityId, districtId) {
            return CartService.getShipping(cityId, districtId);
        };

        function getCities() {
            return CartService.getAllCities();
        };

        function prepareShipData() {
            return $q.all([
                getCities()
            ]).then(function(data) {
                vm.cities = data[0].rows;
            })
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
            if(isCanCheckOut()) {
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
            } else {
                toastr.error('Giúp chúng mình nhập đầy đủ thông tin ở mục có dấu (*) nhé.');
            }
        }

        function isCanCheckOut() {
            var bill = vm.billInfo;
            var city = bill.contry;
            var district = bill.region;
            return bill.name && bill.phoneOne && bill.address && city.city && district.districtId;
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

        function onCityChange() {
            var city = vm.billInfo.contry;
            vm.billInfo.region = {};
            if(city.cityId) {
                getDistrictByCity(city.cityId)
                    .then(function(districts) {
                        vm.districts = districts;
                    })
            }
        }

        function onDistrictChange() {
            var city = vm.billInfo.contry;
            var district = vm.billInfo.region;
            if(city.cityId && district.districtId) {
                getShipping(city.cityId, district.districtId)
                    .then(function(shipping) {
                        var ship = shipping[0];
                        if(ship){
                            vm.shipCost = ship.cost;
                            vm.cartTableCheckoutConfig.shipCost = ship.cost;
                            
                        } else {
                            vm.shipCost = 0;
                            vm.cartTableCheckoutConfig.shipCost = 0;
                        }
                        updateTotal();
                    })
            }
        }

    }
})();