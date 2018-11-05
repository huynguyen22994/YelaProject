(function () {
    'use strict';

    angular
        .module('YelaAppClient.Foods')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/foods', {
                templateUrl: 'foods.html',
                controller: 'FoodsController',
                controllerAs: 'vm'
            });
        //$locationProvider.html5Mode(true);
    };
})();