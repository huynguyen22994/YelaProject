(function() {
    'use strict';

    angular
        .module('YelaApplication.ProductMgmt')
        .controller('BrandCreateController', ControllerController);

    ControllerController.$inject = ['BrandService', '$scope', '$window', '$location', '$route', 'toastr', 'Upload', '$q', 'ylConstant'];
    function ControllerController(BrandService, $scope, $window, $location, $route, toastr, Upload, $q, ylConstant) {
        var vm = this;
        vm.Brand = {};
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
                loadBrandEdit(id);
            }
        };

        function loadBrandEdit(id) {
            BrandService.getBrandById(id)
                .then(function (res) {
                    vm.Brand = res.data;
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
            let brandObj = {
                name: vm.Brand.name,
                info: vm.Brand.info
            };
            BrandService.createBrand(brandObj)
                .then(function (res) {
                    toastr.success('Tạo mới thành công');
                    $location.path('/productMgmt/brand');
                }).catch(function (err) {
                    toastr.error('Tạo mới thất bại');
                });
            
        };

        function edit() {
            let brandObj = {
                brandId: vm.Brand.brandId,
                name: vm.Brand.name,
                info: vm.Brand.info
            };
            BrandService.updateBrand(brandObj)
                .then(function (res) {
                    toastr.success('Cập nhật thành công');
                    $location.path('/productMgmt/brand');
                }).catch(function (err) {
                    toastr.error('Cập nhật thất bại');
                });  
        };

        function cancel() {
            $location.path('/productMgmt/brand');
        };

    }
})();