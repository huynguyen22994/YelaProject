module.exports.initialize = function initialize(io) {
    io.sockets.on('connection', function (socket) {
        console.log('have connect');

        var customerRoom = [];
        var customers = [];
        
        socket.on('adminOnline', function () {
            socket.emit('cusUpdateRoom', customerRoom);
        });

        socket.on('switchRoom', function(newroom){
            socket.leave(socket.room);
            socket.join(newroom);
            socket.emit('updatechat', 'SERVER', 'you have connected to '+ newroom);
            // sent message to OLD room
            socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username+' has left this room');
            // update socket session room title
            socket.room = newroom;
            socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username+' has joined this room');
            socket.emit('updaterooms', rooms, newroom);
        });

        socket.on('cusSwitchRoom', function (room) {
            if (socket.room) {
                socket.leave(socket.room);	
            }
            socket.join(room);
            socket.cusRoom = room;
            socket.emit('cusUpdateRoom', customerRoom, room);
            customers.forEach(function (custo) {
                if (custo.email === room) {
                    socket.emit('loadOldMessage', custo);
                }
            });
        });

        socket.on('customerJoin', function (customer) {
            checkCustomerExt(customer).then(function (customerExist) {
                if (customerExist.check) {
                    socket.customer = customer;
                    socket.cusRoom = customer.email;
                    socket.join(socket.cusRoom)
                    io.sockets.in(customer.email).emit('loadOldMessage', customerExist.customer);
                } else {
                    socket.customer = customer;
                    socket.cusRoom = customer.email;
                    customer.chatBoxs = [{name: 'Admin', role: 'admin', chat: 'Can I help you ?'}];
                    customerRoom.push(customer.email);
                    customers.push(customer);
                    socket.join(socket.cusRoom);
                    socket.emit('hello', 'Admin', 'admin', 'Can I help you ?');
                    socket.broadcast.emit('cusNewRoom', customer.email);
                }
            });
        });

        function checkCustomerExt(customer) {
            return new Promise(function (resolve, reject) {
                customers.forEach(function (customerResult) {
                    if (customerResult.email === customer.email) {
                        resolve({ check: true, customer: customerResult });
                    }
                });
                resolve({ check: false});
            });
        };

        socket.on('cusSendChat', function (customer, role, message) {
            customers.forEach(function (cus) {
                if (cus.email === socket.cusRoom) {
                    cus.chatBoxs.push({ name: customer.customer.name, role: customer.role, chat: customer.chat });
                }
            });
            //io.sockets.in(socket.cusRoom).emit('cusUpdateChat', customer.customer.name, customer.role, customer.chat);
            socket.broadcast.to(socket.cusRoom).emit('cusUpdateChat', customer.customer.name, customer.role, customer.chat);
        });

        // when the user disconnects.. perform this
        socket.on('disconnect', function(){
            // remove the username from global usernames list
            //delete usernames[socket.username];
            // update list of users in chat, client-side
            //io.sockets.emit('updateusers', usernames);
            // echo globally that this client has left
            //socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
            socket.leave(socket.room);
        });
    });
};