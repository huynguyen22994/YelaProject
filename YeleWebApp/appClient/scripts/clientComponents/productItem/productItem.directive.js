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
                                <img ng-src="{{baseUrl}}{{data['linkImg']}}" alt="" />
                                <h2>{{data['price']}} VND</h2>
                                <p>{{data['name']}}</p>
                                <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
                            </div>
                            <div class="product-overlay">
                                <div class="overlay-content">
                                    <h2>{{data['price']}} VND</h2>
                                    <p>Easy Polo Black Edition</p>
                                    <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
                                </div>
                            </div>
                            <!-- <img src="images/home/new.png" class="new" alt="" /> -->
                        </div>
                        <div class="choose">
                            <ul class="nav nav-pills nav-justified">
                                <li><a href="#"><i class="fa fa-plus-square"></i>Add to wishlist</a></li>
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
    }
})();