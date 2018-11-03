(function() {
    'use strict';

    angular
        .module('FeaturesItem', [
            'ProductItem'
        ])
        .directive('featuresItem', Directive);

    Directive.$inject = [];
    function Directive() {
        var directive = {
            controller: ControllerController,
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
                arrayData: '=',
                config: '='
            },
            //templateUrl: '/components/featuresItem/featuresItem.directive.html'
            template: `
            <div class="features_items">
                <div ng-if="config.isLoading">
                    <div class="foodtech-loader"></div>
                    <div class="foodtech-loader-backdrop"></div>
                </div>
                <h2 class="title text-center">{{ 'featuresFood' | i18next }}</h2>
                <product-item ng-repeat="data in arrayData" data="data" config="vm.productItemConfig"></product-item>
            </div>
            <div class="pagination-area">
                <ul class="pagination">
                    <li ng-class="{disabled:vm.pageTotal === 1}">
                        <a ng-click="config.changePage(0, config.limit, 1)"><i class="fa fa-angle-double-left"></i></a>
                    </li>
                    <li ng-repeat="page in vm.pageArray">
                        <a ng-click="config.changePage(page.offset, page.limit, page.page)" ng-class="{active:page.page === config.currentPage}"> {{ page.page }} </a>
                    </li>
                    <li ng-class="{disabled:vm.pageTotal === 1}">
                        <a ng-click="config.changePage((vm.pageTotal  - 1) * config.limit, config.limit, vm.pageTotal)"><i class="fa fa-angle-double-right"></i></a>
                    </li>
                </ul>
            </div>
            `
        };
        return directive;
        
    }
    /* @ngInject */
    function ControllerController ($scope, $location) {
        var vm = this;
        vm.pageArray = [];        
        var flag = false;

        vm.productItemConfig = {
            viewDetail: function (item) {
                $location.path(`/detail/${item.productId}`);
            }
        }
        
        $scope.$watch('arrayData.length', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if (!flag) {
                    if ($scope.config) {
                        vm.pageTotal = Math.ceil($scope.config.totalItems / $scope.arrayData.length);
                        for (let i = 1; i <= vm.pageTotal; i++) {
                            let pageObj = {
                                offset: (i - 1) * $scope.config.limit,
                                limit: $scope.config.limit,
                                page: i
                            };
                            vm.pageArray.push(pageObj);
                        };
                        flag = true;
                    };
                };
            }
        });
        
    }
})();