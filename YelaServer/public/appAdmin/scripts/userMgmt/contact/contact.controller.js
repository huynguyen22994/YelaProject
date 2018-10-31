(function() {
    'use strict';

    angular
        .module('YelaApplication.UserManagement')
        .controller('ContactController', ControllerController);

    ControllerController.$inject = ['socket', '$scope'];
    function ControllerController(socket, $scope) {
        // var vm = this;
        // vm.switchRoom = switchRoom;
        // $scope.switchRoom = switchRoom;

        activate();

        ////////////////

        function activate() { }

        window.switchRoom = function switchRoom(room){
            socket.emit('cusSwitchRoom', room);
        }

        socket.on('cusUpdateRoom', function (rooms, current_room) {
            $('#rooms').empty();
            if(current_room) {
                $.each(rooms, function(key ,value) {
                    if(value == current_room){
                        $('#rooms').append('<div>' + value + '</div>');
                    }
                    else {
                        $('#rooms').append('<div><a class="btn btn-default" onclick="switchRoom(\''+value+'\')">' + value + '</a></div>');
                    }
                })
            } else {
                $.each(rooms, function(key, value) {
                    $('#rooms').append('<div><a class="btn btn-default" onclick="switchRoom(\''+value+'\')">' + value + '</a></div>');
                });
            }
        });

        socket.on('cusUpdateChat', function (customer, role, message) {
            if(role !== 'admin') {
                $('#conversation').append('<b>'+customer + ':</b> ' + message + '<br>');
            }
        });

        socket.on('loadOldMessage', function(customer) {
            console.log(customer);
            $('#conversation').empty();
            customer.chatBoxs.forEach(function(chat) {
                $('#conversation').append('<b>'+chat.name + ':</b> ' + chat.chat + '<br>');
            });
        });

        socket.on('cusNewRoom', function(newRoom) {
            $('#rooms').append('<div><a class="btn btn-default" onclick="switchRoom(\''+newRoom+'\')">' + newRoom + '</a></div>');
        });

        $(function(){
            // when the client clicks SEND
            $('#datasend').click( function() {
                var message = $('#data').val();
                $('#data').val('');
                // tell server to execute 'sendchat' and send along one parameter
                $('#conversation').append('<b> Admin :</b> ' + message + '<br>');
                socket.emit('cusSendChat', 
                    {
                        customer: {
                            name: 'Admin'
                        },
                        role: 'admin',
                        chat: message
                    });
            });

            // when the client hits ENTER on their keyboard
            $('#data').keypress(function(e) {
                if(e.which == 13) {
                    $(this).blur();
                    $('#datasend').focus().click();
                }
            });
        });
    }
})();