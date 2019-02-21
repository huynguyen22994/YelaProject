(function() {
    'use strict';

    angular
        .module('YelaApplication.ShippingMgmt')
        .controller('CityCreateController', ControllerController);

    ControllerController.$inject = ['CityService', '$scope', '$window', '$location', '$route', 'toastr', 'Upload', '$q', 'ylConstant'];
    function ControllerController(CityService, $scope, $window, $location, $route, toastr, Upload, $q, ylConstant) {
        var vm = this;
        vm.City = {};
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
                loadCityEdit(id);
            }
        };

        function loadCityEdit(id) {
            CityService.getCityById(id)
                .then(function (res) {
                    vm.City = res.data;
            }).catch(function (err) {
                console.log(err);
                toastr.error('Have error when get city');
            });
        };

        function isCreate() {
            return (_.get($route, 'current.$$route.routeId') === 'create') ? true : false;
        };

        function isEdit() {
            return (_.get($route, 'current.$$route.routeId') === 'edit') ? true : false;
        };

        function create() {
            let cityObj = {
                city: vm.City.city,
                code: vm.City.code
            };
            CityService.createCity(cityObj)
                .then(function (res) {
                    toastr.success('Tạo mới thành công');
                    $location.path('/shippingMgmt/city');
                }).catch(function (err) {
                    toastr.error('Tạo mới thất bại');
                });
            
        };

        function edit() {
            let cityObj = {
                cityId: vm.City.cityId,
                city: vm.City.city,
                code: vm.City.code
            };
            CityService.updateCity(cityObj)
                .then(function (res) {
                    toastr.success('Cập nhật thành công');
                    $location.path('/shippingMgmt/city');
                }).catch(function (err) {
                    toastr.error('Cập nhật thất bại');
                });  
        };

        function cancel() {
            $location.path('/shippingMgmt/city');
        };

    }
})();