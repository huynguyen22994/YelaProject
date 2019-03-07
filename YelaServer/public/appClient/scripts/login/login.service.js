(function() {
    'use strict';

    angular
        .module('YelaAppClient.Login')
        .factory('LoginService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            createCustomer: createCustomer,
            emailAuthentication: emailAuthentication,
            loginCustomer: loginCustomer,
            logout: logout,
            loginGoogleFacebook: loginGoogleFacebook,
            helper: {
                parserGGRequest: parserGGRequest
            }
        };
        
        return service;

        ////////////////
        function parserGGRequest(data) {
            var name = data.name || {};
            var mail = data.emails[0] || {};
            var image = data.image || {};
            return {
                lastName: name.givenName,
                firstName: name.familyName,
                email: mail.value,
                id: data.id,
                avatarLink: image.url,
                loginType: 'google',
                displayName: data.displayName
            }
        }

        function createCustomer(customer) {
            return $http({
                method: 'POST',
                url: '/api/customer',
                data: customer
            }).then((res) => {
                return res;
            },
            (err) => {
                return err;
            });
        };
    
        function emailAuthentication(emailCustomer) {
            return $http({
                method: 'GET',
                url: '/api/email/authentication',
                params: {
                    email: emailCustomer
                }
            }).then((res) => {
                return res;
            }, (err) => {
                return err;
            });
        };
    
        function loginCustomer(login) {
            return $http({
                method: 'POST',
                url: 'api/customer/login',
                data: login
            }).then((res) => {
                return res;
            }, (err) => {
                return err;
            })
        };
    
        function logout() {
            return $http({
                method: 'GET',
                url: 'api/customer/logout'
            }).then((res) => {
                return res;
            }, (err) => {
                return err;
            });
        };
    
        function loginGoogleFacebook(customer) {
            return $http({
                method: 'POST',
                url: 'api/customer/login/google/facebook',
                data: customer
            }).then((res) => {
                return res;
            }, (err) => {
                return err;
            });
        };

    }
})();