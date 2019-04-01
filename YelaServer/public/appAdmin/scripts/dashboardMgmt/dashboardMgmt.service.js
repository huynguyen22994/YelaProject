(function() {
    'use strict';

    angular
        .module('YelaApplication.DashboardManagement')
        .factory('DashboardService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            getDashboardBannerCount: getDashboardBannerCount
        };
        
        return service;

        ////////////////
        function getDashboardBannerCount() {
            return $http({
                url: '/api/dashboard/getBannerCount',
                method: 'GET'
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };
    }
})();