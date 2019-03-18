(function() {
    'use strict';

    angular
        .module('YelaAppClient.Home')
        .factory('HomeService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            getAllProduct: getAllProduct,
            getProductFreatures: getProductFreatures,
            getProductNews: getProductNews,
            getProductBestsellers: getProductBestsellers,
            getBrands: getBrands,
            getCategories: getCategories,
            activeAccount: activeAccount,
            helper: {
                parseActiveRequest: parseActiveRequest
            }
        };
        
        return service;

        ////////////////
        function getAllProduct() {
            return [
                { name: 'test1', id: 1 },
                { name: 'test12', id: 2 },
                { name: 'test3', id: 3 },
                { name: 'test4', id: 4}
            ]
        };

        function getProductFreatures(offset, limit) {
            return $http({
                url: '/api/productfreatures',
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

        function getProductNews() {
            return $http({
                url: '/api/productnew',
                method: 'GET'
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

        function activeAccount(data) {
            return $http({
                url: '/api/customer/active',
                method: 'POST',
                data: data
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function parseActiveRequest(token, id, email) {
            return {

            }
        }
    }
})();