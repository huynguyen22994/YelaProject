(function () {
    'use strict';

    angular
        .module('YelaApplication.ProductMgmt')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/productMgmt/home', {
                templateUrl: '/admin/scripts/productMgmt/home/home.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            })
            .when('/productMgmt/product', {
                templateUrl: '/admin/scripts/productMgmt/product/product.html',
                controller: 'ProductController',
                controllerAs: 'vm',
                resolve: {
                    products: ['ProductService', function (ProductService) {
                        return ProductService.getAllProducts();
                    }]
                }
            })
            .when('/productMgmt/product/create', {
                templateUrl: '/admin/scripts/productMgmt/product/create/create.html',
                controller: 'ProductCreateController',
                controllerAs: 'vm',
            });
    };
})();