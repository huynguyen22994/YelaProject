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
                            <li><a href="#">Trang Chủ</a></li>
                            <li class="active">Giỏ Hàng</li>
                            </ol>
                        </div>

                        <cart-table config="vm.cartTableConfig" cart-data="vm.cartData"></cart-table>

                    </div>
                </section> <!--/#cart_items-->
            
                <section id="do_action" class="cart-wrapper">
                    <div class="container">
                        <div class="heading">
                            <h3>Kiểm tra phí giao hàng</h3>
                            <p>Quý khách có thể kiểm tra phí giao hàng từ FoodTech đến Quận mình đang ở và xem tổng tiền mình cần thanh toán (đã tính phí giao hàng) ở 2 bảng bên dưới.</p>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="chose_area">
                                    <ul class="user_info">
                                        <li class="single_field">
                                            <label>Thành Phố:</label>
                                            <select ng-disabled="true">
                                                <option>Hồ Chí Minh</option>
                                            </select>
                                            
                                        </li>
                                        <li class="single_field">
                                            <label>Quận:</label>
                                            <select>
                                                <option>Quận 12</option>
                                            </select>
                                        
                                        </li>
                                        <li class="single_field zip-field">
                                            <label>Giá Tiền:</label>
                                            <input type="text" ng-disabled="true">
                                        </li>
                                    </ul>
                                    <a class="btn btn-default update" href="">Kiểm Tra</a>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="total_area">
                                    <ul>
                                        <li>Tổng tiền giỏ hàng <span>{{ vm.totalCartPriceFormatted }}</span></li>
                                        <li>Phí giao hàng <span>{{ vm.getShipCost() }}</span></li>
                                        <li>Tổng tiền <span>{{ vm.total }}</span></li>
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