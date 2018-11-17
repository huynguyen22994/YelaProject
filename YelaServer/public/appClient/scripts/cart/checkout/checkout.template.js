(function() {
    'use strict';
    angular
        .module('YelaAppClient.CartApp')
        .run(function ($templateCache) {
            $templateCache.put('checkoutPage.html',
                `   
                    <div ng-if="!vm.isHaveProductInCart()" ng-include="'checkoutPageNoProduct.html'"></div>
                    <div ng-if="vm.isHaveProductInCart()" ng-include="'checkoutPageHaveProduct.html'"></div>
                `
            );
        });
})();

(function() {
    'use strict';
    angular
        .module('YelaAppClient.CartApp')
        .run(function ($templateCache) {
            $templateCache.put('checkoutPageNoProduct.html',
                `   
                <section id="cart_items" class="cart-wrapper">
                    <div class="container">
                        <div class="breadcrumbs">
                            <ol class="breadcrumb">
                            <li><a href="#">Trang Chủ</a></li>
                            <li class="active">Thanh Toán</li>
                            </ol>
                        </div>

                        <div class="register-req" style="margin-top: -20px">
                        <p>Hiện tại bạn chưa có sản phẩm nào trong giỏ hàng. Vui lòng chọn sản phẩm trước khi thanh toán giúp chúng mình nhé.</p>
                    </div><!--/register-req-->
                </section> <!--/#cart_items-->
                `
            );
        });
})();

(function() {
    'use strict';
    angular
        .module('YelaAppClient.CartApp')
        .run(function ($templateCache) {
            $templateCache.put('checkoutPageHaveProduct.html',
                `   
                <section id="cart_items" class="cart-wrapper">
                    <div class="container">
                        <div class="breadcrumbs">
                            <ol class="breadcrumb">
                            <li><a href="#">Trang Chủ</a></li>
                            <li class="active">Thanh Toán</li>
                            </ol>
                        </div>

                        <div class="register-req" style="margin-top: -20px">
                        <p>Bạn có thể đăng ký để có thể dể dàng truy cập vào lịch sử đặt hàng của bạn và có thể nhận được nhiều ưu đãi hơn nhé.</p>
                    </div><!--/register-req-->
        
                    <div class="shopper-informations">
                        <div class="row">
                            <div class="col-sm-3">
                                <div class="shopper-info">
                                    <p>Thông Tin Thanh Toán</p>
                                    <form>
                                        <input type="text" ng-model="vm.billInfo.name" placeholder="*Họ và Tên">
                                        <input type="text" ng-model="vm.billInfo.phoneOne" placeholder="*Số điện thoại 1">
                                        <input type="text" ng-model="vm.billInfo.phoneTwo" placeholder="Số điện thoại 2">
                                        <input type="email" ng-model="vm.billInfo.email" placeholder="Địa chỉ mail">
                                        <select ng-model="vm.billInfo.contry" class="cart-select">
                                            <option>-- Thành Phố --</option>
                                            <option>United States</option>
                                            <option>Bangladesh</option>
                                            <option>UK</option>
                                            <option>India</option>
                                            <option>Pakistan</option>
                                            <option>Ucrane</option>
                                            <option>Canada</option>
                                            <option>Dubai</option>
                                        </select>
                                        <select ng-model="vm.billInfo.region" class="cart-select">
                                            <option>-- Quận/Huyện --</option>
                                            <option>United States</option>
                                            <option>Bangladesh</option>
                                            <option>UK</option>
                                            <option>India</option>
                                            <option>Pakistan</option>
                                            <option>Ucrane</option>
                                            <option>Canada</option>
                                            <option>Dubai</option>
                                        </select>
                                        <input type="text" ng-model="vm.billInfo.address" placeholder="*Địa Chỉ">
                                    </form>
                                </div>
                            </div>
                        
                            <div class="col-sm-4">
                                <div class="order-message">
                                    <p>Thông tin Thêm</p>
                                    <textarea name="message" ng-model="vm.billInfo.description" placeholder="Ghi chú về đơn hàng. Ví dụ: lưu ý khi giao hàng" rows="16"></textarea>
                                </div>	
                            </div>			
                            
                            <div class="col-sm-5">
                                <div class="order-message">
                                    <p>Ship Và Trả Tiền Mặt Khi Nhận Hàng</p>
                                    <textarea ng-disabled="true" name="message" rows="16">Cám ơn Quý khách đã đặt hàng từ FoodTech, xin vui lòng hoàn tất bước tiếp theo để xác nhận đơn hàng. Chúng tôi sẽ gửi đơn đặt hàng điện tử tới hòm thư email của Quý khách khi đơn hàng được đặt thành công!
                                    </textarea>
                                </div>
                                <a class="btn btn-primary" style="float: right">Đặt Hàng</a>
                            </div>
                        </div>
                    </div>
                    <div class="review-payment">
                        <h2>Đơn Hàng Của Bạn</h2>
                    </div>

                    <cart-table config="vm.cartTableCheckoutConfig" cart-data="vm.cartData"></cart-table>

                    </div>
                </section> <!--/#cart_items-->
                `
            );
        });
})();