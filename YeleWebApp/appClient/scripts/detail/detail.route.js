(function () {
    'use strict';

    angular
        .module('YelaAppClient.Detail')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/detail/:id', {
                templateUrl: 'detail.html',
                controller: 'DetailController',
                controllerAs: 'vm'
            });
        //$locationProvider.html5Mode(true);
    };
})();