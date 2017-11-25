(function () {
    'use strict';

    angular
        .module('YelaApplication.ProductMgmt')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/productMgmt/product', {
                templateUrl: '/admin/scripts/productMgmt/product/product.html',
                controller: 'ProductController',
                controllerAs: 'vm'
            })
            .when('/productMgmt/product/edit/:id', {
                templateUrl: '/admin/scripts/productMgmt/product/editCreate/editCreate.template.html',
                controller: 'ProductCreateController',
                controllerAs: 'vm',
                routeId: 'edit'
            })
            .when('/productMgmt/product/create', {
                templateUrl: '/admin/scripts/productMgmt/product/editCreate/editCreate.template.html',
                controller: 'ProductCreateController',
                controllerAs: 'vm',
                routeId: 'create'
            });
        
    };
})();