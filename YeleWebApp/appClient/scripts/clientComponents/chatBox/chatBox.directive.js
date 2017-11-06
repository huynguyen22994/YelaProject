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
    /* @ngInject */
    function ControllerController ($scope, socket) {
        $scope.cus = 'Customer';
        var $chatboxCredentials = $('.chatbox__credentials');
        var $chatbox = $('.chatbox');
        $scope.customer = {
            name: '',
            email: ''
        }
        $scope.chatBoxs = [];

        $scope.enterChat = function () {
            if ($scope.customer.name !== '' && $scope.customer.email !== '') {
                socket.emit('customerJoin', $scope.customer);
                $chatboxCredentials.on('submit', function (e) {
                    e.preventDefault();
                    $chatbox.removeClass('chatbox--empty');
                });
            }
        };

        socket.on('hello', function (admin, role, mes) {
            //$scope.chatBoxs.push({ name: admin, role: role, chat: mes });
            $('#chatBoxs').append(`
            <div class="chatbox__body__message chatbox__body__message--left">
                <img src="https://s3.amazonaws.com/uifaces/faces/twitter/brad_frost/128.jpg" alt="Picture">
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
                            <img src="https://s3.amazonaws.com/uifaces/faces/twitter/brad_frost/128.jpg" alt="Picture">
                            <b> ${chat.name}</b>
                            <p> ${chat.chat}</p>
                        </div>
                    `)
                } else {
                    $('#chatBoxs').append(`
                        <div class="chatbox__body__message chatbox__body__message--right">
                            <img src="https://s3.amazonaws.com/uifaces/faces/twitter/brad_frost/128.jpg" alt="Picture">
                            <b> ${chat.name}</b>
                            <p> ${chat.chat}</p>
                        </div>
                    `)
                }
            });
        });

        socket.on('cusUpdateChat', function (customer, role, message) {
            if (role === 'admin') {
                $('#chatBoxs').append(`
                <div class="chatbox__body__message chatbox__body__message--left">
                    <img src="https://s3.amazonaws.com/uifaces/faces/twitter/brad_frost/128.jpg" alt="Picture">
                    <b> ${customer}</b>
                    <p> ${message}</p>
                </div>
                `)
            } else {
                $('#chatBoxs').append(`
                <div class="chatbox__body__message chatbox__body__message--right">
                    <img src="https://s3.amazonaws.com/uifaces/faces/twitter/brad_frost/128.jpg" alt="Picture">
                    <b> ${customer}</b>
                    <p> ${message}</p>
                </div>
                `)
            }
        });

        // socket.on('cusUpdateChat', function (customer, role, message) {
        //     if (role === 'admin') {
        //         $('#chatBoxs').append(`
        //             <div class="chatbox__body__message chatbox__body__message--left">
        //                 <img src="https://s3.amazonaws.com/uifaces/faces/twitter/brad_frost/128.jpg" alt="Picture">
        //                 <b> ${customer}</b>
        //                 <p> ${message}</p>
        //             </div>
        //         `)
        //     }
        // });

        $scope.isCustomerChat = function (chat) {
            return (chat.role === 'admin') ? 'chatbox__body__message chatbox__body__message--left' : 'chatbox__body__message chatbox__body__message--right';
        };

        $scope.sendChat = function () {
            $('#chatBoxs').append(`
                <div class="chatbox__body__message chatbox__body__message--right">
                    <img src="https://s3.amazonaws.com/uifaces/faces/twitter/brad_frost/128.jpg" alt="Picture">
                    <b> ${$scope.customer.name}</b>
                    <p> ${$scope.message}</p>
                </div>
            `)
            socket.emit('cusSendChat', { customer: $scope.customer, role: 'customer', chat: $scope.message });
            $scope.message = '';
        };

        $('#mesageCustomer').keypress(function(e) {
            if(e.which == 13) {
                $(this).blur();
                $scope.sendChat();
            }
        });
    };
})();