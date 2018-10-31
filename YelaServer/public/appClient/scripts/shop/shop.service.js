(function() {
    'use strict';

    angular
        .module('YelaAppClient.Shop')
        .factory('ShopService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            getBrands: getBrands,
            getCategories: getCategories,
            getProducts: getProducts
        };
        
        return service;

        ////////////////
        function getBrands() { 
            return $http({
                url: '/api/brand',
                method: 'GET'
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function getCategories() {
            return $http({
                url: '/api/category/producttype',
                method: 'GET'
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function getProducts(offset, limit) {
            return $http({
                url: '/api/product/offset',
                method: 'GET',
                params: {
                    offset: offset,
                    limit: limit
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };
    }
})();