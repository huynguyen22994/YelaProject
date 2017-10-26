module.exports.initialize = function initialize(io) {
    io.sockets.on('connection', function (socket) {
        console.log('have connect');
    });
};