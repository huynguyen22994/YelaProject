(function() {
    'use strict';

    angular
        .module('YelaAppClient.Contact')
        .factory('ContactService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            submitLetter: submitLetter,
            getLetterRequest: getLetterRequest
        };
        
        return service;

        ////////////////
        function submitLetter(data) {
            return $http({
                url: '/api/letter',
                method: 'POST',
                data: data
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function getLetterRequest(letter) {
            var requestBody =  {
                name: letter.name || '',
                phone: letter.phone || '',
                email: letter.email || '',
                message: letter.message || ''
            };
            return requestBody;
        };
    }
})();