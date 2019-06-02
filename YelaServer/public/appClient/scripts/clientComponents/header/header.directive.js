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