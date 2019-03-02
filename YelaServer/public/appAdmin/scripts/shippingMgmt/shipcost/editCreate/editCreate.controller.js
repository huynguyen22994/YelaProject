(function() {
    'use strict';

    angular
        .module('YelaApplication.ShippingMgmt')
        .controller('ShipCostCreateController', ControllerController);

    ControllerController.$inject = ['ShipCostService', '$scope', '$window', '$location', '$route', 'toastr', 'Upload', '$q', 'ylConstant'];
    function ControllerController(ShipCostService, $scope, $window, $location, $route, toastr, Upload, $q, ylConstant) {
        var vm = this;
        vm.ShipCost = {};
        vm.City = {};
        vm.District = {};
        vm.isCreate = isCreate;
        vm.isEdit = isEdit;
        vm.create = create;  
        vm.edit = edit;
        vm.cancel = cancel;
        vm.cityList = [];
        vm.districtList = [];

        activate();

        ////////////////
        function isCreate() {
            return (_.get($route, 'current.$$route.routeId') === 'create') ? true : false;
        };

        function isEdit() {
            return (_.get($route, 'current.$$route.routeId') === 'edit') ? true : false;
        };
        ////////////////

        async function activate() {
            if (isCreate()) {
                prepareData();
            } else {
                let cityId = _.get($route, 'current.params.cityId');
                let districtId = _.get($route, 'current.params.districtId');
                loadShipCostEdit(cityId, districtId);
            }
        };

        function getCities() {
            return ShipCostService.getAllCities();
        };

        function getDistrict() {
            return ShipCostService.getAllDistricts();
        };

        function prepareData() {
            return $q.all([
                getCities(),
                getDistrict()
            ]).then(function(data) {
                vm.cityList = data[0].rows;
                vm.districtList = data[1].rows;
            });
        };

        function loadShipCostEdit(cityId, districtId) {
            prepareData().then(function() {
                ShipCostService.getShipCostByQuery(cityId, districtId)
                    .then(function (res) {
                        vm.ShipCost = res.data[0];
                        vm.City = _.find(vm.cityList, function(c) {
                            return c.cityId === vm.ShipCost.cityId;
                        });
                        vm.District = _.find(vm.districtList, function(d) {
                            return d.districtId === vm.ShipCost.districtId;
                        });

                }).catch(function (err) {
                    console.log(err);
                    toastr.error('Have error when get city');
                });
            });
        };

        function create() {
            if(vm.City.cityId && vm.District.districtId && vm.ShipCost.cost) {
                var requestObj = {
                    cost: vm.ShipCost.cost,
                    cityId: vm.City.cityId,
                    districtId: vm.District.districtId
                };
                ShipCostService.createShipCost(requestObj)
                    .then(function(res) {
                        toastr.success('Tạo mới thành công');
                        $location.path('/shippingMgmt/shipcost');
                    }).catch(function() {
                        toastr.error('Tạo mới thất bại');
                    })
            } else {
                toastr.error('Vui lòng điền đầy đủ thông tin');
            }
        };

        function edit() {
            if(vm.City.cityId && vm.District.districtId && vm.ShipCost.cost) { 
                var requestObj = {
                    cost: vm.ShipCost.cost,
                    cityId: vm.City.cityId,
                    districtId: vm.District.districtId
                };
                ShipCostService.updateShipCost(requestObj)
                .then(function(res) {
                    toastr.success('Cập nhật thành công');
                    $location.path('/shippingMgmt/shipcost');
                }).catch(function() {
                    toastr.error('Cập nhật thất bại');
                })
            }; 
        };

        function cancel() {
            $location.path('/shippingMgmt/shipcost');
        };

    }
})();