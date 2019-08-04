(function() {
    'use strict';

    angular
        .module('SocialButton', [])
        .directive('socialButton', Directive);

    Directive.$inject = [];
    function Directive() {
        var directive = {
            controller: ControllerController,
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
            },
            templateUrl: 'scripts/clientComponents/socialButton/socialButton.directive.html'
        };
        return directive;
        
    }
    ControllerController.$inject = ['$scope', '$rootScope'];
    /* @ngInject */
    function ControllerController ($scope, $rootScope) {
        var vm = this;
        vm.toggleChatBox = toggleChatBox; 
        vm.isCustomerLogin = isCustomerLogin;

        ///////////////////////////////////
        function toggleChatBox() {
            $rootScope.useChatBox = !$rootScope.useChatBox;
            if($rootScope.useChatBox) {
                $rootScope.$emit("initChatBox");
            };
        }

        function isCustomerLogin() {
            if($rootScope.Customer && $rootScope.Customer.isLogin()) {
                return true;
            } else {
                return false;
            }
            
        }
    }
})();