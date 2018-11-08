(function() {
    'use strict';

    angular
        .module('YelaApplication')
        .controller('IndexController', ControllerController);

    ControllerController.$inject = ['ylConstant', 'adminInfo', '$rootScope'];
    function ControllerController(ylConstant, adminInfo, $rootScope) {
        var vm = this;
        vm.navBarConfig = {
            appTitle: ylConstant.appTitle,
            menus: ylConstant.ylAppMenu,
            setting: [
                
            ]
        };
        vm.adminInfo = adminInfo;
        vm.logout = logout;

        activate();

        ////////////////

        function activate() { 
            vm.spinnerHide = true;  
            $rootScope.adminInfo = adminInfo;  
        }

        function logout() {
            window.localStorage.clear(); 
            window.location.href = '/login.html';
        }
    }
})();