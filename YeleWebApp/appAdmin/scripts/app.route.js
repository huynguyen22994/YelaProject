(function() {
    'use strict';

    angular
        .module('YelaApplication')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'index.html',
            controller: 'YelaAppController',
            controllerAs: 'vm',
            // resolve: {
            //     moviesPrepService: moviesPrepService
            // }
            })
        .otherwise({
            redirectTo: '/'
            }
        );
    };
})();