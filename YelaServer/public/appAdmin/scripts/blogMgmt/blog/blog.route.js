(function () {
    'use strict';

    angular
        .module('YelaApplication.BlogMgmt')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/blogMgmt/blogs', {
                templateUrl: '/admin/scripts/blogMgmt/blog/blog.html',
                controller: 'BlogController',
                controllerAs: 'vm'
            })
            .when('/blogMgmt/blogs/edit/:id', {
                templateUrl: '/admin/scripts/productMgmt/product/editCreate/editCreate.template.html',
                controller: 'BlogCreateController',
                controllerAs: 'vm',
                routeId: 'edit'
            })
            .when('/blogMgmt/blogs/create', {
                templateUrl: '/admin/scripts/productMgmt/product/editCreate/editCreate.template.html',
                controller: 'BlogCreateController',
                controllerAs: 'vm',
                routeId: 'create'
            });
    };
})();