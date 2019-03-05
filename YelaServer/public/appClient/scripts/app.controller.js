(function() {
    'use strict';

    angular
        .module('YelaAppClient')
        .controller('ClientController', ControllerController);

    ControllerController.$inject = ['$i18next', '$timeout', '$rootScope', 'Cart', '$scope'];
    function ControllerController($i18next, $timeout, $rootScope, Cart, $scope) {
        var vm = this;
        // this is root cart
        $rootScope.Cart = new Cart();
        $rootScope.useChatBox = false;

        activate();
        ////////////////

        function activate() { 
            $timeout(function() {
                vm.spinnerHide = true;
            }, 1000);
        };

        $scope.$on("$destroy", function() {
            
        });

    }
})();