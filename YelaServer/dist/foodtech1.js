(function() {
    'use strict';

    angular
        .module('YelaSocket', [
            'btford.socket-io'
        ])
        .factory('socket', Service);

    Service.$inject = ['$rootScope'];
    function Service($rootScope) {
        var socket = io.connect('/', {query:"side=client"});
        return {
          on: function (eventName, callback) {
            socket.on(eventName, function () {  
              var args = arguments;
              $rootScope.$apply(function () {
                callback.apply(socket, args);
              });
            });
          },
          emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
              var args = arguments;
              $rootScope.$apply(function () {
                if (callback) {
                  callback.apply(socket, args);
                }
              });
            })
          }
        };
    }
})();
(function() {
    'use strict';

    angular.module('YelaChatBox', [
        'YelaSocket'
    ])
    .directive('chatBox', Directive);

    Directive.$inject = [];
    function Directive() {
        var directive = {
            controller: ControllerController,
            restrict: 'EA',
            scope: {
            },
            templateUrl: '/scripts/clientComponents/chatBox/chatBox.directive.html'
        };
        return directive;
        
    }
    ControllerController.$inject = ['$scope', 'socket', '$rootScope']
    /* @ngInject */
    function ControllerController ($scope, socket, $rootScope) {
        $scope.cus = 'Customer';
        var $chatboxCredentials = $('.chatbox__credentials');
        var $chatbox = $('.chatbox');
        $scope.customer = {
            name: '',
            email: ''
        }
        $scope.chatBoxs = [];

        active();
        ///////////////////////////////////////////////////////////
        function active() {
            if($rootScope.Customer && $rootScope.Customer.isLogin()) {
                $scope.customer.name = $rootScope.Customer.getName();
                $scope.customer.email = $rootScope.Customer.getEmail();
                $scope.customer.image = $rootScope.Customer.getImage();
                $scope.enterChat();
            }
        };

        $scope.enterChat = function () {
            // if ($scope.customer.name !== '' && $scope.customer.email !== '') {
                socket.emit('customerJoin', $scope.customer);
                $chatboxCredentials.on('submit', function (e) {
                    e.preventDefault();
                    $chatbox.removeClass('chatbox--empty');
                });
            //}
        };

        $scope.closeChatBox = function() {
            $rootScope.useChatBox = false;
            $('#chatBoxs').empty();
        };

        socket.on('hello', function (admin, role, mes) {
            //$scope.chatBoxs.push({ name: admin, role: role, chat: mes });
            $('#chatBoxs').append(`
            <div class="chatbox__body__message chatbox__body__message--left">
                <img src="images/shop/administrator.png" alt="Picture">
                <b> ${admin}</b>
                <p> ${mes}</p>
            </div>
            `)
        });

        socket.on('loadOldMessage', function (customer) {
            $('#chatBoxs').empty();
            customer.chatBoxs.forEach(function (chat) {
                if (chat.role === 'admin') {
                    $('#chatBoxs').append(`
                        <div class="chatbox__body__message chatbox__body__message--left">
                            <img src="images/shop/administrator.png" alt="Picture">
                            <b> ${chat.name}</b>
                            <p> ${chat.message}</p>
                        </div>
                    `)
                } else {
                    $('#chatBoxs').append(`
                        <div class="chatbox__body__message chatbox__body__message--right">
                            <img src="${$scope.customer.image}" alt="Picture">
                            <b> ${chat.name}</b>
                            <p> ${chat.message}</p>
                        </div>
                    `)
                }
            });
        });

        socket.on('cusUpdateChat', function (customer, role, message) {
            if (role === 'admin') {
                $('#chatBoxs').append(`
                <div class="chatbox__body__message chatbox__body__message--left">
                    <img src="images/shop/administrator.png" alt="Picture">
                    <b> ${customer}</b>
                    <p> ${message}</p>
                </div>
                `)
            } else {
                $('#chatBoxs').append(`
                <div class="chatbox__body__message chatbox__body__message--right">
                    <img src="${$scope.customer.image}" alt="Picture">
                    <b> ${customer}</b>
                    <p> ${message}</p>
                </div>
                `)
            }
        });

        $scope.isCustomerChat = function (chat) {
            return (chat.role === 'admin') ? 'chatbox__body__message chatbox__body__message--left' : 'chatbox__body__message chatbox__body__message--right';
        };

        $scope.sendChat = function () {
            $('#chatBoxs').append(`
                <div class="chatbox__body__message chatbox__body__message--right">
                    <img src="${$scope.customer.image}" alt="Picture">
                    <b> ${$scope.customer.name}</b>
                    <p> ${$scope.message}</p>
                </div>
            `)
            socket.emit('cusSendChat', { customer: $scope.customer, role: 'customer', chat: $scope.message });
            $scope.$apply(function () {
                $scope.message = '';
            });
        };

        $('#mesageCustomer').keypress(function(e) {
            if(e.which == 13) {
                //$(this).blur();
                if($scope.message) {
                    $scope.sendChat();
                }
            }
        });

        $rootScope.$on("initChatBox", function() {
            active();
        });

        $rootScope.$on("closeChatBox", function() {
            $scope.closeChatBox();
        });
    };
})();
(function() {
    'use strict';

    angular
        .module('SlideShow', [])
        .directive('slideShow', Directive);

    Directive.$inject = [];
    function Directive() {
        var directive = {
            controller: ControllerController,
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
                config: '='
            },
            //templateUrl: 'components/silideShow/slideShow.directive.html'
            template: `
            <div id="slider-carousel" class="carousel slide" data-ride="carousel" style="position: initial">
                <ol class="carousel-indicators" style="width: 69%">
                    <li data-target="#slider-carousel" data-slide-to="0" class="active"></li>
                    <li data-target="#slider-carousel" data-slide-to="1"></li>
                    <li data-target="#slider-carousel" data-slide-to="2"></li>
                </ol>
                
                <div class="carousel-inner">
                    <div class="item active">
                        <div class="col-sm-4">
                            <h1><span>F </span>| Food Tech</h1>
                            <p>Chúng tôi luôn khát khao, cố gắng cải thiện từng ngày để mang đến những sản phẩm và một dịch vụ tốt nhất cho cộng đồng. </p>
                        </div>
                        <div class="col-sm-8">
                            <img src="images/home/foodtech_slide_1.jpg" class="girl img-responsive" alt="" />
                        </div>
                    </div>
                    <div class="item">

                        <!--<div class="col-sm-12 pull-right">
                            <h2 class="brandSlideShow">Free E-Commerce Template</h2>
                            <p class="textSlideShow">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                            <button type="button" class="btn btn-default get textSlideShow">Get it now</button>
                            <div class="textSlideShow">Caption Three</div>
                            <img src="images/home/foodtech_slide_2.jpg" class="girl img-responsive" alt="" />
                        </div>-->

                        <div class="col-sm-4">
                            <h1><span>Food |</span> Mì Tỏi</h1>
                            <p>Chúng tôi luôn khát khao, cố gắng cải thiện từng ngày để mang đến những sản phẩm và một dịch vụ tốt nhất cho cộng đồng. </p>
                        </div>
                        <div class="col-sm-8">
                            <img src="images/home/foodtech_slide_3.jpg" class="girl img-responsive"/>
                        </div>
                    </div>      
                    <div class="item">
                        <div class="col-sm-4">
                            <h1><span>Food |</span> Cơm Vò</h1>
                            <p>Chúng tôi luôn khát khao, cố gắng cải thiện từng ngày để mang đến những sản phẩm và một dịch vụ tốt nhất cho cộng đồng. </p>
                        </div>
                        <div class="col-sm-8">
                            <img src="images/home/foodtech_slide_2.jpg" class="girl img-responsive"/>
                        </div>
                    </div>  
                </div>
                <a href="#slider-carousel" class="left control-carousel hidden-xs" data-slide="prev" style="margin-left: 8%">
                    <i class="fa fa-angle-left"></i>
                </a>
                <a href="#slider-carousel" class="right control-carousel hidden-xs" data-slide="next">
                    <i class="fa fa-angle-right"></i>
                </a>
            </div>
            `
        };
        return directive;

    }
    ControllerController.$inject = ['$scope'];
    /* @ngInject */
    function ControllerController ($scope) {
        // config.data = [];
    }
})();
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
                            <div ng-if="config.overlay" class="productinfo product-overlay">
                                <div class="overlay-content">
                                    <div style="cursor:pointer" ng-click="config.viewDetail(data)">
                                        <img ng-src="{{ getFormatImgUrl(data['linkImg'], baseUrl) }}" alt="" on-error-src="{{ $root.notFoundImg }}" />
                                    </div>
                                    <h2>{{data['priceFormatted']}} VND</h2>
                                    <p>{{ data['name'] }}</p>
                                    <a ng-click="addToCart(data)" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>{{ 'addToCart' | i18next }}</a>
                                </div>
                            </div>
                            <div ng-if="data['quantity'] < 1" class="product-blocked">
                                <label class="newarrival banner-lable">{{ 'Tạm Hết' | i18next }}</label> 
                                <div class="blocked-content">
                                    <!--<p>Hôm nay quán không có món này mất rồi.</p>-->
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
    ControllerController.$inject = ['$scope', 'clientConstant', 'toastr', 'Product', '$rootScope', 'WishlistService', '$route'];
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
/*
    Docs: header-App
    params: config is Object
    exmp: config = {
        headerTop: {
            left: [
                {iconClass: 'fa fa-phone', label: '+2 95 01 88 821', href: function(){ return string; } },
                {iconClass: 'fa fa-envelope', label: '+2 95 01 88 821', href: function(){ return string; }}
            ],
            right: [
                {iconClass: 'fa fa-facebook', href: function(){ return string; } }
                {iconClass: 'fa fa-twitter', href: function(){ return string; } }
                {iconClass: 'fa fa-linkedin', href: function(){ return string; } }
                {iconClass: 'fa fa-dribbble', href: function(){ return string; } }
                {iconClass: 'fa fa-google-plus', href: function(){ return string; } }
            ]
        },
        headerMiddle: {
            left: [

            ],
            right: [
                {iconClass: 'fa fa-user', label: 'Account', href: function(){  } },
                {iconClass: 'fa fa-star', label: 'Wishlist', href: function(){  } },
                {iconClass: 'fa fa-crosshairs', label: 'Checkout', href: function(){  } },
                {iconClass: 'fa fa-shopping-cart', label: 'Cart', href: function(){  } },
                {iconClass: 'fa fa-lock', label: 'Login', href: function(){  } },
            ]
        },
        headerBottom: {
            left: [

            ],
            right: [

            ]
        }
    }
*/

