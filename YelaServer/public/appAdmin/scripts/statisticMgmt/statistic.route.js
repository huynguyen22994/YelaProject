(function () {
    'use strict';

    angular
        .module('YelaApplication.StatisticMgmt')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/statistic/bill', {
                templateUrl: '/admin/scripts/statisticMgmt/billMgmt/billMgmt.html',
                controller: 'StatisticBillController',
                controllerAs: 'vm'
            });
        //$locationProvider.html5Mode(true);
    };
})();