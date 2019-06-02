(function () {
    'use strict';

    angular
        .module('YelaAppClient.Wishlist')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/wishlist', {
                templateUrl: 'wishlist.html',
                controller: 'WishlistController',
                controllerAs: 'vm',
                appId: 'wishlist'
            });
        //$locationProvider.html5Mode(true);
    };
})();