(function() {
    'use strict';

    angular
        .module('YelaApplication.BlogMgmt')
        .factory('BlogService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            getAllBlogs: getAllBlogs,
            searchProduct: searchProduct,
            deleteBlog: deleteBlog,
            getBlogById: getBlogById,
            createBlog: createBlog,
            updateBlog: updateBlog
        };
        
        return service;

        ////////////////
        function getAllBlogs() {
            return $http({
                url: '/api/blog',
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

        function deleteBlog(blogId, linkImg) {
            return $http({
                url: '/api/blog',
                method: 'DELETE',
                params: {
                    blogId: blogId
                }
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

        function createBlog(data) {
            return $http({
                url: '/api/blog',
                method: 'POST',
                data: data
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function updateBlog(data) {
            return $http({
                url: '/api/blog',
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