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
                arrayData: '='
            },
            //templateUrl: '/components/featuresItem/featuresItem.directive.html'
            template: `
            <div class="features_items">
                <h2 class="title text-center">Features Items</h2>
                <product-item ng-repeat="data in arrayData" data="data" ></product-item>
            </div>
            <div class="pagination-area">
                <ul class="pagination">
                    <li><a href=""><i class="fa fa-angle-double-left"></i></a></li>
                    <li><a href="" class="active">1</a></li>
                    <li><a href="">2</a></li>
                    <li><a href="">3</a></li>
                    <li><a href=""><i class="fa fa-angle-double-right"></i></a></li>
                </ul>
            </div>
            `
        };
        return directive;
        
    }
    /* @ngInject */
    function ControllerController ($scope) {
        var vm = this;
    }
})();