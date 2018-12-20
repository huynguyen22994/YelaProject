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

        function getBlogs(offset, limit) {
            return $http({
                url: '/api/blog/bypaging',
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

        function getBlogsByType(type, offset, limit) {
            return $http({
                url: '/api/blog/type',
                method: 'GET',
                params: {
                    offset: offset,
                    limit: limit,
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