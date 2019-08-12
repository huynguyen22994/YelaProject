(function() {
    'use strict';

    angular
        .module('YelaAppClient')
        .controller('ClientController', ControllerController);

    ControllerController.$inject = ['$i18next', '$timeout', '$rootScope', 'Cart', '$scope', 'LoginService', 'Customer', '$location', 'ModalService', 'Product', 'toastr', '$window', 'ShopService', 'clientConstant', 'ngMeta'];
    function ControllerController($i18next, $timeout, $rootScope, Cart, $scope, LoginService, Customer, $location, ModalService, Product, toastr, $window, ShopService, clientConstant, ngMeta) {
        var vm = this;
        var TIME_OUT = 500;
        var customerToken = window.localStorage.getItem('customerToken');
        // this is root cart
        $rootScope.Cart = new Cart();
        $rootScope.useChatBox = false;
        $rootScope.logout = logout;
        $rootScope.rootModal = {
            headerTitle: '',
            contentMsg: '',
            show: function() {
                angular.element('#rootModal').modal('show');
            },
            hide: function() {
                angular.element('#rootModal').modal('hide');
            },
            toggle: function() {
                angular.element('#rootModal').modal('toggle');
            },
            closeCallback: function() {
                $location.path('/');
            }
        }
        $rootScope.productDetailModal = {};
        $rootScope.notFoundImg = clientConstant.notFoundImg;

        //////// Function ////////
        $rootScope.getCustomer = getCustomer;
        $rootScope.openModal = openModal;
        $rootScope.closeModal = closeModal;
        $rootScope.addToCart = addToCart;
        $rootScope.setMetaTag = setMetaTag;

        activate();
        ////////////////

        function activate() { 
            getCustomer(customerToken);
            initCartFirst();
            openMainBenner();
        };

        function getCustomer(token) {
            var promise = new Promise(function(resolve, reject) {
                if(token) {
                    LoginService.getCustomerByToken(token)
                        .then(function(res) {
                            var data = res.data;
                            if(data) {
                                if(data.success) {
                                    var cusInfo = data.customer;
                                    $rootScope.Customer = new Customer(cusInfo.customerId, cusInfo.token, cusInfo.firstName, cusInfo.lastName, cusInfo.avatarLink, cusInfo.email);
                                    vm.spinnerHide = true;
                                }
                            }
                            resolve();
                        })
                } else {
                    $timeout(function() {
                        vm.spinnerHide = true;
                        resolve();
                    }, TIME_OUT);
                }
            })
            return promise;
        }

        function logout() {
            window.localStorage.removeItem("customerToken");
            $rootScope.Customer.destroy();
            $rootScope.$emit("closeChatBox");
            $location.path('/');
        }

        function openModal(id) {
            ModalService.Open(id);
        }

        function closeModal(id) {
            ModalService.Close(id);
        }

        function addToCart(product, quantity) {
            var _product = new Product(product.productId, product.name, product.price, product.linkImg);
            _product.upQuantity(quantity);
            $rootScope.Cart.adddProductWithQuatity(_product, quantity);
            toastr.success(product.name + ' đã được thêm vào giỏ hàng');
        }

        function initCartFirst() {
            var cacheCartString = window.localStorage.getItem('cart');
            var cacheCart = JSON.parse(cacheCartString);
            if(cacheCart && cacheCart.length > 0) {
                ShopService.getAllProducts()
                .then(function(response) {
                    vm.allProducts = response.data.products;
                    angular.forEach(cacheCart, function(productCache) {
                        var product = _.find(vm.allProducts, function(item) {
                            return item.productId === productCache.productId;
                        })
                        if(product) {
                            var _product = new Product(product.productId, product.name, product.price, product.linkImg);
                            _product.upQuantity(productCache.quantity);
                            $rootScope.Cart.adddProductWithQuatity(_product, productCache.quantity);
                        }
                    })
                })
            }
        }

        function cacheCart() {
            var cart = $rootScope.Cart.getProductList() || [], cacheCart = [];
            window.localStorage.removeItem('cart');
            angular.forEach(cart, function(product) {
                cacheCart.push({
                    productId: product.productId,
                    quantity: product.quantity
                });
            })
            window.localStorage.setItem('cart', JSON.stringify(cacheCart));
        }

        function openMainBenner() {
            setTimeout(function() {
                openModal('main-banner-dialog');
            }, 5000);
        }

        function setMetaTag(title, description, image) {
            ngMeta.setTitle(title);
            ngMeta.setTag('description', description);
            ngMeta.setTag('image', 'https://foodtechserver.herokuapp.com' + image);
        }

        $scope.$on("$destroy", function() {

        });

        $window.onbeforeunload = function (evt) {
            cacheCart();
        }

    }
})();