(function() {
    'use strict';

    angular
        .module('YelaApplication.ProductMgmt')
        .controller('ProducttypeEditCreateController', ControllerController);

    ControllerController.$inject = ['$scope', '$window', '$location', 'ProducttypeService', 'categories', '$route'];
    function ControllerController($scope, $window, $location, ProducttypeService, categories, $route) {
        var vm = this;
        vm.Category = {};
        vm.Producttype = {};
        vm.isCreate = isCreate;
        vm.isEdit = isEdit;
        vm.create = create;      
        vm.cancel = cancel;

        activate();

        ////////////////

        function activate() {
            vm.categories = categories.data;
            if (isCreate()) {

            } else {

            }
        };

        function isCreate() {
            return (_.get($route, 'current.$$route.routeId') === 'create') ? true : false;
        };

        function isEdit() {
            return (_.get($route, 'current.$$route.routeId') === 'edit') ? true : false;
        };

        function create() {
            let productypeObj = {
                name: vm.Producttype.name,
                categoryId: vm.Category.categoryId
            };
            ProducttypeService.createProducttype(productypeObj)
                .then(function (res) {
                    $location.path('/productMgmt/producttype');
                }).catch(function (err) {
                    
                });
        };

        function cancel() {
            $location.path('/productMgmt/producttype');
        };
    }
})();