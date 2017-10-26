(function() {
    'use strict';

    angular
        .module('YelaApplication.productManagement')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider', 'productMgmtConstant'];
    function configFunction($routeProvider, $locationProvider, productMgmtConstant) {
        let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when(productMgmtConstant.appUrl.productMgmt.routeUrl, {
                templateUrl: productMgmtConstant.appUrl.productMgmt.templateUrl,
            })
            .when(urlParams, {
                templateUrl: productMgmtConstant.appUrl.productMgmt.templateUrl,
                // resolve: {
                //     routeHome: checkState($routeParams)
                // }
            });
        $locationProvider.html5Mode(true);
    };
})();