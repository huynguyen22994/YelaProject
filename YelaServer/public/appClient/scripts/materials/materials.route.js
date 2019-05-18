(function () {
    'use strict';

    angular
        .module('YelaAppClient.Materials')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/materials', {
                templateUrl: 'materials.html',
                controller: 'MaterialsController',
                controllerAs: 'vm',
                appId: 'materials'
            });
        //$locationProvider.html5Mode(true);
    };
})();