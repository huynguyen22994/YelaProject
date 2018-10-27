(function() {
    'use strict';

    angular
        .module('RecommendProduct', [
            'ProductItem'
        ])
        .directive('recommendProduct', Directive);

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
            //templateUrl: '/components/recommendedItem/recommendedItem.directive.html'
            template: `
                <div class="recommended_items"><!--recommended_items-->
                    <h2 class="title text-center">{{ 'recommendedFood' | i18next }}</h2>
                    <div id="recommended-item-carousel" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner">
                            <div class="item active">	
                                <product-item ng-repeat="data in arrayData" data="data" ></product-item>
                            </div>
                        </div>
                        <a class="left recommended-item-control" ng-hide="config.disableLeftButton()" ng-click="config.leftButton()" data-slide="prev">
                            <i class="fa fa-angle-left"></i>
                        </a>
                        <a class="right recommended-item-control" ng-hide="config.disableRightButton()" ng-click="config.rightButton()" data-slide="next">
                            <i class="fa fa-angle-right"></i>
                        </a>			
                    </div>
                </div><!--/recommended_items-->
            `
        };
        return directive;
        
    }
    /* @ngInject */
    function ControllerController ($scope) {
        var vm = this;

    }
})();