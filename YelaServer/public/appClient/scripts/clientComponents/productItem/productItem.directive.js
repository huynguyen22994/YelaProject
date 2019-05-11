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
                                    <img ng-src="{{ getFormatImgUrl(data['linkImg'], baseUrl) }}" alt="" />
                                </div>
                                <h4>{{data['priceFormatted']}}</h4>
                                <p>{{data['name']}}</p>
                                <a ng-click="addToCart(data)" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>{{ 'addToCart' | i18next }}</a>
                            </div>
                            <div ng-if="config.overlay" class="product-overlay">
                                <div class="overlay-content">
                                    <h2>{{data['priceFormatted']}} VND</h2>
                                    <p>Easy Polo Black Edition</p>
                                    <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>{{ 'addToCart' | i18next }}</a>
                                </div>
                            </div>
                            <img ng-if="config.new" src="images/home/new.png" class="new" alt="" />
                        </div>
                        <div class="choose" ng-if="true"> <!-- should enable when user login -->
                            <ul class="nav nav-pills nav-justified">
                                <li><a href="#"><i class="fa fa-heart"></i>{{ 'wishlist' | i18next }}</a></li>
                                <li><a ng-click="openQuickViewDetail(data)"><i class="fa fa-eye"></i>{{ 'viewQuick' | i18next }}</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `
        };
        return directive;
        
    }
    /* @ngInject */
    function ControllerController($scope, clientConstant, toastr, Product, $rootScope) {
        $scope.baseUrl = `${clientConstant.serverUrl}/`;
        $scope.addToCart = addToCart;
        $scope.getFormatImgUrl = getFormatImgUrl;
        $scope.openQuickViewDetail = openQuickViewDetail;

        if ($scope.config) {
            if (!angular.isFunction($scope.config.viewDetail)) {
                $scope.config.viewDetail = angular.noop;
            };   
        };

        active();
        ////////////////////////////
        function addToCart(product) {
            var _product = new Product(product.productId, product.name, product.price, product.linkImg);
            _product.upQuantity();
            $rootScope.Cart.addProduct(_product);
            toastr.success(product.name + ' đã được thêm vào giỏ hàng');
        }

        function active() {
            formatPrice();
        }

        function formatPrice() {
            if($scope.data) {
                $scope.data['priceFormatted'] = parseInt($scope.data.price).toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
            }
        }

        function getFormatImgUrl(url, baseUrlForImg) {
            return (isDriveUrl(url)) ? url : baseUrlForImg + url;
        };

        function isDriveUrl(url) {
            var regex = /^http/;
            return regex.test(url);
        }

        function openQuickViewDetail(data) {
            $rootScope.productDetailModal = data;
            $rootScope.openModal('product-quick-view')
        }

    }
})();