(function () {
    'use strict';

    angular
        .module('YelaApplication.ShippingMgmt')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/shippingMgmt/city', {
                templateUrl: '/admin/scripts/shippingMgmt/city/city.html',
                controller: 'CityController',
                controllerAs: 'vm'
            })
            .when('/shippingMgmt/city/edit/:id', {
                templateUrl: '/admin/scripts/shippingMgmt/city/editCreate/blog.editCreate.template.html',
                controller: 'CityCreateController',
                controllerAs: 'vm',
                routeId: 'edit'
            })
            .when('/shippingMgmt/city/create', {
                templateUrl: '/admin/scripts/shippingMgmt/city/editCreate/blog.editCreate.template.html',
                controller: 'CityCreateController',
                controllerAs: 'vm',
                routeId: 'create'
            });
    };
})();