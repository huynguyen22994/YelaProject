(function () {
    'use strict';

    angular
        .module('YelaApplication.DashboardManagement')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/', {
                templateUrl: '/admin/scripts/dashboardMgmt/dashboardMgmt.html',
                controller: 'DashboardController',
                controllerAs: 'vm'
            });
        //$locationProvider.html5Mode(true);
    };
})();