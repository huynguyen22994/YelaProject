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
        .module('HeaderApp', [
            'jm.i18next'
        ])
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
    function ControllerController ($scope, $i18next) {
        var vm = this;
        vm.changeLanguage = changeLanguage;
        vm.onHeaderBottom = onHeaderBottom;
        vm.config = {
            headerTop: {
                left: [
                    { iconClass: 'fa fa-phone', label: '0933990004', href: function () {  return 'aa'} },
                    { iconClass: 'fa fa-envelope', label: 'foodtech@gmail.com', href: function () { return 'test'; } }
                ],
                right: [
                    { iconClass: 'fa fa-facebook', href: function () { return 'string'; } },
                    {iconClass: 'fa fa-instagram', href: function () { return 'string'; } },
                    {iconClass: 'fa fa-google-plus', href: function () { return 'string'; } },
                ]
            },
            headerMiddle: {
                left: [
    
                ],
                right: [
                    // { iconClass: 'fa fa-user', label: 'Account', href: function () { return 'string'; } },
                    { iconClass: 'fa fa-star', label: 'wishlist', href: function () { return 'string'; } },
                    { iconClass: 'fa fa-crosshairs', label: 'checkout', href: function () { return 'string'; } },
                    { iconClass: 'fa fa-shopping-cart', label: 'cart', href: function () { return '#!/cart'; } },
                    { iconClass: 'fa fa-lock', label: 'Login', href: function () { return '#!/login'; } },
                ]
            },
            headerBottom: {
                left: [
                    {id: 'homePage', label: 'home', href: function () { return '/'; }, isChoosen: true },
                    {id: 'foodsPage', label: 'foods', href: function () { return '#!/foods'; }, isChoosen: false },
                    {id: 'materialsPage', label: 'materials', href: function () { return '#!/materials'; }, isChoosen: false },
                    {id: 'blogPage', label: 'blog', href: function () { return '#!/blog'; }, isChoosen: false, subItems: [
                        { label: 'Blog List', href: function () { return '#!/blog'; }},
                        { label: 'Blog Single', href: function () { return '#!/blogSingle'; }}
                    ] },
                    {id: 'contactPage', label: 'contact', href: function () { return '#!/contact'; }, isChoosen: false },
                    {id: 'productPage', label: 'products', href: function () { return '#!/shop'; }, isChoosen: false }
                ],
                right: [
                    
                ]
            }
        };

        function changeLanguage(key) {
            console.log('change');
            $i18next.changeLanguage(key);
        };

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
    }
})();