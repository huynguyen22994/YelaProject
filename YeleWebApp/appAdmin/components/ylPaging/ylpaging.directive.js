(function() {
    'use strict';
    angular
        .module('YlPaging', [])
        .directive('ylPaging', paging);

    function paging() {
        return {
            restrict: 'EA',
            scope: {
                // pager: '=',
                // pageCustomizeSize: '=',
                // hasResult: '='
                arrayObj: '=',
                arrayFilter: '=',
                pageCustomize: '='
            },
            templateUrl: '/admin/components/ylPaging/ylpaging.html',
            controller: PagingController
        }
    };

    PagingController.$inject = ['$scope', 'PagerService'];

    function PagingController($scope, PagerService) {

        $scope.setPaging = setPage;
        $scope.pageDropNumber = [
            { 
                id: 1,
                name: '1'
            },
            { 
                id: 5,
                name: '5'
            },
            {
                id: 10,
                name: '10'
            },
            {
                id: 15,
                name: '15'
            },
            {
                id: 20,
                name: '20'
            }
        ];
        $scope.selectItemNumber = selectItemNumber;
        $scope.widthResponsive = 400;

        activate();
        function activate() {
            // if($scope.pager.setPage) {
            //     $scope.setPaging = $scope.pager.setPage;
            // } else {
            //     setPageDefault();
            // }
            $scope.pager = PagerService.getPager($scope.arrayObj.length, $scope.pageCustomize.currentPage, $scope.pageCustomize.size);
            setPage(1);
        };

        function setPageDefault(page) {
            console.log('please define setPage function in pager');
        };

        function setPage(page, pageSize = $scope.pageCustomize.size) {
            $scope.pageCustomize.size = pageSize;
            $scope.pageCustomize.currentPage = page;
            if(page < 1 || page > $scope.pager.totalPages) {
                return;
            }
            if(Array.isArray($scope.arrayObj)) {
                $scope.hasResult = true;
                $scope.pager = PagerService.getPager($scope.arrayObj.length, page, pageSize);
                $scope.arrayFilter = $scope.arrayObj.slice($scope.pager.startIndex, $scope.pager.endIndex);
                //songCtrl.items = songCtrl.songList.songs.slice(songCtrl.pager.startIndex, songCtrl.pager.endIndex);
            } else {
                $scope.hasResult = false;
            }
        };

        function selectItemNumber(current, number) {
            if(current && number) {
                $scope.setPaging(current, number);
            } else {
                return;
            }         
        };

    }
})();