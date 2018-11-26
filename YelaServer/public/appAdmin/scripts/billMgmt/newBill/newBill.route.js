(function () {
    'use strict';

    angular
        .module('YelaApplication.BillMgmt')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/billMgmt/new-bill', {
                templateUrl: '/admin/scripts/billMgmt/newBill/newBill.html',
                controller: 'NewBillController',
                controllerAs: 'vm'
            });
            // .when('/blogMgmt/blogs/edit/:id', {
            //     templateUrl: '/admin/scripts/blogMgmt/blog/editCreate/blog.editCreate.template.html',
            //     controller: 'BlogCreateController',
            //     controllerAs: 'vm',
            //     routeId: 'edit'
            // })
            // .when('/blogMgmt/blogs/create', {
            //     templateUrl: '/admin/scripts/blogMgmt/blog/editCreate/blog.editCreate.template.html',
            //     controller: 'BlogCreateController',
            //     controllerAs: 'vm',
            //     routeId: 'create'
            // });
    };
})();