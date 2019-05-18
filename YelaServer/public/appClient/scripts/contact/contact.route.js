(function () {
    'use strict';

    angular
        .module('YelaAppClient.Contact')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/contact', {
                templateUrl: 'contact.html',
                controller: 'ContactController',
                controllerAs: 'vm',
                appId: 'contact'
            });
        //$locationProvider.html5Mode(true);
    };
})();