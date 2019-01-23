(function() {
    'use strict';

    angular
        .module('YelaApplication.ProductMgmt')
        .controller('CategoryCreateController', ControllerController);

    ControllerController.$inject = ['CategoryService', '$scope', '$window', '$location', '$route', 'toastr', 'Upload', '$q', 'ylConstant'];
    function ControllerController(CategoryService, $scope, $window, $location, $route, toastr, Upload, $q, ylConstant) {
        var vm = this;
        vm.Category = {};
        vm.isCreate = isCreate;
        vm.isEdit = isEdit;
        vm.create = create;  
        vm.edit = edit;
        vm.cancel = cancel;

        activate();

        ////////////////

        async function activate() {
            if (isCreate()) {

            } else {
                let id = _.get($route, 'current.params.id');
                loadCategoryEdit(id);
            }
        };

        function loadCategoryEdit(id) {
            CategoryService.getCategoryById(id)
                .then(function (res) {
                    vm.Category = res.data;
            }).catch(function (err) {
                console.log(err);
                toastr.error('Have error when get brand');
            });
        };

        function isCreate() {
            return (_.get($route, 'current.$$route.routeId') === 'create') ? true : false;
        };

        function isEdit() {
            return (_.get($route, 'current.$$route.routeId') === 'edit') ? true : false;
        };

        function create() {
            let categoryObj = {
                name: vm.Category.name
            };
            CategoryService.createCategory(categoryObj)
                .then(function (res) {
                    toastr.success('Tạo mới thành công');
                    $location.path('/productMgmt/category');
                }).catch(function (err) {
                    toastr.error('Tạo mới thất bại');
                });
            
        };

        function edit() {
            let categoryObj = {
                categoryId: vm.Category.categoryId,
                name: vm.Category.name
            };
            CategoryService.updateCategory(categoryObj)
                .then(function (res) {
                    toastr.success('Cập nhật thành công');
                    $location.path('/productMgmt/category');
                }).catch(function (err) {
                    toastr.error('Cập nhật thất bại');
                });  
        };

        function cancel() {
            $location.path('/productMgmt/category');
        };

    }
})();