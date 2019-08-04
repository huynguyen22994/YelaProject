(function() {
    'use strict';

    angular.module('YelaChatBox', [
        'YelaSocket'
    ])
    .directive('chatBox', Directive);

    Directive.$inject = [];
    function Directive() {
        var directive = {
            controller: ControllerController,
            restrict: 'EA',
            scope: {
            },
            templateUrl: '/scripts/clientComponents/chatBox/chatBox.directive.html'
        };
        return directive;
        
    }
    ControllerController.$inject = ['$scope', 'socket', '$rootScope']
    /* @ngInject */
    function ControllerController ($scope, socket, $rootScope) {
        $scope.cus = 'Customer';
        var $chatboxCredentials = $('.chatbox__credentials');
        var $chatbox = $('.chatbox');
        $scope.customer = {
            name: '',
            email: ''
        }
        $scope.chatBoxs = [];

        active();
        ///////////////////////////////////////////////////////////
        function active() {
            if($rootScope.Customer && $rootScope.Customer.isLogin()) {
                $scope.customer.name = $rootScope.Customer.getName();
                $scope.customer.email = $rootScope.Customer.getEmail();
                $scope.customer.image = $rootScope.Customer.getImage();
                $scope.enterChat();
            }
        };

        $scope.enterChat = function () {
            // if ($scope.customer.name !== '' && $scope.customer.email !== '') {
                socket.emit('customerJoin', $scope.customer);
                $chatboxCredentials.on('submit', function (e) {
                    e.preventDefault();
                    $chatbox.removeClass('chatbox--empty');
                });
            //}
        };

        $scope.closeChatBox = function() {
            $rootScope.useChatBox = false;
            $('#chatBoxs').empty();
        };

        socket.on('hello', function (admin, role, mes) {
            //$scope.chatBoxs.push({ name: admin, role: role, chat: mes });
            $('#chatBoxs').append(`
            <div class="chatbox__body__message chatbox__body__message--left">
                <img src="images/shop/administrator.png" alt="Picture">
                <b> ${admin}</b>
                <p> ${mes}</p>
            </div>
            `)
        });

        socket.on('loadOldMessage', function (customer) {
            $('#chatBoxs').empty();
            customer.chatBoxs.forEach(function (chat) {
                if (chat.role === 'admin') {
                    $('#chatBoxs').append(`
                        <div class="chatbox__body__message chatbox__body__message--left">
                            <img src="images/shop/administrator.png" alt="Picture">
                            <b> ${chat.name}</b>
                            <p> ${chat.message}</p>
                        </div>
                    `)
                } else {
                    $('#chatBoxs').append(`
                        <div class="chatbox__body__message chatbox__body__message--right">
                            <img src="${$scope.customer.image}" alt="Picture">
                            <b> ${chat.name}</b>
                            <p> ${chat.message}</p>
                        </div>
                    `)
                }
            });
        });

        socket.on('cusUpdateChat', function (customer, role, message) {
            if (role === 'admin') {
                $('#chatBoxs').append(`
                <div class="chatbox__body__message chatbox__body__message--left">
                    <img src="images/shop/administrator.png" alt="Picture">
                    <b> ${customer}</b>
                    <p> ${message}</p>
                </div>
                `)
            } else {
                $('#chatBoxs').append(`
                <div class="chatbox__body__message chatbox__body__message--right">
                    <img src="${$scope.customer.image}" alt="Picture">
                    <b> ${customer}</b>
                    <p> ${message}</p>
                </div>
                `)
            }
        });

        $scope.isCustomerChat = function (chat) {
            return (chat.role === 'admin') ? 'chatbox__body__message chatbox__body__message--left' : 'chatbox__body__message chatbox__body__message--right';
        };

        $scope.sendChat = function () {
            $('#chatBoxs').append(`
                <div class="chatbox__body__message chatbox__body__message--right">
                    <img src="${$scope.customer.image}" alt="Picture">
                    <b> ${$scope.customer.name}</b>
                    <p> ${$scope.message}</p>
                </div>
            `)
            socket.emit('cusSendChat', { customer: $scope.customer, role: 'customer', chat: $scope.message });
            $scope.$apply(function () {
                $scope.message = '';
            });
        };

        $('#mesageCustomer').keypress(function(e) {
            if(e.which == 13) {
                //$(this).blur();
                if($scope.message) {
                    $scope.sendChat();
                }
            }
        });

        $rootScope.$on("initChatBox", function() {
            active();
        });

        $rootScope.$on("closeChatBox", function() {
            $scope.closeChatBox();
        });
    };
})();