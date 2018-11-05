(function() {
    'use strict';

    angular
        .module('YelaAppClient.Materials')
        .factory('MaterialsService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            getMaterials: getMaterials
        };
        
        return service;

        ////////////////
        function getMaterials(offset, limit, type) {
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