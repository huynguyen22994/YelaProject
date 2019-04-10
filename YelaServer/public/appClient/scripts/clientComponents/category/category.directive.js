(function() {
    'use strict';

    angular
        .module('Category', [])
        .directive('category', Directive);

    Directive.$inject = [];
    function Directive() {
        var directive = {
            controller: ControllerController,
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
                categoryData: '='
            },
            //templateUrl: '/components/category/category.directive.html'
            template: `
                <h2>{{ 'category' | i18next}}</h2>
                <div class="panel-group category-products" id="accordian"><!--category-productsr-->
                    <div class="panel panel-default" ng-repeat="category in categoryData">
                        <div class="panel-heading">
                            <h4 class="panel-title">
                                <a data-toggle="collapse" data-parent="#accordian" href="#{{ category.categoryId }}">
                                    <span ng-if="category.producttypes.length > 0" class="badge pull-right"><i class="fa fa-plus"></i></span>
                                    {{ category.name }}
                                </a>
                            </h4>
                        </div>
                        <div id="{{ category.categoryId }}" class="panel-collapse collapse" ng-if="category.producttypes.length > 0">
                            <div class="panel-body">
                                <ul>
                                    <li ng-repeat="producttype in category.producttypes">
                                        <a href="#/foodtype/{{ producttype.productTypeId }}">{{ producttype.name }}</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div><!--/category-products-->
            `
        };
        return directive;
        
    }
    /* @ngInject */
    function ControllerController ($scope) {
        var vm = this;
    }
})();