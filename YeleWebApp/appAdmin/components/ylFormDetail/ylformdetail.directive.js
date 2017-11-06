/*
    itemDetail = object item;
    config = {
        items: [
            {
                label: 'name',
                queryModel: 'name',
                isImg: boolean // if you want to set this item for IMG
            }
        ]
    }
*/

(function () {
    'use strict';

    angular
        .module('YlFormDetail', [])
        .directive('ylFormDetail', detailSong);

    detailSong.$inject = [];
    function detailSong() {

        var directive = {
            controller: ControllerController,
            restrict: 'EA',
            scope: {
                itemDetail: '=',
                config: '='
            },
            templateUrl: '/admin/components/ylFormDetail/ylformdetail.html',
        };
        return directive;

    }
    /* @ngInject */
    function ControllerController () {
        
    }
})();