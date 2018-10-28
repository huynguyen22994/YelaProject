/*
    params: config (obj):
    exp: var config = {
        query: {

        }
    }
*/

(function () {
    'use strict';

    angular
        .module('ProductItem', [])
        .directive('productItem', Directive);

    Directive.$inject = [];
    function Directive() {
        var directive = {
            controller: ControllerController,
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
                config: '=',
                data: '='
            },
            //templateUrl: '/components/productItem/productItem.directive.html'
            template: `
                <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3">
                    <div class="product-image-wrapper">
                        <div class="single-products">
                            <div class="productinfo text-center">
                                <div style="cursor:pointer" ng-click="config.viewDetail(data)">
                                    <img ng-src="{{baseUrl}}{{data['linkImg']}}" alt="" />
                                </div>
                                <h4>{{data['price']}}</h4>
                                <p>{{data['name']}}</p>
                                <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>{{ 'addToCart' | i18next }}</a>
                            </div>
                            <div ng-if="config.overlay" class="product-overlay">
                                <div class="overlay-content">
                                    <h2>{{data['price']}} VND</h2>
                                    <p>Easy Polo Black Edition</p>
                                    <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>{{ 'addToCart' | i18next }}</a>
                                </div>
                            </div>
                            <img ng-if="config.new" src="images/home/new.png" class="new" alt="" />
                        </div>
                        <div class="choose" ng-if="false"> <!-- should enable when user login -->
                            <ul class="nav nav-pills nav-justified">
                                <li><a href="#"><i class="fa fa-plus-square"></i>{{ 'addToWishlist' | i18next }}</a></li>
                                <li><a href="#"><i class="fa fa-plus-square"></i>Add to compare</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `
        };
        return directive;
        
    }
    /* @ngInject */
    function ControllerController($scope, clientConstant) {
        $scope.baseUrl = `${clientConstant.serverUrl}/`;

        if ($scope.config) {
            if (!angular.isFunction($scope.config.viewDetail)) {
                $scope.config.viewDetail = angular.noop;
            };   
        };
    }
})();