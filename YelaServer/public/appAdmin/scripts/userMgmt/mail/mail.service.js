(function() {
    'use strict';

    angular
        .module('YelaApplication.UserManagement')
        .factory('MailService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            getAllMails: getAllMails,
            readMail: readMail,
            helper: {
                parseReadLetterBody: parseReadLetterBody
            }
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

        function readMail(data) {
            return $http({
                url: '/api/letter/read',
                method: 'PUT',
                data: data
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function parseReadLetterBody(data) {
            return {
                letterId: data.letterId || '',
                name: data.name || '',
                phone: data.phone || '',
                email: data.email || '',
                message: data.message || '',
                status: data.status || ''
            }
        };
    }
})();