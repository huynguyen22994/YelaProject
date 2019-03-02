(function () {
    'use strict';

    angular
        .module('YelaApplication.ShippingMgmt')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/shippingMgmt/shipcost', {
                templateUrl: '/admin/scripts/shippingMgmt/shipcost/shipcost.html',
                controller: 'ShipCostController',
                controllerAs: 'vm'
            })
            .when('/shippingMgmt/shipcost/edit/:cityId/:districtId', {
                templateUrl: '/admin/scripts/shippingMgmt/shipcost/editCreate/editCreate.template.html',
                controller: 'ShipCostCreateController',
                controllerAs: 'vm',
                routeId: 'edit'
            })
            .when('/shippingMgmt/shipcost/create', {
                templateUrl: '/admin/scripts/shippingMgmt/shipcost/editCreate/editCreate.template.html',
                controller: 'ShipCostCreateController',
                controllerAs: 'vm',
                routeId: 'create'
            });
    };
})();