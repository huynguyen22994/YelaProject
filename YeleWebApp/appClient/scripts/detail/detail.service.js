(function() {
    'use strict';

    angular
        .module('YelaAppClient.Detail')
        .factory('DetailService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            getBrands: getBrands,
            getCategories: getCategories,
            getProductById: getProductById,
            getProductBestsellers: getProductBestsellers
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

        function getProductById(productId) {
            return $http({
                url: '/api/product/one',
                method: 'GET',
                params: {
                    productId: productId
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function getProductBestsellers(offset, limit) {
            return $http({
                url: '/api/productbestseller',
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