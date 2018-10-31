(function () {
    'use strict';

    angular
        .module('YelaAppClient.Home')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/', {
                templateUrl: 'home.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            });
        //$locationProvider.html5Mode(true);
    };
})();