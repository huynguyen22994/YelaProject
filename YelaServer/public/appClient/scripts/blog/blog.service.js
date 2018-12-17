(function() {
    'use strict';

    angular
        .module('YelaAppClient.Blog')
        .factory('BlogService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            getBlogs: getBlogs,
            getBlogsByType: getBlogsByType
        };
        
        return service;

        ////////////////

        function getBlogs() {
            return $http({
                url: '/api/blog',
                method: 'GET'
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function getBlogsByType(type, offset) {
            return $http({
                url: '/api/blog/type',
                method: 'GET',
                params: {
                    offset: offset,
                    type: type
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

    }
})();