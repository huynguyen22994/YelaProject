(function() {
    'use strict';
    angular
        .module('YelaAppClient.Contact')
        .run(runFunction);
        runFunction.$inject = ['$templateCache'];
        function runFunction($templateCache) {
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
                                    <div ng-if="vm.alertSuccess" class="status alert alert-success"> {{ vm.alertMsg }} </div>
                                    <div ng-if="vm.alertFail" class="status alert alert-danger"> {{ vm.alertMsg }} </div>
                                    <form id="main-contact-form" class="contact-form row" name="contact-form" method="post">
                                        <div class="form-group col-md-6">
                                            <input type="email" name="email" class="form-control" required="required" ng-model="vm.letter.email" placeholder="* Email">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <input type="text" name="phone" class="form-control" ng-model="vm.letter.phone" placeholder="Số điện thoai">
                                        </div>
                                        <div class="form-group col-md-12">
                                            <input type="text" name="subject" class="form-control" required="required" ng-model="vm.letter.name" placeholder="* Họ Tên">
                                        </div>
                                        <div class="form-group col-md-12">
                                            <textarea name="message" id="message" required="required" class="form-control" rows="8" ng-model="vm.letter.message" placeholder="* Nhập lời nhắn của bạn"></textarea>
                                        </div>       
                                        <div class="form-group col-md-12">
                                            <div id="g-recapcha"></div> 
                                        </div>            
                                        <div class="form-group col-md-12">
                                            <input type="submit" name="submit" class="btn btn-primary pull-right" ng-disabled="vm.canNotSubmit()" ng-click="vm.submitLetter()" value="Gửi">
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
                                        <p>Địa chỉ: 11/3, Đường ĐHT 19, KP 1, Phường Đông Hưng Thuận, Quận 12, TP Hồ Chí Minh</p>
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
                            <div class="col-md-12">
                            <div id="g-recapcha"> 
                        </div>  
                        <div>
                            <h2 class="title text-center">Bản Đồ</h2>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.5133002287935!2d106.63502221474963!3d10.848508992272633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529538fc2d845%3A0xb2417d39b6a0d6d2!2zRm9vZFRlY2hTaG9wIC0gTcOsIFThu49pICYgQ8ahbSBWw7I!5e0!3m2!1sen!2s!4v1565451551532!5m2!1sen!2s" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
                        </div>
                            </div>
                        </div>  
                    </div>	
                </div><!--/#contact-page-->
                <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit"
                    async defer>
                </script>
                <script type="text/javascript">
                    var onloadCallback = function() {
                        window.foodtechGReCapcha = grecaptcha.render('g-recapcha', {
                        'sitekey' : '6LcDoY8UAAAAAOPbEpQPnOefbqbDtOe-5pg0eGbD'
                        });
                    };
                </script>
                `
            );
        };
    /* <script>
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
    <script defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAlwdeQyEcDwuDVui9r8z3-TQ51LO8pU-U&callback=initMap"></script> */
})();