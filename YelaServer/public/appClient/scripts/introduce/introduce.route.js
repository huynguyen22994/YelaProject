(function () {
    'use strict';

    angular
        .module('YelaAppClient.Introduce')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/introduce', {
                templateUrl: 'introduce.html',
                controller: 'IntroduceController',
                controllerAs: 'vm',
                appId: 'introduce'
            });
        //$locationProvider.html5Mode(true);
    };
})();