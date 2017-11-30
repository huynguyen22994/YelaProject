(function () {
    'use strict';

    angular
        .module('YelaAppClient.Shop')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/shop', {
                templateUrl: 'shop.html',
                controller: 'ShopController',
                controllerAs: 'vm'
            });
        //$locationProvider.html5Mode(true);
    };
})();