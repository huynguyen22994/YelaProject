(function() {
    'use strict';

    angular
        .module('YelaApplicationLogin')
        .controller('LoginController', ControllerController);

    ControllerController.$inject = ['$http', '$timeout'];
    function ControllerController($http, $timeout) {
        var vm = this;    
        vm.userName = null;
        vm.password = null;
        vm.login = login;
        vm.error = false;

        activate();

        ////////////////

        function activate() { }

        function login() {
            loginService(vm.userName, vm.password).then(function(response) {
                if(response.status === 200) {
                    var data = response.data || response;
                    //window.localStorage.setItem('foodTechToken', data.token);
                    window.location.href = '/admin';
                } else {
                    vm.error = true;
                }
            }, function(error) {
                vm.error = true;
            }).catch(function(error) {
                vm.error = true;
            }).finally(function() {
                $timeout(function() {
                    vm.error = false;
                }, 3000)
            })
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