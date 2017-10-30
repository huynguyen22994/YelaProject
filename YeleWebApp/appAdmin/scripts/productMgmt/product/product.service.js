(function() {
    'use strict';

    angular
        .module('YelaApplication.ProductMgmt')
        .factory('ProductService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            getAllProducts: getAllProducts,
            searchProduct: searchProduct
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

        };
    }
})();