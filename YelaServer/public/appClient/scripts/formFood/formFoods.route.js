(function () {
    'use strict';

    angular
        .module('YelaAppClient.FormFoods')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/formfoods/:formId', {
                templateUrl: 'formFoods.html',
                controller: 'FormFoodsController',
                controllerAs: 'vm',
                appId: 'formfoods'
            });
        //$locationProvider.html5Mode(true);
    };
})();