(function() {
    'use strict';

    angular
        .module('YelaApplication.ShippingMgmt')
        .controller('DistrictCreateController', ControllerController);

    ControllerController.$inject = ['DistrictService', '$scope', '$window', '$location', '$route', 'toastr', 'Upload', '$q', 'ylConstant'];
    function ControllerController(DistrictService, $scope, $window, $location, $route, toastr, Upload, $q, ylConstant) {
        var vm = this;
        vm.District = {};
        vm.City = {};
        vm.isCreate = isCreate;
        vm.isEdit = isEdit;
        vm.create = create;  
        vm.edit = edit;
        vm.cancel = cancel;

        activate();

        ////////////////

        async function activate() {
            vm.cities = await loadCities();

            if (isCreate()) {

            } else {
                let id = _.get($route, 'current.params.id');
                loadDistrictEdit(id);
            }
        };

        function loadDistrictEdit(id) {
            DistrictService.getDistrictById(id)
                .then(function (res) {
                    vm.District = res.data;
                    vm.City = _.find(vm.cities, function (city) {
                        return city.cityId === vm.District.cityId;
                    });
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
            let districtObj = {
                district: vm.District.district,
                code: vm.District.code,
                cityId: vm.City.cityId
            };
            DistrictService.createDistrict(districtObj)
                .then(function (res) {
                    var data = res.data;
                    if(data.success) {
                        toastr.success('Tạo mới thành công');
                        $location.path('/shippingMgmt/district');
                    } else {
                        toastr.error('Tạo mới thất bại');
                    }
                }).catch(function (err) {
                    toastr.error('Tạo mới thất bại');
                });
            
        };

        function edit() {
            let districtObj = {
                districtId: vm.District.districtId,
                district: vm.District.district,
                code: vm.District.code,
                cityId: vm.City.cityId
            };
            DistrictService.updateDistrict(districtObj)
                .then(function (res) {
                    var data = res.data;
                    if(data.success) {
                        toastr.success('Cập nhật thành công');
                        $location.path('/shippingMgmt/district');
                    } else {
                        toastr.error('Cập nhật thất bại');
                    }
                }).catch(function (err) {
                    toastr.error('Cập nhật thất bại');
                });  
        };

        function cancel() {
            $location.path('/shippingMgmt/district');
        };

        function loadCities() {
            return new Promise((resolve, reject) => {
                DistrictService.getAllCities()
                    .then(function (response) {
                        resolve(response.data.rows);
                    }).catch(function (err) {
                        console.log(err);
                        reject(err);
                    });
            });
        };

    }
})();