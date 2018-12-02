(function() {
    'use strict';

    angular
        .module('YelaAppClient.Blog')
        .factory('BlogService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            getBlogs: getBlogs
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

    }
})();