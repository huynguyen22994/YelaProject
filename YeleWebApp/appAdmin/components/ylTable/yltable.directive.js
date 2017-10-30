/*
        songCtrl.configTable = {
            arrayColumnLabel: ['image', 'name', 'artist', 'actions'],
            arrayColumnContent: [{ image: true, url: 'songPicture' }, 'songname', 'artist'],
            arrayActions: [
                {
                    buttonName: 'button_edit',
                    className: 'btn btn-primary',
                    iconClass: 'fa fa-pencil-square-o',
                    tooltipTitle: 'tooltip_edit_asong',
                    action(song) {
                        songCtrl.routeStateManager(songCtrl.stateSong, songCtrl.routeEditSongState + song.songID)
                    }
                },
                {
                    buttonName: 'button_delete',
                    className: 'btn btn-danger',
                    iconClass: 'fa fa-trash-o',
                    tooltipTitle: 'tooltip_delete_asong',
                    action(song) {
                        songCtrl.getSongIdDelete(song);
                    }
                },
                {
                    buttonName: 'Play song',
                    className: 'btn btn-default',
                    iconClass: 'fa fa-music',
                    tooltipTitle: 'tooltip_delete_asong',
                    action(song) {
                        playSong(song);
                    }
                }
            ],
            checkBoxOptions: {
                checkAll: SongService.checkAll,
                toggleCheckAll: function() {
                    songCtrl.toggleCheckAll();
                },
                toggleCheckOne: function(song) {
                    songCtrl.toggleCheckOne(song);
                }
            }
        };
*/

(function () {
    'use strict';
    angular
        .module('YlTable', [])
        .directive('ylTable', tableCustomize);

    function tableCustomize() {
        return {
            restrict: 'E',
            scope: {
                array: '=',
                config: '=',
                hasResult: '='
            },
            templateUrl: '/admin/components/ylTable/yltable.directive.html',
            controller: tableCustomizeController
        }
    };

    tableCustomizeController.$inject = ['$scope', '$window'];

    function tableCustomizeController($scope, $window) {

        $scope.$watch('array', watchArray);

        activate();
        
        function activate() {

            $scope.hasCheckBox = ($scope.config.checkBoxOptions) ? true : false;

            //$scope.noResultClass = ($window.innerWidth >= ValueConfig.responsiveConfig.width) ? 'no-result-lable' : 'no-result-lable-mobile';
        
        };

        function watchArray(newValue, oldValue) {
            $scope.items = newValue;
            let index = 0;
            if(newValue) {
                if($scope.items.length > 0) {
                    $scope.hasResult = true;
                } 
            } else {
                $scope.hasResult = false
            }
        };

    };

})();