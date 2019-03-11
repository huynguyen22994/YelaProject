(function() {
    'use strict';

    angular
        .module('YelaAppClient.Login')
        .controller('LoginController', ControllerController);

    ControllerController.$inject = ['LoginConstant', 'LoginService', 'Customer', '$rootScope'];
    function ControllerController(LoginConstant, LoginService, Customer, $rootScope) {
        var vm = this;
        
        vm.onGoogleLogin = onGoogleLogin;

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
                                                console.log($rootScope.Customer);
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

    }
})();