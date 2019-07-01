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
                                    <img ng-src="{{ getFormatImgUrl(data['linkImg'], baseUrl) }}" alt="" on-error-src="{{ $root.notFoundImg }}" />
                                </div>
                                <h4>{{data['priceFormatted']}}</h4>
                                <p class="ellipsis">{{data['name']}}</p>
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
                                <li ng-if="showRemoveWishList()"><a href ng-click="removeProductFromWishlist(data)"><i class="fa fa-heart"></i>{{ 'removeLike' | i18next }}</a></li>
                                <li ng-if="showWishList()"><a href ng-click="addProductToWishlist(data)"><i class="fa fa-heart"></i>{{ 'wishlist' | i18next }}</a></li>
                                <li><a href ng-click="openQuickViewDetail(data)"><i class="fa fa-eye"></i>{{ 'viewQuick' | i18next }}</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `
        };
        return directive;
        
    }
    /* @ngInject */
    function ControllerController($scope, clientConstant, toastr, Product, $rootScope, WishlistService, $route) {
        $scope.baseUrl = `${clientConstant.serverUrl}/`;
        $rootScope.baseUrl = `${clientConstant.serverUrl}/`;
        $scope.addToCart = addToCart;
        $scope.getFormatImgUrl = getFormatImgUrl;
        $rootScope.getFormatImgUrl = getFormatImgUrl;
        $scope.openQuickViewDetail = openQuickViewDetail;
        $scope.addProductToWishlist = addProductToWishlist;
        $scope.removeProductFromWishlist = removeProductFromWishlist;
        $scope.showWishList = showWishList;
        $scope.showRemoveWishList = showRemoveWishList;

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

        function addProductToWishlist(data) {
            if($rootScope.Customer) {
                var customerId = $rootScope.Customer.getId();
                var productItem = JSON.stringify(getParseProductData(data));
                WishlistService.addProductToWishlist(customerId, productItem)
                .then(function(response) {
                    var resData = response.data || {};
                    if(resData.success) {
                        toastr.success(data.name + ' đã được thêm vào yêu thích');
                    } else {
                        toastr.error('Thêm vào yêu thích thất bại');
                    }
                }, function(error) {
                    toastr.error('Thêm vào yêu thích thất bại');
                })
            }
        }

        function removeProductFromWishlist(data) {
            if($rootScope.Customer) {
                var customerId = $rootScope.Customer.getId();
                var productItem = JSON.stringify(getParseProductData(data));
                WishlistService.removeProductFromWishlist(customerId, productItem)
                .then(function(response) {
                    var resData = response.data || {};
                    if(resData.success) {
                        toastr.success(data.name + ' đã được xóa khỏi yêu thích');
                        $rootScope.loadWishlist();
                    } else {
                        toastr.error('Xóa khỏi yêu thích thất bại');
                    }
                }, function(error) {
                    toastr.error('Xóa khỏi yêu thích thất bại');
                })
            }
        }

        function getParseProductData(data) {
            return {
                name: data.name,
                productId: data.productId,
                brandId: data.brandId,
                linkImg: data.linkImg,
                discribe: data.discribe,
                form: data.form,
                price: data.price,
                productStatus: data.productStatus,
                productTypeId: data.productTypeId,
                type: data.type
            }
        }

        function showWishList() {
            return $rootScope.isCustomerLogin() && !isWishlistApp();
        }

        function showRemoveWishList() {
            return $rootScope.isCustomerLogin() && isWishlistApp();
        }

        function isWishlistApp() {
            return $route.current.$$route.appId === 'wishlist';
        }

    }
})();