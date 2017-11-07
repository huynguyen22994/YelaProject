(function() {
    'use strict';

    angular
        .module('YelaApplication.ProductMgmt')
        .factory('ProducttypeService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            getAllProducttypes: getAllProducttypes,
            deleteProducttype: deleteProducttype,
            searchProducttype: searchProducttype,
            getAllCategories: getAllCategories,
            createProducttype: createProducttype
        };
        
        return service;

        ////////////////
        function getAllProducttypes() {
            return $http({
                url: '/api/producttype',
                method: 'GET'
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function deleteProducttype(producttypeId) {
            return $http({
                url: '/api/producttype',
                method: 'DELETE',
                params: {
                    productTypeId: producttypeId
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function searchProducttype(key) {
            return $http({
                url: '/api/producttype/search',
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

        function getAllCategories() {
            return $http({
                url: '/api/category',
                method: 'GET'
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function createProducttype(data) {
            return $http({
                url: '/api/producttype',
                method: 'POST',
                data: data
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };
    }
})();