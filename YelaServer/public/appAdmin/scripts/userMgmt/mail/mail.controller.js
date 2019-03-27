(function() {
    'use strict';

    angular
        .module('YelaApplication.UserManagement')
        .controller('MailController', ControllerController);

    ControllerController.$inject = ['socket', '$scope', 'MailService', 'PagerService', '$rootScope'];
    function ControllerController(socket, $scope, MailService, PagerService, $rootScope) {
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
            arrayColumnLabel: ['Tên', 'Email', 'Số Điện Thoại', 'Tình Trạng', 'Hành Động'],
            arrayColumnContent: ['name', 'email', 'phone', {key: 'status', labelClassFunction: function(item) {
                if(item.status === 'read') {
                    return 'yl-label-success';
                } else if(item.status === 'unreaded') {
                    return 'yl-label-warning';
                }
            }, formatter: function(item) {
                if(item.status === 'unreaded') {
                    return 'Chưa xem';
                } else if(item.status === 'readed') {
                    return 'Đã xem';
                }
            }}],
            arrayActions: [
                // {
                //     buttonName: 'button_edit',
                //     className: 'btn btn-default',
                //     iconClass: 'fa fa-pencil-square-o',
                //     tooltipTitle: 'tooltip_edit_asong',
                //     action(item) {
                //         $location.path('/productMgmt/brand/edit/' + item.brandId);
                //         //songCtrl.routeStateManager(songCtrl.stateSong, songCtrl.routeEditSongState + song.songID)
                //     }
                // },
                {
                    buttonName: 'view',
                    className: 'btn btn-default',
                    iconClass: 'fa fa-eye',
                    tooltipTitle: 'Xem thư',
                    disabled(item) {
                        return (item.productsCount > 0) ? true : false; 
                    },
                    action(item, ev) {
                        viewLetter(item);
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
        vm.letters = [];
        vm.config = {
          caption: 'Thư khách hàng',
          editor: true,
          sorter: true,
          search: true,
          layout: 'card',
          pageSize: 12,
          pageSizeOptions: '8,12',
          pager: true,
          viewportStop: true
        };  

        vm.mailModal = {
            headerTitle: '',
            contentMsg: '',
            show: function() {
                angular.element('#mailModal').modal('show');
            },
            hide: function() {
                angular.element('#mailModal').modal('hide');
            },
            toggle: function() {
                angular.element('#mailModal').modal('toggle');
            },
            closeCallback: function() {
                $location.path('/');
            }
        }

        activate();

        ////////////////

        function activate() { 
            getMailData();
        }

        function getMailData() {
            MailService.getAllMails()
                .then(function(response) {
                    var data = response.data;
                    if(data) {
                        var letters = data.rows || [];
                        vm.letters = letters;
                        setPage(vm.pageCustomize.currentPage, vm.pageCustomize.size);
                    }
                })
        }
        ////////////////

        //angular.element($window).bind('resize', watchResize);

        // function watchResize() {
        //     vm.viewDetail.mobile = ($window.innerWidth >= 400) ? false : true;
        //     $scope.$digest();
        // };

        function setPage(page, pageSize = vm.pageCustomize.size) {
            //pageSize = pageSize || songCtrl.pageCustomize.size;
            vm.pageCustomize.size = pageSize;
            vm.pageCustomize.currentPage = page;
            if(page < 1 || page > vm.pager.totalPages) {
                return;
            }
            if(vm.letters.length > 0) {
                vm.hasResult = true;
                vm.pager = PagerService.getPager(vm.letters.length, page, pageSize);
                vm.pager.setPage = setPage;
                vm.items = vm.letters.slice(vm.pager.startIndex, vm.pager.endIndex);
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

        function refresh() {
            MailService.getAllMails()
                .then(function(response) {
                    var data = response.data;
                    if(data) {
                        var letters = data.rows || [];
                        vm.letters = letters;
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
            createOrRemoveArrayItemDelete(vm.letters);
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

        function viewLetter(item) {
            vm.mailModal.headerTitle = item.name;
            vm.mailModal.contentMsg = item.message;
            vm.mailModal.show();
            if(item.status === 'unreaded') {
                var requestBody = MailService.helper.parseReadLetterBody(item);
                MailService.readMail(requestBody)
                    .then(function(response) {
                        var data = response.data;
                        if(data.isSuccess) {
                            getMailData();
                            $rootScope.$emit('updateLetterNotify')
                        }
                    }, function(error) {
                        console.log(error);
                    });
            }
        };

    }
})();