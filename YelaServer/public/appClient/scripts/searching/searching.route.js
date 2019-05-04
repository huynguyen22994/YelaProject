(function () {
    'use strict';

    angular
        .module('YelaAppClient.Searching')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/searching/:key', {
                templateUrl: 'searching.html',
                controller: 'SearchingController',
                controllerAs: 'vm'
            });
        //$locationProvider.html5Mode(true);
    };
})();