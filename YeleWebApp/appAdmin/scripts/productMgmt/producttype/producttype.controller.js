(function () {
    'use strict';

    angular
        .module('YelaApplication.ProductMgmt')
        .controller('ProducttypeCreateController', ControllerController);

    ControllerController.$inject = ['producttypes', '$scope', '$window', '$location', 'PagerService', 'ProducttypeService'];
    function ControllerController(producttypes, $scope, $window, $location, PagerService, ProducttypeService) {
        var vm = this;
        vm.classForTable = 'col-md-12 col-sm-12 col-lg-12';
        vm.classForDetail = '';
        vm.producttypeDetail = {};
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
            arrayColumnLabel: ['Tên', 'Ngày Tạo', 'Ngày Cập Nhật', 'Hành Động'],
            arrayColumnContent: ['name', 'createdAt', 'updatedAt'],
            arrayActions: [
                {
                    buttonName: 'button_edit',
                    className: 'btn btn-primary',
                    iconClass: 'fa fa-pencil-square-o',
                    tooltipTitle: 'tooltip_edit_asong',
                    action(song) {
                        //songCtrl.routeStateManager(songCtrl.stateSong, songCtrl.routeEditSongState + song.songID)
                        console.log('1');
                    }
                },
                {
                    buttonName: 'button_delete',
                    className: 'btn btn-danger',
                    iconClass: 'fa fa-trash-o',
                    tooltipTitle: 'tooltip_delete_asong',
                    disabled(item) {
                        return (item.productsCount > 0) ? true : false; 
                    },
                    action(item) {
                        deleteProducttype(item);
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
                getDetail(item);
            }
        };
        vm.configButtonHeader = {
            arrayButton: [
                {
                    buttonName: 'button_refresh',
                    className: 'btn btn-warning',
                    iconClass: 'fa fa-refresh',
                    tooltipTitle: 'tooltip_refresh',
                    action() {
                        refresh();
                    }
                },
                {
                    buttonName: 'button_add',
                    className: 'btn btn-success',
                    iconClass: 'fa fa-plus',
                    tooltipTitle: 'tooltip_add',
                    action() {
                        //songCtrl.routeStateManager(songCtrl.stateSong, songCtrl.routeCreateSongState);
                        $location.path('/productMgmt/product/create');
                    }
                },
                {
                    buttonName: 'button_delete',
                    className: 'btn btn-danger',
                    iconClass: 'fa fa-trash-o',
                    tooltipTitle: 'tooltip_multidelete_song',
                    disabled() {
                        return !checkAll;
                    },
                    action() {
                        $('#deleteMultiSong').modal('show');
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
                        search(Input);
                    }
                }
            ]
        };
        vm.configFormDetail = {
            items: [
                {
                    label: 'Tên',
                    queryModel: 'name',
                },
                {
                    label: 'Ngày Tạo',
                    queryModel: 'createdAt',
                },
                {
                    label: 'Ngày Cập Nhật',
                    queryModel: 'updatedAt',
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
            vm.producttypes = producttypes.data;
            setPage(vm.pageCustomize.currentPage, vm.pageCustomize.size);
        };

        function setPage(page, pageSize = vm.pageCustomize.size) {
            //pageSize = pageSize || songCtrl.pageCustomize.size;
            vm.pageCustomize.size = pageSize;
            vm.pageCustomize.currentPage = page;
            if(page < 1 || page > vm.pager.totalPages) {
                return;
            }
            if(vm.producttypes.length > 0) {
                vm.hasResult = true;
                vm.pager = PagerService.getPager(vm.producttypes.length, page, pageSize);
                vm.pager.setPage = setPage;
                vm.items = vm.producttypes.slice(vm.pager.startIndex, vm.pager.endIndex);
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
            vm.producttypeDetail = item;
            showDetail();
        };

        function deleteProducttype(item) {
            let productId = item.productTypeId;
            ProducttypeService.deleteProducttype(productId)
                .then(function (res) {
                    console.log(res);
                    loadPrducttype();
                }).catch(function (err) {
                    console.log(err);
                });
        };

        function loadPrducttype() {
            ProducttypeService.getAllProducttypes()
                .then(function (res) {
                    vm.producttypes = res.data;
                    setPage(vm.pageCustomize.currentPage, vm.pageCustomize.size);
                }).catch(function (err) {
                    console.log(err);
                });
        };

        function refresh() {
            ProducttypeService.getAllProducttypes()
                .then(function (res) {
                    vm.producttypes = res.data;
                    setPage(1);
                }).catch(function (err) {
                    console.log(err);
                });
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
            createOrRemoveArrayItemDelete(vm.producttypes);
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
                    if(vm.arrayItemDelete[i] == songID) {
                        vm.arrayItemDelete.splice(i, 1);
                    }
                }
            }  
        };

        function loadCheckDelete() {
            angular.forEach(vm.producttypes, (item) => {
                angular.forEach(vm.arrayItemDelete, (deleteItem) => {
                    if(item.productTypeId == deleteItem.productTypeId) {
                        item.checked = vm.configTable.checkBoxOptions.checkAll;
                    }
                });
            });
        };

        function search(key) {
            ProducttypeService.searchProducttype(key)
                .then(function (res) {
                    vm.producttypes = res.data.rows;
                    loadCheckDelete();
                    setPage(1);
                }).catch(function (err) {
                    console.log(err);
                });
        };

    };
})();