(function() {
    'use strict';

    angular
        .module('YelaApplication.UserManagement')
        .controller('UserController', ControllerController);

    ControllerController.$inject = ['socket', '$scope', 'UserService', 'PagerService', '$rootScope'];
    function ControllerController(socket, $scope, UserService, PagerService, $rootScope) {
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
            arrayColumnLabel: ['Hình ảnh', 'Tên', 'Họ', 'Email', 'Loại ĐN', 'Hành Động'],
            arrayColumnContent: [{ image: true, url: 'avatarLink', baseUrlForImg: ''}, 'firstName', 'lastName', 'email', 'loginType'],
            arrayActions: [
                // {
                //     buttonName: 'view',
                //     className: 'btn btn-default',
                //     iconClass: 'fa fa-eye',
                //     tooltipTitle: 'Xem thư',
                //     disabled(item) {
                //         return (item.productsCount > 0) ? true : false; 
                //     },
                //     action(item, ev) {
                //         viewLetter(item);
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
                    label: 'Tên Hiển Thị',
                    queryModel: 'displayName',
                },
                {
                    label: 'Tên',
                    queryModel: 'firstName'
                },
                {
                    label: 'Họ',
                    queryModel: 'lastName'
                },
                {
                    label: 'Email',
                    queryModel: 'email'
                },
                {
                    label: 'SĐT',
                    queryModel: 'phone'
                },
                {
                    label: 'Hình Ảnh',
                    queryModel: 'avatarLink',
                    isImg: true
                }
            ],
            baseUrlForImg: '',
            headerClick: function () {
                hideDetail();
            }
        };
        //End Config for form
        vm.isShowDetail = isShowDetail;
        vm.users = [];

        activate();

        ////////////////

        function activate() { 
            getUserData();
        }

        function getUserData() {
            UserService.getAllUser()
                .then(function(response) {
                    var data = response.data;
                    if(data) {
                        var users = data.rows || [];
                        vm.users = users;
                        setPage(vm.pageCustomize.currentPage, vm.pageCustomize.size);
                    }
                })
        }
        ////////////////

        function setPage(page, pageSize = vm.pageCustomize.size) {
            //pageSize = pageSize || songCtrl.pageCustomize.size;
            vm.pageCustomize.size = pageSize;
            vm.pageCustomize.currentPage = page;
            if(page < 1 || page > vm.pager.totalPages) {
                return;
            }
            if(vm.users.length > 0) {
                vm.hasResult = true;
                vm.pager = PagerService.getPager(vm.users.length, page, pageSize);
                vm.pager.setPage = setPage;
                vm.items = vm.users.slice(vm.pager.startIndex, vm.pager.endIndex);
            } else {
                vm.hasResult = false;
            }
        };

        function hideDetail() {
            vm.classForTable = 'col-md-12 col-sm-12';
            vm.classForDetail = '';
        };

        function isShowDetail() {
            return (vm.classForDetail !== '') ? true : false;

        };

        function refresh() {
            UserService.getAllUser()
                .then(function(response) {
                    var data = response.data;
                    if(data) {
                        var users = data.rows || [];
                        vm.users = users;
                        setPage(1);
                    }
                })
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
            createOrRemoveArrayItemDelete(vm.users);
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
                    if(vm.arrayItemDelete[i] == item) {
                        vm.arrayItemDelete.splice(i, 1);
                    }
                }
            }  
        };

        function getDetail (item) {
            vm.detailItem = item;
            showDetail();
        };

        function showDetail () {
            vm.classForTable = 'col-md-9 col-sm-9';
            vm.classForDetail = 'col-md-3 col-sm-3';
        };

    }
})();
