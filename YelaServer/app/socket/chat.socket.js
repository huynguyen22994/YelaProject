var ChatModel = require('../controllers/ChatCtrl');
var ChatService = require('../services/chatService');

module.exports.initialize = function initialize(io, customer) {

    function addCusOnline(socket, site) {
        if(site === 'client') {
            console.log('[Website] have a user connect to website');
            customer.countOnline = customer.countOnline + 1;
        }
    }

    function removeCusOnline(socket, site) {
        if(site === 'client') {
            console.log('[Website] have a user disconnect to website');
            customer.countOnline = customer.countOnline - 1;
        }
    }

    ///////////////////////////////////////////////////////
    return io.sockets.on('connection', function (socket) {
        var customerRoom = [];
        var customers = [];

        addCusOnline(socket, socket.handshake.query.side);
        /////////////////////////////////////////
        socket.on('adminOnline', function () {
            ChatModel.getAllChat()
                .then(function(result) {
                    var customerList = result.rows;
                    if(customerList) {
                        socket.emit('cusUpdateRoom', customerList);
                    }
                }, function(error) {
                    console.log(error);
                });
            // socket.emit('cusUpdateRoom', customerRoom);
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
            // if (socket.room) {
            //     socket.leave(socket.room);	
            // }
            // socket.join(room);
            // socket.cusRoom = room;
            // socket.emit('cusUpdateRoom', customerRoom, room);
            // customers.forEach(function (custo) {
            //     if (custo.email === room) {
            //         socket.emit('loadOldMessage', custo);
            //     }
            // });
            if (socket.room) {
                socket.leave(socket.room);	
            }
            socket.join(room);
            ChatModel.getAllChat()
                .then(function(result) {
                    var customerList = result.rows;
                    if(customerList) {
                        socket.emit('cusUpdateRoom', customerList, room);
                        customerList.forEach(function (customer) {
                            if (customer.email === room) {
                                var contentObj = JSON.parse(customer.content);
                                var reuquestCustomer = {
                                    email: customer.email,
                                    chatBoxs: contentObj.messages
                                };
                                socket.emit('loadOldMessage', reuquestCustomer);
                            }
                        });
                    }
                }, function(error) {
                    console.log(error);
                });
        });

        socket.on('customerJoin', function (customer) {
            checkCustomerExt(customer).then(function (customerExist) {
                if (customerExist.check) {
                    var customerObj = customerExist.customer;
                    var content = JSON.parse(customerObj.content);
                    var reuquestCustomer = {
                        email: customerObj.email,
                        chatBoxs: content.messages
                    };
                    socket.customer = customerObj;
                    socket.cusRoom = customerObj.email;
                    socket.join(socket.cusRoom)
                    io.sockets.in(customerObj.email).emit('loadOldMessage', reuquestCustomer);
                } else {
                    customer.chatBoxs = [{name: 'Admin', role: 'admin', chat: 'Can I help you ?'}];
                    customerRoom.push(customer.email);
                    customers.push(customer);

                    var Message = ChatService.instanceMessage('FoodTech', 'Chào bạn, chúng tôi có thể giúp gì được cho bạn ?', 'admin');
                    var MessageList = ChatService.instanceMessageList(customer.email, Message);
                    var Chat = ChatService.instanceChat(customer.email, MessageList.getMessageListStr());

                    socket.customer = Chat;
                    // socket.cusRoom = Chat.getEmail();
                    // socket.join(socket.cusRoom);
                    socket.join(Chat.getEmail());
                    socket.emit('hello', Message.getName(), Message.getRole(), Message.getMessage());
                    socket.broadcast.emit('cusNewRoom', customer.email);
                    ChatModel.triggerNewChat(Chat);
                }
            });
        });

        function checkCustomerExt(customer) {
            return new Promise(function (resolve, reject) {
                ChatModel.getChatContentByMail(customer.email)
                    .then(function(result) {
                        if(result) {
                            var customerObj = result.dataValues || false;
                            if(customerObj) {
                                resolve({ 
                                    check: true, 
                                    customer: customerObj
                                });
                            } else {
                                resolve({ check: false});
                            }
                        } else {
                            resolve({ check: false});
                        }
                    }, function(error) {
                        console.log(error);
                        resolve({ check: false});
                    });
            });
        };

        socket.on('cusSendChat', function (customer, role, message) {
            // customers.forEach(function (cus) {
            //     if (cus.email === socket.cusRoom) {
            //         cus.chatBoxs.push({ name: customer.customer.name, role: customer.role, chat: customer.chat });
            //     }
            // });
            //io.sockets.in(socket.cusRoom).emit('cusUpdateChat', customer.customer.name, customer.role, customer.chat);
            // socket.broadcast.to(socket.cusRoom).emit('cusUpdateChat', customer.customer.name, customer.role, customer.chat);

            var Message = ChatService.instanceMessage(customer.customer.name, customer.chat, customer.role);
            ChatModel.getChatContentByMail(customer.customer.email)
                .then(function(result) {
                    if(result) {
                        var customerObj = result.dataValues || false;
                        if(customerObj) {
                            var MessageList = ChatService.instanceMessageListWithString(customerObj.email, customerObj.content);
                            MessageList.putMessage(Message);
                            var Chat = ChatService.instanceChat(customerObj.email, MessageList.getMessageListStr());
                            socket.broadcast.to(Chat.getEmail()).emit('cusUpdateChat', Message.getName(), Message.getRole(), Message.getMessage());
                            ChatModel.updateChat(Chat);
                        } else {
                            
                        }
                    } else {
                        
                    }
                })
        });

        // when the user disconnects.. perform this
        socket.on('disconnect', function(){
            removeCusOnline(socket, socket.handshake.query.side);
            // remove the username from global usernames list
            //delete usernames[socket.username];
            // update list of users in chat, client-side
            //io.sockets.emit('updateusers', usernames);
            // echo globally that this client has left
            //socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
            socket.leave(socket.room);
        });

        return socket;
    });
};