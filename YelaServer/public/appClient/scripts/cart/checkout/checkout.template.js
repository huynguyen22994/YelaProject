(function() {
    'use strict';
    angular
        .module('YelaAppClient.CartApp')
        .run(function ($templateCache) {
            $templateCache.put('checkoutPage.html',
                `   
                    <div ng-if="!vm.isHaveProductInCart() && !vm.isCheckoutSuccess()" ng-include="'checkoutPageNoProduct.html'"></div>
                    <div ng-if="vm.isHaveProductInCart() && !vm.isCheckoutSuccess()" ng-include="'checkoutPageHaveProduct.html'"></div>
                    <div ng-if="vm.isCheckoutSuccess()" ng-include="'checkoutSuccessPage.html'"></div>
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
            $templateCache.put('checkoutSuccessPage.html',
                `   
                <section id="cart_items" class="cart-wrapper">
                    <div class="container">
                        <div class="breadcrumbs">
                            <ol class="breadcrumb">
                            <li><a href="#">Trang Chủ</a></li>
                            <li class="active">Thanh Toán</li>
                            </ol>
                        </div>

                        <div style="text-align: center; margin-bottom: 3rem">
                            <h3 style="color: #696763">Xác nhận đơn hàng thành công!</h3>
                            <h4 style="color: #696763">Cám ơn bạn đã cho chúng tôi cơ hội để phục vụ</h4>
                        </div>

                        <div class="register-req" style="margin-top: -20px">
                            <h5>Mã đơn hàng của bạn: <i>{{ vm.billInfoSuccess.billId }}</i></h5>
                            <p>Cám ơn bạn đã đặt hàng tại quán ăn của chúng tôi. Trong vòng 5 phút nhân viên của FoodTech gọi điện hoặc nhắn tin để xác nhận đơn hàng của bạn.</p>
                            <div class="row" style="padding-top: 2rem">
                                <div class="col-sm-6">
                                    <label>Thông tin giao hàng</label>
                                    <div class="total_area">
                                        <ul style="padding-left: inherit">
                                            <li>Khách hàng: <span>{{ vm.billInfoSuccess.customerName }}</span></li>
                                            <li>Địa chỉ: <span>{{ vm.billInfoSuccess.address }}</span></li>
                                            <li>SĐT 1: <span>{{ vm.billInfoSuccess.phoneOne }}</span></li>
                                            <li>SĐT 2: <span>{{ vm.billInfoSuccess.phoneTwo }}</span></li>
                                        </ul>
                                    </div>
                                    <label>Sản phẩm đã đặt</label>
                                    <div class="total_area">
                                        <ul style="padding-left: inherit">
                                            <li ng-repeat="food in vm.billInfoSuccess.itemsObject.foods">{{ food.name }} <span>{{ vm.formatMoney(food.price) }}</span></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <label>Tóm tắt đơn hàng</label>
                                    <div class="total_area">
                                        <ul style="padding-left: inherit">
                                            <li>Ngày đặt: <span>{{ vm.billInfoSuccess.orderDate }}</span></li>
                                            <li>Giá tiền sản phẩm: <span>{{ vm.formatMoney(vm.billInfoSuccess.itemsObject.totalPrice) }}</span></li>
                                            <li>Phí giao hàng: <span>{{ vm.formatMoney(vm.billInfoSuccess.itemsObject.shipCost) }}</span></li>
                                            <!--<li>Khuyến mãi: <span>{{ vm.billInfoSuccess.itemsObject }}</span></li>-->
                                            <li>Tổng cộng: <span>{{ vm.formatMoney(vm.billInfoSuccess.itemsObject.totalBill) }}</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
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
                                        <label>{{ '*Họ và Tên' | i18next }}:</label>
                                        <input type="text" ng-model="vm.billInfo.name">
                                        <label>{{ '*Số điện thoại 1' | i18next }}:</label>
                                        <input type="text" ng-model="vm.billInfo.phoneOne">
                                        <label>{{ 'Số điện thoại 2' | i18next }}:</label>
                                        <input type="text" ng-model="vm.billInfo.phoneTwo">
                                        <label>{{ 'Email' | i18next }}:</label>
                                        <input type="email" ng-model="vm.billInfo.email">
                                        <label>{{ '*Thành Phố' | i18next }}:</label>
                                        <select
                                            class="cart-select"
                                            ng-options="option.city for option in vm.cities track by option.cityId" 
                                            ng-model="vm.billInfo.contry">
                                        </select>
                                        <label>{{ '*Quận/Huyện' | i18next }}:</label>
                                        <select
                                        class="cart-select"
                                            ng-options="option.district for option in vm.districts track by option.districtId" 
                                            ng-model="vm.billInfo.region">
                                        </select>
                                        <label>{{ '*Địa Chỉ' | i18next }}:</label>
                                        <input type="text" ng-model="vm.billInfo.address">
                                    </form>
                                </div>
                            </div>
                        
                            <div class="col-sm-4">
                                <div class="order-message">
                                    <p>Thông tin Thêm</p>
                                    <textarea name="message" style="height: 515px" ng-model="vm.billInfo.description" placeholder="Ghi chú về đơn hàng. Ví dụ: lưu ý khi giao hàng" rows="16"></textarea>
                                </div>	
                            </div>			
                            
                            <div class="col-sm-5">
                                <div class="order-message">
                                    <p>Ship Và Trả Tiền Mặt Khi Nhận Hàng</p>
                                    <textarea ng-disabled="true" style="height: 515px" name="message" rows="16">Cám ơn Quý khách đã đặt hàng từ FoodTech, xin vui lòng hoàn tất bước tiếp theo để xác nhận đơn hàng. Chúng tôi sẽ gửi đơn đặt hàng điện tử tới hòm thư email của Quý khách khi đơn hàng được đặt thành công!
                                    </textarea>
                                </div>
                                <a class="btn btn-primary" ng-click="vm.onCheckOut()" style="float: right">Đặt Hàng</a>
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