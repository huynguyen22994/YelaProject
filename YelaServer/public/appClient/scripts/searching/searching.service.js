(function() {
    'use strict';

    angular
        .module('YelaAppClient.Searching')
        .factory('SearchingService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            getProductByKey: getProductByKey
        };
        
        return service;

        ////////////////

        function getProductByKey(key) {
            return $http({
                url: '/api/product/search',
                method: 'GET',
                params: {
                    key: key
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

    }
})();