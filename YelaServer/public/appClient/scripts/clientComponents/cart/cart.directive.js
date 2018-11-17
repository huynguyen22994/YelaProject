(function() {
    'use strict';

    angular
        .module('CartTable', [])
        .directive('cartTable', Directive);

    Directive.$inject = [];
    function Directive() {
        var directive = {
            controller: ControllerController,
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
                config: '=',
                cartData: '='
            },
            template: `
            <div class="table-responsive cart_info">
                <table class="table table-condensed">
                    <thead>
                        <tr class="cart_menu">
                            <td ng-repeat="attr in config.attrs" ng-class="attr.class">{{ attr.i18name | i18next }}</td>
                            <td ng-if="!config.isView"></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr ng-repeat="product in cartData">
                            <td class="cart_product cart_image">
                                <a href=""><img class="img-responsive" src="{{ product.linkImg }}" alt=""></a>
                            </td>
                            <td class="cart_description">
                                <h4><a href="">{{ product.name }}</a></h4>
                                <p>FoodTech</p>
                            </td>
                            <td class="cart_price">
                                <p>{{ product.getPrice() }}</p>
                            </td>
                            <td class="cart_quantity">
                                <div class="cart_quantity_button">
                                    <a ng-if="!config.isView" class="cart_quantity_up" style="cursor: pointer" ng-click="vm.upQuantity(product)"> + </a>
                                    <input class="cart_quantity_input" ng-disabled="true" type="text" name="quantity" value="{{ product.getQuantity() }}" autocomplete="off" size="2">
                                    <a ng-if="!config.isView" class="cart_quantity_down" style="cursor: pointer" ng-click="vm.downQuantity(product)"> - </a>
                                </div>
                            </td>
                            <td class="cart_total">
                                <p class="cart_total_price">{{ vm.getCurrencyParsed(product.getPriceWithQuantity()) }}</p>
                            </td>
                            <td ng-if="!config.isView" class="cart_delete">
                                <a class="cart_quantity_delete" ng-click="vm.removeProduct(product)"><i class="fa fa-times"></i></a>
                            </td>
                        </tr>

                        <tr ng-if="cartData && cartData.length > 0 && !config.isView">
                            <td class="cart_product"></td>
                            <td class="cart_description"></td>
                            <td class="cart_price"></td>
                            <td class="cart_description">
                                <h4><a>{{ 'totalMoney' | i18next }}:</a></h4>
                            </td>
                            <td class="cart_total" style="padding-top: 23px">
                                <p class="cart_total_price">{{ vm.total }}</p>
                            </td>
                            <td class="cart_delete"></td>
                        </tr>

                        <tr ng-if="config.isView">
                            <td colspan="4">&nbsp;</td>
                            <td colspan="2">
                                <table class="table table-condensed total-result">
                                    <tr>
                                        <td>Tổng Tiền Trong Giỏ Hàng</td>
                                        <td>{{ vm.total }}</td>
                                    </tr>
                                    <tr class="shipping-cost">
                                        <td>Phí Giao Hàng</td>
                                        <td>{{ vm.getCurrencyParsed(config.shipCost) }}</td>										
                                    </tr>
                                    <tr>
                                        <td>Tổng Tiền Đơn Hàng</td>
                                        <td><span>{{ vm.getTotalCartView(vm.total, config.shipCost) }}</span></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
            `
        };
        return directive;
        
    }
    /* @ngInject */
    function ControllerController ($scope, $rootScope) {
        var vm = this;
        vm.totalPrice = 0;
        vm.total = getTotalPrice();
        vm.removeProduct = removeProduct;
        vm.downQuantity = downQuantity;
        vm.upQuantity = upQuantity;
        vm.getCurrencyParsed = getCurrencyParsed;
        vm.getTotalCartView = getTotalCartView;
        /////////////////////////////
        function getTotalPrice() {
            if(angular.isArray($scope.cartData)) {
                angular.forEach($scope.cartData, function(product) {
                    vm.totalPrice = vm.totalPrice + product.getPriceWithQuantity();
                })
            }
            $scope.config.cartTotal = vm.totalPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
            return vm.totalPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        }

        function removeProduct(product) {
            $rootScope.Cart.removeProduct(product);
            updateToTalPrice();
        }

        function updateToTalPrice() {
            vm.totalPrice = 0;
            vm.total = getTotalPrice();
        }

        function downQuantity(product) {
            product.downQuantity();
            updateToTalPrice();
        }

        function upQuantity(product) {
            product.upQuantity();
            updateToTalPrice();
        }

        function getCurrencyParsed(number) {
            if(angular.isNumber(number)) {
                return number.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
            }
            return number;
        }

        function getTotalCartView(cartTotal, shipCost) {
            var cart = 0, ship = 0;
            cart = angular.isNumber(cartTotal) ? cartTotal : getParseCurrencyToNumber(cartTotal);
            ship = angular.isNumber(shipCost) ? shipCost : getParseCurrencyToNumber(shipCost);
            return getCurrencyParsed(cart + ship);
        }

        function getParseCurrencyToNumber(currency) {
            return Number(currency.replace(/[^0-9.-]+/g,"")) * 1000;
        }
        
    }
})();