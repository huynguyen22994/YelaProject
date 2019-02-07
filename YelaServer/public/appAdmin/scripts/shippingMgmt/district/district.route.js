(function () {
    'use strict';

    angular
        .module('YelaApplication.ShippingMgmt')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/shippingMgmt/district', {
                templateUrl: '/admin/scripts/shippingMgmt/district/district.html',
                controller: 'DistrictController',
                controllerAs: 'vm'
            })
            .when('/shippingMgmt/district/edit/:id', {
                templateUrl: '/admin/scripts/shippingMgmt/district/editCreate/editCreate.template.html',
                controller: 'DistrictCreateController',
                controllerAs: 'vm',
                routeId: 'edit'
            })
            .when('/shippingMgmt/district/create', {
                templateUrl: '/admin/scripts/shippingMgmt/district/editCreate/editCreate.template.html',
                controller: 'DistrictCreateController',
                controllerAs: 'vm',
                routeId: 'create'
            });
    };
})();