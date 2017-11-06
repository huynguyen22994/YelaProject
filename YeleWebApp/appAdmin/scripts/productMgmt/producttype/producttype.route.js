(function () {
    'use strict';

    angular
        .module('YelaApplication.ProductMgmt')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/productMgmt/producttype', {
                templateUrl: '/admin/scripts/productMgmt/producttype/producttype.html',
                controller: 'ProducttypeController',
                controllerAs: 'vm',
                resolve: {
                    producttypes: ['ProducttypeService', function (ProducttypeService) {
                        return ProducttypeService.getAllProducttypes();
                    }]
                }
            })
            .when('/productMgmt/producttype/create', {
                templateUrl: '/admin/scripts/productMgmt/producttype/editCreate/editCreate.template.html',
                controller: 'ProducttypeEditCreateController',
                controllerAs: 'vm',
                resolve: {
                    categories: ['ProducttypeService', function (ProducttypeService) {
                        return ProducttypeService.getAllCategories();
                    }]
                }
            });
    };
})();