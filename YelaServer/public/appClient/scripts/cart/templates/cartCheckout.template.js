(function() {
    'use strict';
    angular
        .module('YelaAppClient.CartApp')
        .run(function ($templateCache) {
            $templateCache.put('cartCheckout.html',
                `   
                <section id="cart_items" class="cart-wrapper">
                    <div class="container">
                        <div class="breadcrumbs">
                            <ol class="breadcrumb">
                            <li><a href="#">{{ 'home' | i18next }}</a></li>
                            <li class="active">{{ 'cart' | i18next }}</li>
                            </ol>
                        </div>

                        <div class="register-req" style="margin-top: -20px">
                            <p>{{ 'noActiveMsg' | i18next }}</p>
                        </div><!--/register-req-->

                        <cart-table config="vm.cartTableConfig" cart-data="vm.cartData"></cart-table>

                    </div>
                </section> <!--/#cart_items-->
            
                <section id="do_action" class="cart-wrapper">
                    <div class="container">
                        <div class="heading">
                            <h3>{{ 'checkShipPrice' | i18next }}</h3>
                            <p>{{ 'checkShipPriceMsg' | i18next }}</p>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="chose_area">
                                    <ul class="user_info">
                                        <li class="single_field">
                                            <label>{{ 'city' | i18next }}:</label>
                                            <select ng-disabled="true">
                                                <option>Hồ Chí Minh</option>
                                            </select>
                                            
                                        </li>
                                        <li class="single_field">
                                            <label>{{ 'township' | i18next }}:</label>
                                            <select>
                                                <option>Quận 12</option>
                                            </select>
                                        
                                        </li>
                                        <li class="single_field zip-field">
                                            <label>{{ 'priceMoney' | i18next }}:</label>
                                            <input type="text" ng-disabled="true">
                                        </li>
                                    </ul>
                                    <a class="btn btn-default update" href="">Kiểm Tra</a>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="total_area">
                                    <ul>
                                        <li>{{ 'totalCart' | i18next }} <span>{{ vm.totalCartPriceFormatted }}</span></li>
                                        <li>{{ 'shipPrice' | i18next }} <span>{{ vm.getShipCost() }}</span></li>
                                        <li>{{ 'totalMoney' | i18next }} <span>{{ vm.total }}</span></li>
                                    </ul>
                                        <a ng-disabled="vm.isCheckOutValid()" ng-click="vm.goToCheckoutPage()" class="btn btn-default update">Thanh Toán</a>
                                        <!-- <a class="btn btn-default check_out" href=""></a> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </section><!--/#do_action-->

                `
            );
        });
})();