(function () {
    'use strict';

    angular
        .module('HeaderApp', ['ngRoute'])
        .directive('headerApp', Directive);

    Directive.$inject = [];
    function Directive() {
        var directive = {
            controller: ControllerController,
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
                config: '='
            },
            templateUrl: 'scripts/clientComponents/header/header.directive.html'
        };
        return directive;
        
    }
    ControllerController.$inject = ['$scope', '$rootScope', '$location', '$route'];
    /* @ngInject */
    function ControllerController ($scope, $rootScope, $location, $route) {
        var vm = this;
        vm.onHeaderBottom = onHeaderBottom;
        vm.isCustomerLogin = isCustomerLogin;
        vm.search = search;
        vm.detectActiveMenu = detectActiveMenu;
        vm.config = {
            headerTop: {
                left: [
                    { iconClass: 'fa fa-phone', label: '0933800024', href: function () {  return 'aa'} },
                    { iconClass: 'fa fa-envelope', label: 'foodtechshopvn@gmail.com', href: function () { return 'test'; } }
                ],
                right: [
                    { iconClass: 'fa fa-facebook', href: function () { return 'https://www.facebook.com/foodtechshop'; } },
                    {iconClass: 'fa fa-instagram', href: function () { return 'https://www.instagram.com/foodtechshop.vn/'; } },
                    {iconClass: 'fa fa-shopping-bag', href: function () { return 'https://shopee.vn/foodtechshop'; } },
                ]
            },
            headerMiddle: {
                left: [
    
                ],
                right: [
                    // { iconClass: 'fa fa-user', label: 'Account', href: function () { return 'string'; } },
                    { id: 'wishlist', iconClass: 'fa fa-star', label: 'wishlist', 
                        hide: function() {
                            if($rootScope.Customer) {
                                return !$rootScope.Customer.isLogin();
                            }
                            return true;
                        },
                        href: function () { return '#/wishlist'; } 
                    },
                    { id: 'checkout', iconClass: 'fa fa-crosshairs', label: 'checkout', href: function () { return '#/checkout'; } },
                    { id: 'cart', iconClass: 'fa fa-shopping-cart', label: 'cart', useNotice: true, href: function () { return '#/cart'; } },
                    { 
                        id: 'login',
                        iconClass: 'fa fa-lock', 
                        label: 'signIn', 
                        hide: function() {
                            if($rootScope.Customer) {
                                return $rootScope.Customer.isLogin();
                            }
                            return false;
                        },
                        href: function () { 
                            return '#/login'; 
                        } 
                    },
                ]
            },
            headerBottom: {
                left: [
                    {id: 'home', label: 'home', href: function () { return '/'; }, isChoosen: false, subItems: [
                        { id: 'introduce', label: 'introduce', href: function () { return '#/about'; }},
                        { id: 'contact', label: 'contact', href: function () { return '#/contact'; }},
                        { id: 'recruitment', label: 'recruitment', href: function () { return '#/recruitment'; }}
                    ] },
                    {id: 'foods', label: 'foods', href: function () { return '#/foods'; }, isChoosen: false, subItems: [
                        { id: 'mainFood', label: 'mainFood', href: function () { return '#/formfoods/main'; }},
                        { id: 'secondaryFood', label: 'secondaryFood', href: function () { return '#/formfoods/second'; }}
                    ]},
                    {id: 'materials', label: 'materials', href: function () { return '#/materials'; }, isChoosen: false },
                    {id: 'shop', label: 'products', href: function () { return '#/shop'; }, isChoosen: false },
                    // {id: 'contactPage', label: 'contact', href: function () { return '#/contact'; }, isChoosen: false },
                    {id: 'blogs', label: 'blog', href: function () { return '#/blogs'; }, isChoosen: false }
                ],
                right: [
                    
                ]
            }
        };
        $rootScope.isCustomerLogin = isCustomerLogin;
        $rootScope.isSmallScreen = false;

        initialize();
        //////////////////////////////
        function initialize() {
            handleHeaderMiddleFixed();
        }

        function onHeaderBottom(key) {
            if(angular.isArray(vm.config.headerBottom.left)) {
                angular.forEach(vm.config.headerBottom.left, function(menu) {
                    if(menu.id === key) {
                        menu.isChoosen = true;
                    } else {
                        menu.isChoosen = false;
                    }
                })
            }
        };

        function isCustomerLogin() {
            if($rootScope.Customer) {
                return $rootScope.Customer.isLogin();
            }
            return false;
        };

        function search() {
            $location.path(`/searching/${$rootScope.searchValue}`);
        };

        function handleHeaderMiddleFixed() {
            var headerMiddle = $('#foodtech-header-middle'),
            distance = headerMiddle.offset().top,
            $window = $(window);
    
            $window.scroll(function() {
                if ( $window.scrollTop() >= distance ) {
                    headerMiddle.addClass('header-middle-fixed');
                 } else {
                     headerMiddle.removeClass('header-middle-fixed');
                 }
            });
        }

        function detectActiveMenu(appId, currentApp) {
            var currentAppId = currentApp || $route.current.$$route.appId;
            return appId === currentAppId;
        }

        $rootScope.$on( "$routeChangeStart", function(event, next, current) {
            //next.data.private;
         });

         $scope.$watch('width', function(newVal, oldVal){
            if(newVal && newVal < 560) {
                $rootScope.isSmallScreen = true;
            } else {
                $rootScope.isSmallScreen = false;
            }
        })

    }
})();
(function() {
    'use strict';

    angular
        .module('FooterApp', [
            'jm.i18next'
        ])
        .directive('footerApp', Directive);

    Directive.$inject = [];
    function Directive() {
        var directive = {
            controller: ControllerController,
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
            },
            templateUrl: 'scripts/clientComponents/footer/footer.directive.html'
        };
        return directive;

    }
    ControllerController.$inject = ['$scope', '$i18next'];
    /* @ngInject */
    function ControllerController ($scope, $i18next) {
        var vm = this;
        vm.changeLanguage = changeLanguage;

        ///////////////////////////////
        function changeLanguage(key) {
            $i18next.changeLanguage(key);
        };
    }
})();
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
    ControllerController.$inject = ['$scope'];
    /* @ngInject */
    function ControllerController ($scope) {
        var vm = this;
    }
})();
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
    ControllerController.$inject = ['$scope'];
    /* @ngInject */
    function ControllerController ($scope) {
        var vm = this;
        
    }
})();
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
                        <img src="images/home/banner.jpg" alt="" />
                    </div><!--/shipping-->
                </div>
            `
        };
        return directive;
        
    }

    ControllerController.$inject = ['$scope'];
    /* @ngInject */
    function ControllerController ($scope) {
        var vm = this;
    }
})();
(function() {
    'use strict';

    angular
        .module('Tab', [])
        .directive('tab', Directive);

    Directive.$inject = [];
    function Directive() {
        var directive = {
            controller: ControllerController,
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
            },
            templateUrl: 'scripts/clientComponents/tab/tab.directive.html'
        };
        return directive;
        
    }
    ControllerController.$inject = ['$scope', '$http', '$location'];
    /* @ngInject */
    function ControllerController ($scope, $http, $location) {
        var vm = this;
        vm.tabMenuConfig = {
            tabs: [
                {
                    id: '#posts',
                    label: 'posts',
                    isChoosen: true,
                    items: [
                        // {
                        //     label: 'Easy Polo Black Edition',
                        //     image: 'images/home/gallery1.jpg'
                        // }
                    ]
                }
                // {
                //     id: '#newPosts',
                //     label: 'newPosts',
                //     isChoosen: false,
                //     items: [
                //         // {
                //         //     label: 'Easy Polo Black Edition',
                //         //     image: 'images/home/gallery2.jpg'
                //         // }
                //     ]
                // }
            ]
        };

        vm.onChooseTab = onChooseTab;
        vm.view = view;

        active();
        //////////////////////////////
        function active() {
            getAllBlog();
        }

        function getAllBlog() {
            getBlogs().then(function(response) {
                var data = response.data;
                var listBog = parseBlog(data.blogs);
                vm.tabMenuConfig.tabs[0].items = listBog;
            }).catch(function(error) {
                console.log(error);
            });
        }

        function onChooseTab(key) {
            angular.forEach(vm.tabMenuConfig.tabs, function(tab) {
                if(tab.id === key) {
                    tab.isChoosen = true;
                } else {
                    tab.isChoosen = false;
                }
            })
        }

        function getBlogs() {
            return $http({
                url: '/api/blog',
                method: 'GET'
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function parseBlog(listBlog) {
            var result = [];
            angular.forEach(listBlog, function(blog) {
                result.push({
                    id: blog.blogId,
                    label: blog.title,
                    image: blog.imageLink
                });
            })
            return result;
        }

        function view(contentId, tabId) {
            $location.path(`/blog/${contentId}`);
        }
    }
})();
(function() {
    'use strict';

    angular
        .module('RecommendProduct', [
            'ProductItem'
        ])
        .directive('recommendProduct', Directive);

    Directive.$inject = [];
    function Directive() {
        var directive = {
            controller: ControllerController,
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
                arrayData: '=',
                config: '='
            },
            //templateUrl: '/components/recommendedItem/recommendedItem.directive.html'
            template: `
                <div class="recommended_items"><!--recommended_items-->
                    <div ng-if="config.isLoading">
                        <div class="foodtech-loader"></div>
                        <div class="foodtech-loader-backdrop"></div>
                    </div>
                    <h2 class="title text-center">{{ config.title | i18next }}</h2>
                    <div id="recommended-item-carousel" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner">
                            <div class="item active">	
                                <product-item ng-repeat="data in arrayData" data="data" config="vm.productItemConfig"></product-item>
                            </div>
                        </div>
                        <a class="left recommended-item-control" ng-hide="config.disableLeftButton()" ng-click="config.leftButton()" data-slide="prev">
                            <i class="fa fa-angle-left"></i>
                        </a>
                        <a class="right recommended-item-control" ng-hide="config.disableRightButton()" ng-click="config.rightButton()" data-slide="next">
                            <i class="fa fa-angle-right"></i>
                        </a>			
                    </div>
                </div><!--/recommended_items-->
            `
        };
        return directive;
        
    }
    ControllerController.$inject = ['$scope', '$location'];
    /* @ngInject */
    function ControllerController ($scope, $location) {
        var vm = this;
        vm.productItemConfig = {
            viewDetail: function (item) {
                $location.path(`/detail/${item.productId}`);
            }
        }
    }
})();
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
                arrayData: '=',
                config: '='
            },
            //templateUrl: '/components/featuresItem/featuresItem.directive.html'
            template: `
            <div class="features_items">
                <div ng-if="config.isLoading">
                    <div class="foodtech-loader"></div>
                    <div class="foodtech-loader-backdrop"></div>
                </div>
                <h2 class="title text-center">{{ config.title | i18next }}</h2>
                <product-item ng-repeat="data in arrayData" data="data" config="vm.productItemConfig"></product-item>
            </div>
            <div class="pagination-area">
                <ul class="pagination">
                    <li ng-class="{disabled:vm.pageTotal === 1}">
                        <a ng-click="config.changePage(0, config.limit, 1)"><i class="fa fa-angle-double-left"></i></a>
                    </li>
                    <li ng-repeat="page in vm.pageArray">
                        <a ng-click="config.changePage(page.offset, page.limit, page.page)" ng-class="{active:page.page === config.currentPage}"> {{ page.page }} </a>
                    </li>
                    <li ng-class="{disabled:vm.pageTotal === 1}">
                        <a ng-click="config.changePage((vm.pageTotal  - 1) * config.limit, config.limit, vm.pageTotal)"><i class="fa fa-angle-double-right"></i></a>
                    </li>
                </ul>
            </div>
            `
        };
        return directive;
        
    }
    ControllerController.$inject = ['$scope', '$location'];
    /* @ngInject */
    function ControllerController ($scope, $location) {
        var vm = this;
        vm.pageArray = [];        
        var flag = false;

        vm.productItemConfig = {
            viewDetail: function (item) {
                $location.path(`/detail/${item.productId}`);
            }
        }
        
        $scope.$watch('arrayData.length', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if (!flag) {
                    if ($scope.config) {
                        vm.pageTotal = Math.ceil($scope.config.totalItems / $scope.arrayData.length);
                        for (let i = 1; i <= vm.pageTotal; i++) {
                            let pageObj = {
                                offset: (i - 1) * $scope.config.limit,
                                limit: $scope.config.limit,
                                page: i
                            };
                            vm.pageArray.push(pageObj);
                        };
                        flag = true;
                    };
                };
            }
        });
        
    }
})();
(function() {
    'use strict';

    angular
        .module('SocialButton', [])
        .directive('socialButton', Directive);

    Directive.$inject = [];
    function Directive() {
        var directive = {
            controller: ControllerController,
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
            },
            templateUrl: 'scripts/clientComponents/socialButton/socialButton.directive.html'
        };
        return directive;
        
    }
    ControllerController.$inject = ['$scope', '$rootScope'];
    /* @ngInject */
    function ControllerController ($scope, $rootScope) {
        var vm = this;
        vm.toggleChatBox = toggleChatBox; 
        vm.isCustomerLogin = isCustomerLogin;

        ///////////////////////////////////
        function toggleChatBox() {
            $rootScope.useChatBox = !$rootScope.useChatBox;
            if($rootScope.useChatBox) {
                $rootScope.$emit("initChatBox");
            };
        }

        function isCustomerLogin() {
            if($rootScope.Customer && $rootScope.Customer.isLogin()) {
                return true;
            } else {
                return false;
            }
            
        }
    }
})();
(function() {
    'use strict';

    angular
        .module('CartTable', [])
        .directive('cartTable', Directive);

    Directive.$inject = [];
    function Directive() {
        var directive = {
            controller: ControllerController,
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
                config: '=',
                cartData: '='
            },
            template: `
            <div class="table-responsive cart_info">
                <table class="table table-condensed">
                    <thead>
                        <tr class="cart_menu">
                            <td ng-repeat="attr in config.attrs" ng-class="attr.class">{{ attr.i18name | i18next }}</td>
                            <td ng-if="!config.isView"></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr ng-repeat="product in cartData">
                            <td class="cart_product cart_image">
                                <a href=""><img class="img-responsive" src="{{ product.linkImg }}" on-error-src="{{ $root.notFoundImg }}" alt=""></a>
                            </td>
                            <td class="cart_description">
                                <h4><a href="">{{ product.name }}</a></h4>
                                <p>FoodTech</p>
                            </td>
                            <td class="cart_price">
                                <p>{{ product.getPrice() }}</p>
                            </td>
                            <td class="cart_quantity">
                                <div class="cart_quantity_button">
                                    <a ng-if="!config.isView" class="cart_quantity_up" style="cursor: pointer" ng-click="vm.upQuantity(product)"> + </a>
                                    <input class="cart_quantity_input" ng-disabled="true" type="text" name="quantity" value="{{ product.getQuantity() }}" autocomplete="off" size="2">
                                    <a ng-if="!config.isView" class="cart_quantity_down" style="cursor: pointer" ng-click="vm.downQuantity(product)"> - </a>
                                </div>
                            </td>
                            <td class="cart_total">
                                <p class="cart_total_price">{{ vm.getCurrencyParsed(product.getPriceWithQuantity()) }}</p>
                            </td>
                            <td ng-if="!config.isView" class="cart_delete">
                                <a class="cart_quantity_delete" ng-click="vm.removeProduct(product)"><i class="fa fa-times"></i></a>
                            </td>
                        </tr>

                        <tr ng-if="cartData && cartData.length > 0 && !config.isView">
                            <td class="cart_product"></td>
                            <td class="cart_description"></td>
                            <td class="cart_price"></td>
                            <td class="cart_description">
                                <h4><a>{{ 'totalMoney' | i18next }}:</a></h4>
                            </td>
                            <td class="cart_total" style="padding-top: 23px">
                                <p class="cart_total_price">{{ vm.total }}</p>
                            </td>
                            <td class="cart_delete"></td>
                        </tr>

                        <tr ng-if="config.isView">
                            <td colspan="4">&nbsp;</td>
                            <td colspan="2">
                                <table class="table table-condensed total-result">
                                    <tr>
                                        <td>Tổng Tiền Trong Giỏ Hàng</td>
                                        <td>{{ vm.total }}</td>
                                    </tr>
                                    <tr class="shipping-cost">
                                        <td>Phí Giao Hàng</td>
                                        <td>{{ vm.getCurrencyParsed(config.shipCost) }}</td>										
                                    </tr>
                                    <tr>
                                        <td>Tổng Tiền Đơn Hàng</td>
                                        <td><span>{{ vm.getTotalCartView(vm.total, config.shipCost) }}</span></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
            `
        };
        return directive;
        
    }
    ControllerController.$inject = ['$scope', '$rootScope'];
    /* @ngInject */
    function ControllerController ($scope, $rootScope) {
        var vm = this;
        vm.totalPrice = 0;
        vm.total = getTotalPrice();
        vm.removeProduct = removeProduct;
        vm.downQuantity = downQuantity;
        vm.upQuantity = upQuantity;
        vm.getCurrencyParsed = getCurrencyParsed;
        vm.getTotalCartView = getTotalCartView;
        /////////////////////////////
        function getTotalPrice() {
            if(angular.isArray($scope.cartData)) {
                angular.forEach($scope.cartData, function(product) {
                    vm.totalPrice = vm.totalPrice + product.getPriceWithQuantity();
                })
            }
            $scope.config.cartTotal = vm.totalPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
            return vm.totalPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        }

        function removeProduct(product) {
            $rootScope.Cart.removeProduct(product);
            updateToTalPrice();
        }

        function updateToTalPrice() {
            vm.totalPrice = 0;
            vm.total = getTotalPrice();
        }

        function downQuantity(product) {
            product.downQuantity();
            updateToTalPrice();
        }

        function upQuantity(product) {
            product.upQuantity();
            updateToTalPrice();
        }

        function getCurrencyParsed(number) {
            if(angular.isNumber(number)) {
                return number.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
            }
            return number;
        }

        function getTotalCartView(cartTotal, shipCost) {
            var cart = 0, ship = 0;
            cart = angular.isNumber(cartTotal) ? cartTotal : getParseCurrencyToNumber(cartTotal);
            ship = angular.isNumber(shipCost) ? shipCost : getParseCurrencyToNumber(shipCost);
            return getCurrencyParsed(cart + ship);
        }

        function getParseCurrencyToNumber(currency) {
            return Number(currency.replace(/[^0-9.-]+/g,"")) * 1000;
        }
        
    }
})();
(function() {
    'use strict';
    angular
    .module('YelaAppClient.ngEnter', [])
    .directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter);
                    });
                    event.preventDefault();
                }
            });
        };
    })
})();
(function () {
    'use strict';

    angular
        .module('YelaAppClient.Modal', [])
        .factory('ModalService', Service);

    Service.$inject = [];
    function Service() {
        var modals = []; // array of modals on the page
        var service = {};

        service.Add = Add;
        service.Remove = Remove;
        service.Open = Open;
        service.Close = Close;

        return service;

        function Add(modal) {
            // add modal to array of active modals
            modals.push(modal);
        }
        
        function Remove(id) {
            // remove modal from array of active modals
            var modalToRemove = _.find(modals, { id: id });
            modals = _.without(modals, modalToRemove);
        }

        function Open(id) {
            // open modal specified by id
            var modal = _.find(modals, { id: id });
            modal.open();
        }

        function Close(id) {
            // close modal specified by id
            var modal = _.find(modals, { id: id });
            modal.close();
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('YelaAppClient.Modal')
        .directive('modal', Directive);

    Directive.$inject = ['ModalService'];    
    function Directive(ModalService) {
        return {
            link: function (scope, element, attrs) {
                // ensure id attribute exists
                if (!attrs.id) {
                    console.error('modal must have an id');
                    return;
                }

                // move element to bottom of page (just before </body>) so it can be displayed above everything else
                element.appendTo('body');

                // close modal on background click
                element.on('click', function (e) {
                    var target = $(e.target);
                    if (!target.closest('.modal-body').length) {
                        scope.$evalAsync(Close);
                    }
                });

                // add self (this modal instance) to the modal service so it's accessible from controllers
                var modal = {
                    id: attrs.id,
                    open: Open,
                    close: Close
                };
                ModalService.Add(modal);
            
                // remove self from modal service when directive is destroyed
                scope.$on('$destroy', function() {
                    ModalService.Remove(attrs.id);
                    element.remove();
                });                

                // open modal
                function Open() {
                    element.show();
                    $('body').addClass('modal-open');
                }

                // close modal
                function Close() {
                    element.hide();
                    $('body').removeClass('modal-open');
                }
            }
        };
    }
})();
(function() {
  'use strict';
    angular
    .module('YelaAppClient.errorSrc', [])
    .directive('onErrorSrc', function() {
        return {
            link: function(scope, element, attrs) {
              element.bind('error', function() {
                if (attrs.src != attrs.onErrorSrc) {
                  attrs.$set('src', attrs.onErrorSrc);
                }
              });
            }
        }
    });
})();
(function() {
    'use strict';
    angular
        .module('Resize', [])
        .directive('resize', resizeFunction);

    resizeFunction.$inject = ['$window'];    
    function resizeFunction($window) {
        return {
            link: link,
            restrict: 'A'
        };

        function link(scope, element, attrs){

            scope.width = $window.innerWidth;

            function onResize() {
                if (scope.width !== $window.innerWidth) {
                    scope.width = $window.innerWidth;
                    scope.$digest();
                }
            };

            function cleanUp() {
                angular.element($window).off('resize', onResize);
            };

            angular.element($window).on('resize', onResize);

            scope.$on('$destroy', cleanUp);

        };
    };
})();