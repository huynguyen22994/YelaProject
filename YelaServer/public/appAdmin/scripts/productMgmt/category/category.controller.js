(function() {
    'use strict';

    angular
        .module('YelaApplication.ProductMgmt')
        .controller('CategoryController', ControllerController);

    ControllerController.$inject = ['$scope', '$window', '$location', 'PagerService', 'CategoryService', 'ylConstant', '$mdDialog'];
    function ControllerController($scope, $window, $location, PagerService, CategoryService, ylConstant, $mdDialog) {
       var vm = this;
        vm.classForTable = 'col-md-12 col-sm-12 col-lg-12';
        vm.classForDetail = '';
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
            arrayColumnLabel: ['Tên', 'Mô Tả', 'Ngày Cập Nhật', 'Hành Động'],
            arrayColumnContent: ['name', 'info', 'updatedAt'],
            arrayActions: [
                {
                    buttonName: 'button_edit',
                    className: 'btn btn-default',
                    iconClass: 'fa fa-pencil-square-o',
                    tooltipTitle: 'tooltip_edit_asong',
                    action(item) {
                        $location.path('/productMgmt/category/edit/' + item.categoryId);
                        //songCtrl.routeStateManager(songCtrl.stateSong, songCtrl.routeEditSongState + song.songID)
                    }
                },
                {
                    buttonName: 'button_delete',
                    className: 'btn btn-default',
                    iconClass: 'fa fa-trash-o',
                    tooltipTitle: 'tooltip_delete_asong',
                    action(item, ev) {
                        var confirm = $mdDialog.confirm()
                            .title('Bạn có muốn xóa loại sản phẩm này?')
                            .textContent('All of the banks have agreed to forgive you your debts.')
                            .targetEvent(ev)
                            .ok('Delete')
                            .cancel('Cancel');

                        $mdDialog.show(confirm).then(function() {      
                            deleteCategory(item);
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
                        $location.path('/productMgmt/category/create');
                    }
                }
                // {
                //     buttonName: 'button_delete',
                //     className: 'btn btn-default',
                //     iconClass: 'fa fa-trash-o',
                //     tooltipTitle: 'tooltip_multidelete_song',
                //     disabled() {
                //         return !checkAll;
                //     },
                //     action() {
                //         $('#deleteMultiSong').modal('show');
                //     }
                // }
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
                    label: 'Mô Tả',
                    queryModel: 'info'
                },
                {
                    label: 'Ngày Cập Nhật',
                    queryModel: 'updatedAt'
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
            CategoryService.getAllCategories()
                .then(function (res) {
                    vm.categories = res.data;
                    setPage(vm.pageCustomize.currentPage, vm.pageCustomize.size);
                }).catch(function (err) {
                    console.log(err);
                });
        };

        function setPage(page, pageSize = vm.pageCustomize.size) {
            //pageSize = pageSize || songCtrl.pageCustomize.size;
            vm.pageCustomize.size = pageSize;
            vm.pageCustomize.currentPage = page;
            if(page < 1 || page > vm.pager.totalPages) {
                return;
            }
            if(vm.categories.length > 0) {
                vm.hasResult = true;
                vm.pager = PagerService.getPager(vm.categories.length, page, pageSize);
                vm.pager.setPage = setPage;
                vm.items = vm.categories.slice(vm.pager.startIndex, vm.pager.endIndex);
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
            showDetail();
        };

        function deleteCategory(item) {
            let categoryId = item.categoryId;
            CategoryService.deleteCategory(categoryId)
                .then(function (res) {
                    loadCategories();
                }).catch(function (err) {
                    console.log(err);
                });
        };

        function loadCategories() {            
            CategoryService.getAllCategories()
                .then(function (res) {
                    vm.categories = res.data;
                    setPage(vm.pageCustomize.currentPage, vm.pageCustomize.size);
                }).catch(function (err) {
                    console.log(err);
                });
            
        };

        function refresh() {
            CategoryService.getAllCategories()
                .then(function (res) {
                    vm.categories = res.data;
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
            createOrRemoveArrayItemDelete(vm.categories);
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
            angular.forEach(vm.brands, (item) => {
                angular.forEach(vm.arrayItemDelete, (deleteItem) => {
                    if(item.categoryId == deleteItem.categoryId) {
                        item.checked = vm.configTable.checkBoxOptions.checkAll;
                    }
                });
            });
        };

        function search(key) {
            CategoryService.searchProduct(key)
                .then(function (res) {
                    vm.categories = res.data.rows;
                    loadCheckDelete();
                    setPage(1);
                }).catch(function (err) {
                    console.log(err);
                });
        };


    }
})();