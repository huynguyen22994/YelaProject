(function() {
    'use strict';

    angular
        .module('YelaAppClient.Foods')
        .factory('FoodsService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            getFoods: getFoods
        };
        
        return service;

        ////////////////
        function getFoods(offset, limit, type) {
            return $http({
                url: '/api/product/type',
                method: 'GET',
                params: {
                    offset: offset,
                    limit: limit,
                    type: type
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };
    }
})();