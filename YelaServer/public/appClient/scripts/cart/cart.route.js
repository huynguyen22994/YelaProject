(function () {
    'use strict';

    angular
        .module('YelaAppClient.CartApp')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/cart', {
                templateUrl: 'cart.html',
                controller: 'CartController',
                controllerAs: 'vm',
                appId: 'cart'
            });
        //$locationProvider.html5Mode(true);
    };
})();