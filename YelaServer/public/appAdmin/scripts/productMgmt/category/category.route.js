(function () {
    'use strict';

    angular
        .module('YelaApplication.ProductMgmt')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/productMgmt/category', {
                templateUrl: '/admin/scripts/productMgmt/category/category.html',
                controller: 'CategoryController',
                controllerAs: 'vm'
            })
            .when('/productMgmt/category/edit/:id', {
                templateUrl: '/admin/scripts/productMgmt/category/editCreate/editCreate.template.html',
                controller: 'CategoryCreateController',
                controllerAs: 'vm',
                routeId: 'edit'
            })
            .when('/productMgmt/category/create', {
                templateUrl: '/admin/scripts/productMgmt/category/editCreate/editCreate.template.html',
                controller: 'CategoryCreateController',
                controllerAs: 'vm',
                routeId: 'create'
            });
        
    };
})();