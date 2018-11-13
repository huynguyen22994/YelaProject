(function() {
    'use strict';

    angular
        .module('YelaAppClient.BlogSingle')
        .factory('BlogSingleService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            getBrands: getBrands,
            getCategories: getCategories,
            getBlogById: getBlogById,
            getBlogs: getBlogs
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

        function getBlogById(blogId) {
            return $http({
                url: '/api/blog/one',
                method: 'GET',
                params: {
                    blogId: blogId
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function getBlogs(offset, limit) {
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