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
            },
            //templateUrl: '/components/featuresItem/featuresItem.directive.html'
            template: `
            <div class="features_items"><!--features_items-->
                <h2 class="title text-center">Features Items</h2>
                <product-item></product-item>
            </div><!--features_items-->
            `
        };
        return directive;
        
    }
    /* @ngInject */
    function ControllerController ($scope) {
        var vm = this;
    }
})();