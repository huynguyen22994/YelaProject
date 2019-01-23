(function() {
    'use strict';

    angular
        .module('YelaApplication.ProductMgmt')
        .factory('CategoryService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            getAllCategories: getAllCategories,
            searchCaterogy: searchCaterogy,
            deleteCategory: deleteCategory,
            getCategoryById: getCategoryById,
            createCategory: createCategory,
            updateCategory: updateCategory
        };
        
        return service;

        /////////////////////////////
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

        function searchCaterogy(key) {
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

        function deleteCategory(categoryId) {
            return $http({
                url: '/api/category',
                method: 'DELETE',
                params: {
                    categoryId: categoryId
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function getCategoryById(categoryId) {
            return $http({
                url: '/api/category/one',
                method: 'GET',
                params: {
                    categoryId: categoryId
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function createCategory(data) {
            return $http({
                url: '/api/category',
                method: 'POST',
                data: data
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function updateCategory(data) {
            return $http({
                url: '/api/category',
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