(function () {
    'use strict';

    angular
        .module('YelaAppClient.Blog')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/blogs', {
                templateUrl: 'blogs.html',
                controller: 'BlogController',
                controllerAs: 'vm'
            })
            .when('/blogs/:id', {
                templateUrl: 'blogs.html',
                controller: 'BlogController',
                controllerAs: 'vm'
            });
        //$locationProvider.html5Mode(true);
    };
})();