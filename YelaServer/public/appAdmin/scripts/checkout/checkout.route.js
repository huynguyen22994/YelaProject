(function () {
    'use strict';

    angular
        .module('YelaApplication.CheckoutMgmt')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/checkout', {
                templateUrl: '/admin/scripts/checkout/home/checkout.html',
                controller: 'CheckoutController',
                controllerAs: 'vm'
            });
    };
})();