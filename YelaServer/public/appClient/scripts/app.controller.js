(function() {
    'use strict';

    angular
        .module('YelaAppClient')
        .controller('ClientController', ControllerController);

    ControllerController.$inject = ['$i18next', '$timeout', '$rootScope', 'Cart', '$scope', 'LoginService', 'Customer', '$location', 'ModalService'];
    function ControllerController($i18next, $timeout, $rootScope, Cart, $scope, LoginService, Customer, $location, ModalService) {
        var vm = this;
        var TIME_OUT = 1000;
        var customerToken = window.localStorage.getItem('customerToken');
        // this is root cart
        $rootScope.Cart = new Cart();
        $rootScope.useChatBox = false;
        $rootScope.logout = logout;
        $rootScope.rootModal = {
            headerTitle: '',
            contentMsg: '',
            show: function() {
                angular.element('#rootModal').modal('show');
            },
            hide: function() {
                angular.element('#rootModal').modal('hide');
            },
            toggle: function() {
                angular.element('#rootModal').modal('toggle');
            },
            closeCallback: function() {
                $location.path('/');
            }
        }

        //////// Function ////////
        $rootScope.getCustomer = getCustomer;
        $rootScope.openModal = openModal;
        $rootScope.closeModal = closeModal;

        activate();
        ////////////////

        function activate() { 
            getCustomer(customerToken);
        };

        function getCustomer(token) {
            var promise = new Promise(function(resolve, reject) {
                if(token) {
                    LoginService.getCustomerByToken(token)
                        .then(function(res) {
                            var data = res.data;
                            if(data) {
                                if(data.success) {
                                    var cusInfo = data.customer;
                                    $rootScope.Customer = new Customer(cusInfo.customerId, cusInfo.token, cusInfo.firstName, cusInfo.lastName, cusInfo.avatarLink, cusInfo.email);
                                    vm.spinnerHide = true;
                                }
                            }
                            resolve();
                        })
                } else {
                    $timeout(function() {
                        vm.spinnerHide = true;
                        resolve();
                    }, TIME_OUT);
                }
            })
            return promise;
        }

        function logout() {
            window.localStorage.removeItem("customerToken");
            $rootScope.Customer.destroy();
            $rootScope.$emit("closeChatBox");
            $location.path('/');
        }

        function openModal(id) {
            ModalService.Open(id);
        }

        function closeModal(id) {
            ModalService.Close(id);
        }

        $scope.$on("$destroy", function() {
            
        });

    }
})();