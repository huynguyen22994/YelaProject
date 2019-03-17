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
            getCustomerByToken: getCustomerByToken,
            helper: {
                parserGGRequest: parserGGRequest,
                parserFFRequest: parserFFRequest,
                parserManualRequest: parserManualRequest
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

        function parserFFRequest(data) {
            var pictureData = data.picture || {};
            var picture = pictureData.data || {};
            return {
                lastName: data.last_name,
                firstName: data.first_name,
                email: data.email,
                id: data.id,
                avatarLink: picture.url,
                loginType: 'facebook',
                displayName: data.name
            }   
        }

        function parserManualRequest(data) {
            return {
                lastName: data.lastName,
                firstName: data.firstName,
                email: data.email,
                loginType: 'manual',
                displayName: data.name,
                password: data.password,
                confirmPassword: data.confirmPassword
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

        function getCustomerByToken(token) {
            return $http({
                method: 'GET',
                url: '/api/customer/token',
                params: {
                    token: token
                }
            }).then((res) => {
                return res;
            }, (err) => {
                return err;
            });
        };

    }
})();