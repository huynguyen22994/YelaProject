(function () {
    'use strict';

    angular
        .module('YelaApplication.ProductMgmt')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/productMgmt/brand', {
                templateUrl: '/admin/scripts/productMgmt/brand/brand.html',
                controller: 'BrandController',
                controllerAs: 'vm'
            })
            .when('/productMgmt/brand/edit/:id', {
                templateUrl: '/admin/scripts/productMgmt/brand/editCreate/editCreate.template.html',
                controller: 'BrandCreateController',
                controllerAs: 'vm',
                routeId: 'edit'
            })
            .when('/productMgmt/brand/create', {
                templateUrl: '/admin/scripts/productMgmt/brand/editCreate/editCreate.template.html',
                controller: 'BrandCreateController',
                controllerAs: 'vm',
                routeId: 'create'
            });
        
    };
})();