(function() {
    'use strict';

    angular
        .module('YelaAppClient.Login')
        .controller('LoginController', ControllerController);

    ControllerController.$inject = ['LoginConstant', 'LoginService', 'Customer', '$rootScope', '$location', '$scope', 'toastr'];
    function ControllerController(LoginConstant, LoginService, Customer, $rootScope, $location, $scope, toastr) {
        var vm = this;
        vm.customerSignUp = {};
        
        vm.onGoogleLogin = onGoogleLogin;
        vm.onFacebookLogin = onFacebookLogin;
        vm.onSignUp = onSignUp;
        vm.onSignIn = onSignIn;

        activate();

        ////////////////

        function activate() { }

        function onGoogleLogin(){
            //if ($scope.customerLogined === false) {
                var params = {
                    'clientid': LoginConstant.google.clientid,
                    'cookiepolicy': LoginConstant.google.cookiepolicy,
                    'callback': function (result) {
                        if (result['status']['signed_in']) {
                            window.gapi.client.request({ path: LoginConstant.google.clientPath }).then(
                                function(success) {
                                    var user_info = JSON.parse(success.body);
                                    var requestBody = LoginService.helper.parserGGRequest(user_info);
                                    LoginService.loginGoogleFacebook(requestBody)
                                        .then(function(res) {
                                            if(res.data) {
                                                var cusInfo = res.data.customer;
                                                $rootScope.Customer = new Customer(cusInfo.customerId, cusInfo.token, cusInfo.firstName, cusInfo.lastName, cusInfo.avatarLink, cusInfo.email);
                                                window.localStorage.setItem('customerToken', $rootScope.Customer.getToken());
                                                $location.path('/'); 
                                            }
                                        })
                                },
                                function(error) {
                                    // Error occurred
                                    console.log(error);
                                }
                            );
                        }
                    },
                    'approvalprompt': 'force',
                    'scope': LoginConstant.google.scope
                };
                gapi.auth.signIn(params);
            // } else {
            //     alert('Moi ban dang xuat');
            // }
        }

        function onFacebookLogin() {
            checkFBLoginState();
        }

        function checkFBLoginState() {
            window.FB.getLoginStatus(function(response) {
                statusChangeCallback(response);
              });
        }

        function statusChangeCallback(response) {
            if (response.status === 'connected') {
                facebookAPI();
            } else {
                window.FB.login(function(response) {
                    facebookAPI();
                }, {scope: 'public_profile,email'});
            }
        }

        function facebookAPI() {
        FB.api('/me', {fields: 'name, email, last_name, first_name, picture'}, function(customerInfo) {
            var requestBody = LoginService.helper.parserFFRequest(customerInfo);
            LoginService.loginGoogleFacebook(requestBody)
                .then(function(res) {
                    if(res.data) {
                        var cusInfo = res.data.customer;
                        $rootScope.Customer = new Customer(cusInfo.customerId, cusInfo.token, cusInfo.firstName, cusInfo.lastName, cusInfo.avatarLink, cusInfo.email);
                        window.localStorage.setItem('customerToken', $rootScope.Customer.getToken());
                        $location.path('/'); 
                    }
                })
        });
        }

        function onSignIn() {

        }

        function onSignUp() {
            var isCapchaChecked;
            if(window.grecaptcha) {
              isCapchaChecked = window.grecaptcha.getResponse(window.foodtechLoginGReCapcha);   
            };
            if(isCapchaChecked) {

            } else {
                vm.alertMsg = 'Vui lòng xác nhận bạn không phải là người máy tiếp tục gửi lời nhắn nhé. Điều này sẽ giúp chúng tôi ngăn chặn việc spam tin nhắn.';
                toastr.error(vm.alertMsg);
            }
        }

    }
})();