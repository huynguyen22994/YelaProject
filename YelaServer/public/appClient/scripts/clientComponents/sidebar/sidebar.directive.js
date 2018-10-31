(function() {
    'use strict';

    angular
        .module('Sidebar', [
            'Category',
            'Brand'
        ])
        .directive('sidebar', Directive);

    Directive.$inject = [];
    function Directive() {
        var directive = {
            controller: ControllerController,
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
                brandData: '=',
                categoryData: '='
            },
            template: `
                <div class="left-sidebar">
                    <category category-data="categoryData"></category>
                    <brand brand-data="brandData"></brand>                    
                    <div class="shipping text-center"><!--shipping-->
                        <img src="images/home/shipping.jpg" alt="" />
                    </div><!--/shipping-->
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