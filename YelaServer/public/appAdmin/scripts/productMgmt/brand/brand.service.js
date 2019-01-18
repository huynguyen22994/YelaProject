(function() {
    'use strict';

    angular
        .module('YelaApplication.ProductMgmt')
        .factory('BrandService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            getAllBrands: getAllBrands,
            searchProduct: searchProduct,
            deleteBrand: deleteBrand,
            getBrandById: getBrandById,
            createBrand: createBrand,
            updateBrand: updateBrand
        };
        
        return service;

        ////////////////
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

        function deleteBrand(brandId) {
            return $http({
                url: '/api/brand',
                method: 'DELETE',
                params: {
                    brandId: brandId
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function getBrandById(brandId) {
            return $http({
                url: '/api/brand/one',
                method: 'GET',
                params: {
                    brandId: brandId
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function createBrand(data) {
            return $http({
                url: '/api/brand',
                method: 'POST',
                data: data
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function updateBrand(data) {
            return $http({
                url: '/api/brand',
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