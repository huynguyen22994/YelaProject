(function() {
    'use strict';

    angular
        .module('Brand', [])
        .directive('brand', Directive);

    Directive.$inject = [];
    function Directive() {
        var directive = {
            controller: ControllerController,
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
                brandData: '='
            },
            template: `
                <div class="brands_products"><!--brands_products-->
                    <h2>{{ 'brands' | i18next}}</h2>
                    <div class="brands-name">
                        <ul class="nav nav-pills nav-stacked">
                            <li ng-repeat="brand in brandData"><a href="#/shop"> <span class="pull-right">({{brand.ProductCount}})</span>{{brand.name}}</a></li>
                        </ul>
                    </div>
                </div><!--/brands_products-->
            `
        };
        return directive;
        
    }
    /* @ngInject */
    function ControllerController ($scope) {
        var vm = this;
        
    }
})();