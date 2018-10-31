(function () {
    'use strict';

    angular
        .module('YelaApplication.ProductMgmt')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/productMgmt/home', {
                templateUrl: '/admin/scripts/productMgmt/home/home.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            });
    };
})();