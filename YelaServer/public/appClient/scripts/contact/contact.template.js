(function() {
    'use strict';
    angular
        .module('YelaAppClient.Contact')
        .run(function ($templateCache) {
            $templateCache.put('contact.html',
                `               
                <div id="contact-page" class="container">
                    <div class="bg">
                        <!--<div class="row">    		
                            <div class="col-sm-12">    			   			
                                <h2 class="title text-center">Liên Hệ</h2>   			    				    				
                                <div id="map" class="contact-map" style="height: 400px !important">
                                </div>
                            </div>			 		
                        </div>-->    	
                        <div class="row">  	
                            <div class="col-sm-8">
                                <div class="contact-form">
                                    <h2 class="title text-center">Để Lại Lời Nhắn Cho Chúng Tôi</h2>
                                    <div class="status alert alert-success" style="display: none"></div>
                                    <form id="main-contact-form" class="contact-form row" name="contact-form" method="post">
                                        <div class="form-group col-md-6">
                                            <input type="text" name="phone" class="form-control" required="required" ng-model="vm.letter.phone" placeholder="Số điện thoai">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <input type="email" name="email" class="form-control" required="required" ng-model="vm.letter.email" placeholder="Email">
                                        </div>
                                        <div class="form-group col-md-12">
                                            <input type="text" name="subject" class="form-control" required="required" ng-model="vm.letter.name" placeholder="Họ Tên">
                                        </div>
                                        <div class="form-group col-md-12">
                                            <textarea name="message" id="message" required="required" class="form-control" rows="8" ng-model="vm.letter.message" placeholder="Nhập lời nhắn của bạn"></textarea>
                                        </div>                        
                                        <div class="form-group col-md-12">
                                            <input type="submit" name="submit" class="btn btn-primary pull-right" ng-click="vm.submitLetter()" value="Gửi">
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="col-sm-4" style="text-align: left">
                                <div class="contact-info">
                                    <h2 class="title text-center">Thông Tin Liên Hệ</h2>
                                    <address>
                                        <p>Điện thoại: 0933800024</p>
                                        </br>
                                        <p>Địa chỉ: 11/3a Bis, KP 1, Phường Đông Hưng Thuận, Quận 12, TP Hồ Chí Minh</p>
                                        </br>
                                        <p>Email: foodtechshopvn@gmail.com</p>
                                    </address>
                                    <div class="social-networks">
                                        <h2 class="title text-center">Mạng Xã Hội</h2>
                                        <ul>
                                            <li>
                                                <a href="https://www.facebook.com/foodtechshop" target="_blank"><i class="fa fa-facebook"></i></a>
                                            </li>
                                            <li>
                                                <a href="https://www.instagram.com/foodtechshop.vn" target="_blank"><i class="fa fa-instagram"></i></a>
                                            </li>
                                            <li>
                                                <a href="https://shopee.vn/foodtechshop" target="_blank"><i class="fa fa-shopping-bag"></i></a>
                                            </li>
                                            <li>
                                                <a href="https://www.youtube.com/channel/UCqseyN1QBcrjBTo5W01Mcjw" target="_blank"><i class="fa fa-youtube"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>    			
                        </div>  
                    </div>	
                </div><!--/#contact-page-->
                `
            );
        });
})();

{/* <script>
var map;
function initMap() {
    setTimeout(function() {
        map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 10.848469, 
            lng: 106.637527
        },
        zoom: 8
        });
    }, 500);
}
</script>
<script defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAlwdeQyEcDwuDVui9r8z3-TQ51LO8pU-U&callback=initMap"></script> */}