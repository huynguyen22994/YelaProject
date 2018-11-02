(function () {
    'use strict';

    angular
        .module('YelaAppClient.FoodByType')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/foodtype/:id', {
                templateUrl: 'FoodType.html',
                controller: 'FoodTypeController',
                controllerAs: 'vm'
            });
        //$locationProvider.html5Mode(true);
    };
})();