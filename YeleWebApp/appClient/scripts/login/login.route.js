(function () {
    'use strict';

    angular
        .module('YelaAppClient.Login')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/login', {
                templateUrl: 'scripts/login/login.template.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            });
        //$locationProvider.html5Mode(true);
    };
})();