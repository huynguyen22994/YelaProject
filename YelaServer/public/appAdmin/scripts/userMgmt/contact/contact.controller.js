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
        $scope.currentRoom = '';
        activate();

        ////////////////

        function activate() { 
            socket.emit('adminOnline');
        }

        window.switchRoom = function switchRoom(room){
            $scope.currentRoom = room;
            socket.emit('cusSwitchRoom', room);
        }

        socket.on('cusUpdateRoom', function (rooms, current_room) {
            $('#rooms').empty();
            if(current_room) {
                $.each(rooms, function(key ,value) {
                    var mailFormat = value.email.replace("@gmail.com", "");
                    if(value.email == current_room){
                        if(value.adminNoRead) {
                            $('#rooms').append('<div style="color: #ff8080; display: inline-flex"><i class="fa fa-bell" style="padding: 3px 2px 0 0px"></i>' + mailFormat + '</div>');
                        } else {
                            $('#rooms').append('<div style="color: #ff8080">' + mailFormat + '</div>');
                        }
                    }
                    else {
                        if(value.adminNoRead) {
                            $('#rooms').append('<div><a style="cursor:pointer; display: inline-flex" onclick="switchRoom(\''+value.email+'\')"><i class="fa fa-bell" style="padding: 3px 2px 0 0px"></i>' + mailFormat  + '</a></div>');
                        } else {
                            $('#rooms').append('<div><a style="cursor:pointer; display: inline-flex" onclick="switchRoom(\''+value.email+'\')">' + mailFormat  + '</a></div>');
                        }
                    }
                })
            } else {
                $.each(rooms, function(key, value) {
                    var mailFormat = value.email.replace("@gmail.com", "");
                    if(value.adminNoRead) {
                        $('#rooms').append('<div><a style="cursor:pointer; display: inline-flex" onclick="switchRoom(\''+value.email+'\')"><i class="fa fa-bell" style="padding: 3px 2px 0 0px"></i>' + mailFormat + '</a></div>');
                    } else {
                        $('#rooms').append('<div><a style="cursor:pointer" onclick="switchRoom(\''+value.email+'\')">' + mailFormat + '</a></div>');
                    }
                });
            }
        });

        socket.on('cusUpdateChat', function (customer, role, message) {
            if(role !== 'admin') {
                $('#conversation').append('<b>'+customer + ':</b> ' + message + '<br>');
            }
        });

        socket.on('loadOldMessage', function(customer) {
            $('#conversation').empty();
            customer.chatBoxs.forEach(function(chat) {
                $('#conversation').append('<b>'+ chat.name + ':</b> ' + chat.message + '<br>');
            });
        });

        socket.on('cusNewRoom', function(newRoom) {
            var mailFormat = newRoom.replace("@gmail.com", "");
            $('#rooms').append('<div><a style="cursor:pointer" onclick="switchRoom(\''+newRoom+'\')">' + mailFormat + '</a></div>');
        });

        $(function(){
            // when the client clicks SEND
            $('#datasend').click( function() {
                var message = $('#data').val();
                $('#data').val('');
                // tell server to execute 'sendchat' and send along one parameter
                $('#conversation').append('<b> FoodTech :</b> ' + message + '<br>');
                socket.emit('cusSendChat', 
                    {
                        customer: {
                            email: $scope.currentRoom,
                            name: 'FoodTech'
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

        $('#data').focus(function() {
            socket.emit('cusReadChat', {
                customer: {
                    email: $scope.currentRoom,
                    name: 'FoodTech'
                },
                role: 'admin',
            } )
        });
    }
})();