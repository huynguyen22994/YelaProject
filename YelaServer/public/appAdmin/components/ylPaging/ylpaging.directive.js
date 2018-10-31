(function() {
    'use strict';
    angular
        .module('YlPaging', [])
        .directive('ylPaging', paging);

    function paging() {
        return {
            restrict: 'EA',
            scope: {
                pager: '=',
                pageCustomizeSize: '=',
                hasResult: '='
            },
            templateUrl: '/admin/components/ylPaging/ylpaging.html',
            controller: PagingController
        }
    };

    PagingController.$inject = ['$scope', 'PagerService'];

    function PagingController($scope, PagerService) {

        //$scope.pageDropNumber = ValueConfig.pageDropNumber;
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
        // $scope.widthResponsive = ValueConfig.responsiveConfig.width;
        $scope.widthResponsive = 400;
        $scope.$watch('pager', watchSetPage);

        function watchSetPage(newValue, oldValue) {
            if(newValue){
                console.log(newValue);
           } else {
               //$scope.routeCreateSong = null;
           }
        };

        activate();
        function activate() {
            if($scope.pager.setPage) {
                $scope.setPaging = $scope.pager.setPage;
            } else {
                setPageDefault();
            }
        };

        function setPageDefault(page) {
            console.log('please define setPage function in pager');
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