/*
    vm.configHeader = {
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
                    songCtrl.routeStateManager(songCtrl.stateSong, songCtrl.routeCreateSongState);
                }
            },
            {
                buttonName: 'button_delete',
                className: 'btn btn-danger',
                iconClass: 'fa fa-trash-o',
                tooltipTitle: 'tooltip_multidelete_song',
                disabled() {
                    return !SongService.checkAll;
                },
                action() {
                    $('#deleteMultiSong').modal('show');
                }
            }
        ],
        arrayInput: [
            {
                className: 'search-form',
                modelName: 'searchText',
                modelOptions: { debounce: 500},
                placeholder: 'button_search',
                tooltipTitle: 'tooltip_search_song',
                change(Input) {
                    searchSong(Input);
                }
            }
        ]
    };
*/

(function () {
    'use strict';
    angular
        .module('ylButtonHeader', [])
        .directive('ylButtonHeader', header);

    function header($window) {
        return {
            restrict: 'E',
            scope: {
                config: '=',
                list: '='
            },
            templateUrl: '/admin/components/ylButtonHeader/ylbuttonheader.html',
            controller: headerController
        }
    };

    headerController.$inject = ['$scope', '$window'];

    function headerController($scope, $window){
        
        $scope.arrayModel = [];
        $scope.widthResponsive = 400;
        $scope.toggleSearchInput = toggleSearchInput;

        activate();

        angular.element($window).bind('resize', function(){
            $scope.showIconSearch = ($window.innerWidth >= 400) ? false : true;
            $scope.showSearchInput = ($window.innerWidth >= 400) ? true : false;
            $scope.$digest();

        });

        $scope.$on('$destroy', function () {
            angular.element($window).unbind('resize');
        });

        function activate() {
            $scope.showIconSearch = ($window.innerWidth >= 400) ? false : true;
            $scope.showSearchInput = ($window.innerWidth >= 400) ? true : false;
            if($scope.list) {
                if($scope.list.searchText) {
                    $scope.showSearchInput = true;
                }
            };
            $scope.config.arrayModel = $scope.arrayModel;
        };

        function toggleSearchInput() {
            $scope.showSearchInput = ($scope.showSearchInput) ? false : true;
        };
        
    };

})();