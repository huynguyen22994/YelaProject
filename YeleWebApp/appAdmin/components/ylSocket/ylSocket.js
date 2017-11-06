(function() {
    'use strict';

    angular
        .module('YelaSocket', [
            'btford.socket-io'
        ])
        .factory('socket', Service);

    Service.$inject = ['$rootScope'];
    function Service($rootScope) {
        var socket = io.connect('http://localhost:9000');
        return {
          on: function (eventName, callback) {
            socket.on(eventName, function () {  
              var args = arguments;
              $rootScope.$apply(function () {
                callback.apply(socket, args);
              });
            });
          },
          emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
              var args = arguments;
              $rootScope.$apply(function () {
                if (callback) {
                  callback.apply(socket, args);
                }
              });
            })
          }
        };
    }
})();