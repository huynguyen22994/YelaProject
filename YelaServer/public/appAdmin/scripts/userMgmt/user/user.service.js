(function() {
    'use strict';

    angular
        .module('YelaApplication.UserManagement')
        .factory('UserService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            getAllUser: getAllUser
        };
        
        return service;

        ////////////////
        function getAllUser() {
            return $http({
                url: '/api/customer',
                method: 'GET'
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };
    }
})();