(function() {
    'use strict';

    angular
        .module('YelaApplication.ProductMgmt')
        .factory('ProductService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            getAllProducts: getAllProducts,
            searchProduct: searchProduct,
            getAllProducttypes: getAllProducttypes,
            deleteProduct: deleteProduct,
            getProductById: getProductById,
            getAllBrands: getAllBrands,
            createProduct: createProduct,
            updateProduct: updateProduct
        };
        
        return service;

        ////////////////
        function getAllProducts() {
            return $http({
                url: '/api/products',
                method: 'GET'
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function searchProduct(key) {
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

        function deleteProduct(productId, linkImg) {
            return $http({
                url: '/api/products',
                method: 'DELETE',
                params: {
                    productId: productId,
                    linkImg: linkImg
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

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

        function getAllBrands() {
            return $http({
                url: '/api/brand',
                method: 'GET'
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function createProduct(data) {
            return $http({
                url: '/api/products',
                method: 'POST',
                data: data
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function updateProduct(data) {
            return $http({
                url: '/api/products',
                method: 'PUT',
                data: data
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };
    }
})();