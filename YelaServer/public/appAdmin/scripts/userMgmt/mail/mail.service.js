(function() {
    'use strict';

    angular
        .module('YelaApplication.UserManagement')
        .factory('MailService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            getAllMails: getAllMails
        };
        
        return service;

        ////////////////
        function getAllMails() {
            return $http({
                url: '/api/letter',
                method: 'GET'
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };
    }
})();