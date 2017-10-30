(function() {
    'use strict';

    angular
        .module('YelaApplication.ProductMgmt')
        .controller('ProductController', ControllerController);

    ControllerController.$inject = ['products', '$scope', '$window', '$location'];
    function ControllerController(products, $scope, $window, $location) {
        var vm = this;
        vm.hasResult = (products.data.count === 0) ? false : true;
        vm.products = products.data.products;
        vm.classForTable = 'col-md-12 col-sm-12 col-lg-12';
        vm.classForDetail = '';
        vm.productDetail = {};
        vm.configTable = {
            arrayColumnLabel: ['Hình Ảnh', 'Tên', 'Tình Trạng', 'Mô Tả', 'Số Lượng', 'Hành Động'],
            arrayColumnContent: [{ image: true, url: 'songPicture' }, 'name', 'productStatus', 'discribe', 'quantity'],
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
                    action(song) {
                        //songCtrl.getSongIdDelete(song);
                        console.log('2');
                    }
                },
                {
                    buttonName: 'Play song',
                    className: 'btn btn-default',
                    iconClass: 'fa fa-music',
                    tooltipTitle: 'tooltip_delete_asong',
                    action(song) {
                        //playSong(song);
                        console.log('3');
                    }
                }
            ],
            checkBoxOptions: {
                //checkAll: SongService.checkAll,
                toggleCheckAll: function() {
                    //songCtrl.toggleCheckAll();
                },
                toggleCheckOne: function(song) {
                    //songCtrl.toggleCheckOne(song);
                }
            },
            trClick: function (item) {
                getSongDetail(item);
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
                        //return !SongService.checkAll;
                        return false;
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
                        //searchSong(Input);
                        console.log('dsfds');
                    }
                }
            ]
        };

        vm.configFormDetail = {
            items: [
                {
                    label: 'ID',
                    queryModel: 'productId',
                },
                {
                    label: 'Tên',
                    queryModel: 'name',
                },
                {
                    label: 'Tình Trạng',
                    queryModel: 'productStatus',
                },
                {
                    label: 'Số Lượng',
                    queryModel: 'quantity',
                },
                {
                    label: 'Giá',
                    queryModel: 'price',
                },
                {
                    label: 'Mô Tả',
                    queryModel: 'discribe',
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
        }

        vm.isShowDetail = isShowDetail;

        activate();

        ////////////////

        //angular.element($window).bind('resize', watchResize);

        // function watchResize() {
        //     vm.viewDetail.mobile = ($window.innerWidth >= 400) ? false : true;
        //     $scope.$digest();
        // };

        function activate () {

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

        function getSongDetail (item) {
            vm.productDetail = item;
            showDetail();
        };

    }
})();