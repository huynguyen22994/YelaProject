(function() {
    'use strict';

    angular
        .module('YelaApplication.ProductMgmt')
        .controller('ProducttypeEditCreateController', ControllerController);

    ControllerController.$inject = ['$scope', '$window', '$location', 'ProducttypeService', 'categories', '$route', 'toastr'];
    function ControllerController($scope, $window, $location, ProducttypeService, categories, $route, toastr) {
        var vm = this;
        vm.Category = {};
        vm.Producttype = {};
        vm.isCreate = isCreate;
        vm.isEdit = isEdit;
        vm.create = create;  
        vm.edit = edit;
        vm.cancel = cancel;

        activate();

        ////////////////

        function activate() {
            vm.categories = categories.data;
            if (isCreate()) {

            } else {
                let id = _.get($route, 'current.params.id');
                loadProducttypeEdit(id);
            }
        };

        function loadProducttypeEdit(id) {
            ProducttypeService.getProducttypeById(id)
                .then(function (res) {
                    vm.Producttype = res.data;
                    vm.Category = _.find(vm.categories, function (categorie) {
                        return categorie.categoryId === res.data.categoryId
                    });
            }).catch(function (err) {
                console.log(err);
                toastr.error('Have error when get productype');
            });
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
                    toastr.success('Tạo mới thành công');
                    $location.path('/productMgmt/producttype');
                }).catch(function (err) {
                    toastr.error('Tạo mới thất bại');
                });
        };

        function edit() {
            let productypeObj = {
                productTypeId: vm.Producttype.productTypeId,
                name: vm.Producttype.name,
                categoryId: vm.Category.categoryId
            };
            ProducttypeService.editProducttype(productypeObj)
                .then(function (res) {
                    toastr.success('Cập nhật thành công');
                    $location.path('/productMgmt/producttype');
                }).catch(function (err) {
                    toastr.error('Cập nhật thất bại');
                });
        };

        function cancel() {
            $location.path('/productMgmt/producttype');
        };
    }
})();