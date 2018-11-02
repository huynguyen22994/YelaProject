(function() {
    'use strict';

    angular
        .module('YelaAppClient.FoodByType')
        .factory('FoodTypeService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            getBrands: getBrands,
            getCategories: getCategories,
            getFoodByType: getFoodByType,
            getFoodType: getFoodType
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

        function getFoodByType(offset, limit, productTypeId) {
            return $http({
                url: '/api/product/producttypeid',
                method: 'GET',
                params: {
                    offset: offset,
                    limit: limit,
                    productTypeId: productTypeId
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function getFoodType(productTypeId) {
            return $http({
                url: '/api/producttype/one',
                method: 'GET',
                params: {
                    productTypeId: productTypeId
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        }
    }
})();