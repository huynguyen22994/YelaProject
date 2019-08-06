(function() {
    'use strict';
    angular
        .module('YelaAppClient.CartApp')
        .run(runFunction);
        runFunction.$inject = ['$templateCache'];
        function runFunction($templateCache) {
            $templateCache.put('checkout.html',
                `   
                <section id="cart_items" class="cart-wrapper">
                    <div class="container">
                        <div class="breadcrumbs">
                            <ol class="breadcrumb">
                            <li><a href="#">Trang Chủ</a></li>
                            <li class="active">Giỏ Hàng</li>
                            </ol>
                        </div>

                        <div class="register-req" style="margin-top: -20px">
                        <p>Please use Register And Checkout to easily get access to your order history, or use Checkout as Guest</p>
                    </div><!--/register-req-->
        
                    <div class="shopper-informations">
                        <div class="row">
                            <div class="col-sm-3">
                                <div class="shopper-info">
                                    <p>Thông Tin Thanh Toán</p>
                                    <form>
                                        <input type="text" placeholder="*Họ và Tên">
                                        <input type="text" placeholder="Số điện thoại 1">
                                        <input type="text" placeholder="Số điện thoại 2">
                                        <input type="email" placeholder="Địa chỉ mail">
                                        <select class="cart-select">
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
                                        <select class="cart-select">
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
                                        <input type="text" placeholder="Địa Chỉ">
                                    </form>
                                </div>
                            </div>
                        
                            <div class="col-sm-4">
                                <div class="order-message">
                                    <p>Thông tin Thêm</p>
                                    <textarea name="message"  placeholder="Ghi chú về đơn hàng. Ví dụ: lưu ý khi giao hàng" rows="16"></textarea>
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
        };
})();