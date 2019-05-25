(function() {
    'use strict';

    angular
        .module('YelaAppClient.FormFoods')
        .factory('FormFoodsService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            getMainFoods: getMainFoods
        };
        
        return service;

        ////////////////
        function getMainFoods(offset, limit, form) {
            return $http({
                url: '/api/product/form',
                method: 'GET',
                params: {
                    offset: offset,
                    limit: limit,
                    form: form
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };
    }
})();