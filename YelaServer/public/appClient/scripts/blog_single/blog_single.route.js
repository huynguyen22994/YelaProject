(function () {
    'use strict';

    angular
        .module('YelaAppClient.BlogSingle')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/blog/:id', {
                templateUrl: 'blogsingle.html',
                controller: 'BlogSingleController',
                controllerAs: 'vm'
            });
        //$locationProvider.html5Mode(true);
    };
})();