(function() {
    'use strict';

    angular
        .module('YelaApplicationLogin')
        .controller('LoginController', ControllerController);

    ControllerController.$inject = ['$http'];
    function ControllerController($http) {
        var vm = this;    
        vm.userName = null;
        vm.password = null;
        vm.login = login;

        activate();

        ////////////////

        function activate() { }

        function login() {
            loginService(vm.userName, vm.password).then(function(response) {
                if(response.status === 200) {
                    var data = response.data || response;
                    window.localStorage.setItem('foodTechToken', data.token);
                    window.location.href = '/admin';
                }
            }, function(error) {
                console.log(error);
            }).catch(function(error) {
                console.log(error);
            });
        }

        function loginService(userName, password) {
            return $http({
                url: 'api/administrator/login',
                method: 'POST',
                data: {
                    username: userName,
                    password: password
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };
    }
})();