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
            searchProducttype: searchProducttype
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
    }
})();