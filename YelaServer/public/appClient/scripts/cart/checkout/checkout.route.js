(function () {
    'use strict';

    angular
        .module('YelaAppClient.CartApp')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/checkout', {
                templateUrl: 'checkoutPage.html',
                controller: 'CheckoutController',
                controllerAs: 'vm',
                appId: 'checkout'
            });
        //$locationProvider.html5Mode(true);
    };
})();