(function() {
    'use strict';

    angular
        .module('YelaApplication.ShippingMgmt')
        .controller('ShipCostController', ControllerController);

    ControllerController.$inject = ['$scope', '$window', '$location', 'PagerService', 'ShipCostService', 'ylConstant', '$mdDialog', '$q', 'CityService', 'DistrictService'];
    function ControllerController($scope, $window, $location, PagerService, ShipCostService, ylConstant, $mdDialog, $q, CityService, DistrictService) {
       var vm = this;
        vm.classForTable = 'col-md-12 col-sm-12 col-lg-12';
        vm.classForDetail = '';
        vm.shipCostDetail = {};
        vm.pager = {
            setPage: setPage
        };
        vm.hasResult = true;
        vm.pageCustomize = {
            currentPage: 1,
            size: '10'
        };
        var checkAll = false;
        vm.arrayItemDelete = [];

        //Config for form
        vm.configTable = {
            arrayColumnLabel: ['Thành Phố', 'Quận', 'Ship', 'Hành Động'],
            arrayColumnContent: ['city', 'district', 'cost'],
            arrayActions: [
                {
                    buttonName: 'button_edit',
                    className: 'btn btn-default',
                    iconClass: 'fa fa-pencil-square-o',
                    tooltipTitle: 'tooltip_edit_asong',
                    action(item) {
                        $location.path('/shippingMgmt/shipcost/edit/' + item.id);
                        //songCtrl.routeStateManager(songCtrl.stateSong, songCtrl.routeEditSongState + song.songID)
                    }
                },
                {
                    buttonName: 'button_delete',
                    className: 'btn btn-default',
                    iconClass: 'fa fa-trash-o',
                    tooltipTitle: 'tooltip_delete_asong',
                    disabled(item) {
                        return false; 
                    },
                    action(item, ev) {
                        var confirm = $mdDialog.confirm()
                            .title('Bạn có muốn xóa thành phố này?')
                            .textContent('All of the banks have agreed to forgive you your debts.')
                            .targetEvent(ev)
                            .ok('Delete')
                            .cancel('Cancel');

                        $mdDialog.show(confirm).then(function() {      
                            deleteShipCost(item);
                        }, function() {
                            console.log('cancel');
                        });
                    }
                }
            ],
            checkBoxOptions: {
                checkAll: checkAll,
                toggleCheckAll: function() {
                    toggleCheckAll();
                },
                toggleCheckOne: function(item) {
                    toggleCheckOne(item);
                }
            },
            trClick: function (item) {
                //getDetail(item);
            }
        };
        vm.configButtonHeader = {
            arrayButton: [
                {
                    buttonName: 'button_refresh',
                    className: 'btn btn-default',
                    iconClass: 'fa fa-refresh',
                    tooltipTitle: 'tooltip_refresh',
                    action() {
                        refresh();
                    }
                },
                {
                    buttonName: 'button_add',
                    className: 'btn btn-default',
                    iconClass: 'fa fa-plus',
                    tooltipTitle: 'tooltip_add',
                    action() {
                        //songCtrl.routeStateManager(songCtrl.stateSong, songCtrl.routeCreateSongState);
                        $location.path('/shippingMgmt/shipCost/create');
                    }
                }
            ],
            arrayInput: [
                {
                    className: 'form-control',
                    modelName: 'searchText',
                    modelOptions: { debounce: 500},
                    placeholder: 'button_search',
                    tooltipTitle: 'tooltip_search_song',
                    change(Input) {
                        //search(Input);
                    }
                }
            ]
        };
        vm.configFormDetail = {
            baseUrlForImg: `${ylConstant.serverUrl}/`,
            items: [
                {
                    label: 'Thành Phố',
                    queryModel: 'city',
                },
                {
                    label: 'Quận',
                    queryModel: 'district'
                },
                {
                    label: 'Ship',
                    queryModel: 'cost'
                }
            ],
            headerClick: function () {
                hideDetail();
            }
        };
        //End Config for form
        
        vm.isShowDetail = isShowDetail;

        activate();

        ////////////////

        //angular.element($window).bind('resize', watchResize);

        // function watchResize() {
        //     vm.viewDetail.mobile = ($window.innerWidth >= 400) ? false : true;
        //     $scope.$digest();
        // };

        function activate() {
            // CityService.getAllCities()
            //     .then(function (response) {
            //         vm.shipCost = response.data.rows;
            //         setPage(vm.pageCustomize.currentPage, vm.pageCustomize.size);
            //     }).catch(function (err) {
            //         console.log(err);
            //     });
            loadShipCost();
        };

        function loadShipCost(isRefresh) {
            initialShipCost().then(function(data) {
                vm.shipCostList = data;
                setPage(vm.pageCustomize.currentPage, vm.pageCustomize.size);
            })
        };

        function getShipCost() {
            return ShipCostService.getAllShipCost();
        };

        function getCities() {
            return ShipCostService.getAllCities();
        };

        function getDistrict() {
            return ShipCostService.getAllDistricts();
        };

        function initialShipCost() {
            return $q.all([
                getShipCost(),
                getCities(),
                getDistrict()
            ]).then(function(data) {
                var shipList = data[0].rows;
                var cities = data[1].rows;
                var districts = data[2].rows;
                angular.forEach(shipList, function(ship) {
                    var city = _.find(cities, function(c) {
                        return c.cityId === ship.cityId;
                    });
                    var district = _.find(districts, function(d) {
                        return d.districtId === ship.districtId;
                    });
                    ship.city = city.city;
                    ship.district = district.district;
                });

                return shipList;
            });
        };

        ///////////////////////////////////////////////////////////
        function setPage(page, pageSize = vm.pageCustomize.size) {
            //pageSize = pageSize || songCtrl.pageCustomize.size;
            vm.pageCustomize.size = pageSize;
            vm.pageCustomize.currentPage = page;
            if(page < 1 || page > vm.pager.totalPages) {
                return;
            }
            if(vm.shipCostList.length > 0) {
                vm.hasResult = true;
                vm.pager = PagerService.getPager(vm.shipCostList.length, page, pageSize);
                vm.pager.setPage = setPage;
                vm.items = vm.shipCostList.slice(vm.pager.startIndex, vm.pager.endIndex);
            } else {
                vm.hasResult = false;
            }
        };

        function showDetail () {
            vm.classForTable = 'col-md-9 col-sm-9';
            vm.classForDetail = 'col-md-3 col-sm-3';
        };

        function hideDetail() {
            vm.classForTable = 'col-md-12 col-sm-12';
            vm.classForDetail = '';
        };

        function isShowDetail() {
            return (vm.classForDetail !== '') ? true : false;

        };

        function getDetail (item) {
            vm.cityDetail = item;
            showDetail();
        };
        ////////////////////////////////////////////////////////////

        function deleteCity(item) {
            let cityId = item.cityId;
            CityService.deleteCity(cityId)
                .then(function (res) {
                    loadCity();
                }).catch(function (err) {
                    console.log(err);
                });
        };

        function loadCity() {            
            CityService.getAllCities()
                .then(function (response) {
                    vm.cities = response.data.rows;
                    setPage(vm.pageCustomize.currentPage, vm.pageCustomize.size);
                }).catch(function (err) {
                    console.log(err);
                });
            
        };

        function refresh() {
            loadShipCost(true);

            // CityService.getAllCities()
            //     .then(function (res) {
            //         vm.cities = res.data.rows;
            //         setPage(1);
            //     }).catch(function (err) {
            //         console.log(err);
            //     });
        };

        function toggleCheckAll() {
            // if(songCtrl.deleted) {
            //     songCtrl.resultSongDelete.length = 0;
            // } 
            
            if(vm.configTable.checkBoxOptions.checkAll) {
                vm.configTable.checkBoxOptions.checkAll = true;
                checkAll = true;
            } else {
                vm.configTable.checkBoxOptions.checkAll = false;
                checkAll = false;
            }
            createOrRemoveArrayItemDelete(vm.cities);
        };

        function createOrRemoveArrayItemDelete(arrayItems) {
            angular.forEach(arrayItems, (item) => {
                item.checked = vm.configTable.checkBoxOptions.checkAll;
                if(vm.configTable.checkBoxOptions.checkAll) {
                    item.statusDelete = false;
                    vm.arrayItemDelete.push(item);
                } else {
                    vm.arrayItemDelete.length = 0;
                }
            });
        };

        function toggleCheckOne(item) {
            
            // if(songCtrl.deleted) {
            //     songCtrl.resultSongDelete.length = 0;
            // } 

            addOrRemoveItemFormArray(item);

            if(vm.arrayItemDelete.length > 0) {
                vm.configTable.checkBoxOptions.checkAll = true;
                checkAll = true;
            } else {
                vm.configTable.checkBoxOptions.checkAll = false;
                checkAll = false;
            }

        };

        function addOrRemoveItemFormArray(item) {
            if(vm.arrayItemDelete.indexOf(item) == -1) {
                item.statusDelete = false;
                vm.arrayItemDelete.push(item);
            } else {
                for(var i = 0; i < vm.arrayItemDelete.length; i++) {
                    if(vm.arrayItemDelete[i] == item.blogId) {
                        vm.arrayItemDelete.splice(i, 1);
                    }
                }
            }  
        };

        function loadCheckDelete() {
            angular.forEach(vm.cities, (item) => {
                angular.forEach(vm.arrayItemDelete, (deleteItem) => {
                    if(item.cityId == deleteItem.cityId) {
                        item.checked = vm.configTable.checkBoxOptions.checkAll;
                    }
                });
            });
        };
    }
})();