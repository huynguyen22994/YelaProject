(function () {
    'use strict';

    angular
        .module('YelaAppClient.Home')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        var urlActiveAccount = '/active-account/:token/:id/:email';

        $routeProvider
            .when('/', {
                templateUrl: 'home.html',
                controller: 'HomeController',
                controllerAs: 'vm',
                appId: 'home'
            })
            .when(urlActiveAccount, {
                templateUrl: 'home.html',
                controller: 'HomeController',
                controllerAs: 'vm',
                isActiveRoute: true
            })
            .otherwise({
                redirectTo : '/'
            });
        //$locationProvider.html5Mode(true);
    };
})();