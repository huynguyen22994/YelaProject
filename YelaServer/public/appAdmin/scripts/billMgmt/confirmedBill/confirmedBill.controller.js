(function() {
    'use strict';

    angular
        .module('YelaApplication.BillMgmt')
        .controller('ConfirmedBillController', ControllerController);

    ControllerController.$inject = ['$scope', '$window', '$location', 'PagerService', 'BillService', 'ylConstant', '$mdDialog', '$rootScope'];
    function ControllerController($scope, $window, $location, PagerService, BillService, ylConstant, $mdDialog, $rootScope) {
       var vm = this;
       var billStatus = 'confirmed';
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
            arrayColumnLabel: ['Mã Đơn Hàng','Khách Hàng', 'Ngày Đặt Hàng', 'SĐT', 'Hành Động', 'Tình Trạng'],
            arrayColumnContent: ['billId', 'customerName', 'orderDate', 'phoneOne', {key: 'status', labelClass: 'yl-label-warning'}],
            arrayActions: [
                {
                    buttonName: 'button_edit',
                    className: 'btn btn-default',
                    iconClass: 'fa fa-check-square',
                    tooltipTitle: 'Xác Nhận Đơn Hàng',
                    action(item) {
                        $location.path('/productMgmt/product/edit/' + item.productId);
                        //songCtrl.routeStateManager(songCtrl.stateSong, songCtrl.routeEditSongState + song.songID)
                    }
                },
                // {
                //     buttonName: 'button_delete',
                //     className: 'btn btn-default',
                //     iconClass: 'fa fa-trash-o',
                //     tooltipTitle: 'tooltip_delete_asong',
                //     disabled(item) {
                //         return (item.productsCount > 0) ? true : false; 
                //     },
                //     action(item, ev) {
                //         var confirm = $mdDialog.confirm()
                //             .title('Bạn có muốn xóa loại sản phẩm này?')
                //             .textContent('All of the banks have agreed to forgive you your debts.')
                //             .targetEvent(ev)
                //             .ok('Delete')
                //             .cancel('Cancel');

                //         $mdDialog.show(confirm).then(function() {      
                //             deleteProduct(item);
                //         }, function() {
                //             console.log('cancel');
                //         });
                //     }
                // }
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
                        $location.path('/productMgmt/product/create');
                    }
                },
                {
                    buttonName: 'button_delete',
                    className: 'btn btn-default',
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
            baseUrlForImg: `${ylConstant.serverUrl}/`,
            items: [
                {
                    label: 'Tên',
                    queryModel: 'name',
                },
                {
                    label: 'Tình Trạng',
                    queryModel: 'productStatus'
                },
                {
                    label: 'Ngày Tạo',
                    queryModel: 'createdAt',
                },
                {
                    label: 'Ngày Cập Nhật',
                    queryModel: 'updatedAt',
                },
                {
                    label: 'Hình Ảnh',
                    queryModel: 'linkImg',
                    isImg: true
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

        function activate() {
            loadBills();
        };

        function setPage(page, pageSize = vm.pageCustomize.size) {
            //pageSize = pageSize || songCtrl.pageCustomize.size;
            vm.pageCustomize.size = pageSize;
            vm.pageCustomize.currentPage = page;
            if(page < 1 || page > vm.pager.totalPages) {
                return;
            }
            if(vm.bills.length > 0) {
                vm.hasResult = true;
                vm.pager = PagerService.getPager(vm.bills.length, page, pageSize);
                vm.pager.setPage = setPage;
                vm.items = vm.bills.slice(vm.pager.startIndex, vm.pager.endIndex);
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

        function loadBills() {            
            BillService.getBillWithStatus(billStatus)
            .then(function (bills) {
                vm.bills = bills.data.bills;
                setPage(vm.pageCustomize.currentPage, vm.pageCustomize.size);
            }).catch(function (err) {
                console.log(err);
            });
        };

        function refresh() {
            BillService.getBillWithStatus(billStatus)
                .then(function (res) {
                    vm.bills = res.data.bills;
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
            createOrRemoveArrayItemDelete(vm.bills);
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
                    if(vm.arrayItemDelete[i] == item.billId) {
                        vm.arrayItemDelete.splice(i, 1);
                    }
                }
            }  
        };

        function loadCheckDelete() {
            angular.forEach(vm.bills, (item) => {
                angular.forEach(vm.arrayItemDelete, (deleteItem) => {
                    if(item.billId == deleteItem.billId) {
                        item.checked = vm.configTable.checkBoxOptions.checkAll;
                    }
                });
            });
        };

        function search(key) {
            // ProductService.searchProduct(key)
            //     .then(function (res) {
            //         vm.products = res.data.rows;
            //         loadCheckDelete();
            //         setPage(1);
            //     }).catch(function (err) {
            //         console.log(err);
            //     });
        };


    }
})();