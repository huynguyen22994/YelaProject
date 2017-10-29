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
        .module('HeaderApp', [])
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
    function ControllerController ($scope) {
        var vm = this;
        vm.config = {
            headerTop: {
                left: [
                    { iconClass: 'fa fa-phone', label: '+2 95 01 88 821', href: function () {  return 'aa'} },
                    { iconClass: 'fa fa-envelope', label: 'mail@gmail.com', href: function () { return 'test'; } }
                ],
                right: [
                    { iconClass: 'fa fa-facebook', href: function () { return 'string'; } },
                    {iconClass: 'fa fa-twitter', href: function () { return 'string'; } },
                    {iconClass: 'fa fa-linkedin', href: function () { return 'string'; } },
                    {iconClass: 'fa fa-dribbble', href: function () { return 'string'; } },
                    {iconClass: 'fa fa-google-plus', href: function () { return 'string'; } },
                ]
            },
            headerMiddle: {
                left: [
    
                ],
                right: [
                    { iconClass: 'fa fa-user', label: 'Account', href: function () { return 'string'; } },
                    { iconClass: 'fa fa-star', label: 'Wishlist', href: function () { return 'string'; } },
                    { iconClass: 'fa fa-crosshairs', label: 'Checkout', href: function () { return 'string'; } },
                    { iconClass: 'fa fa-shopping-cart', label: 'Cart', href: function () { return '#!/cart'; } },
                    { iconClass: 'fa fa-lock', label: 'Login', href: function () { return '#!/login'; } },
                ]
            },
            headerBottom: {
                left: [
    
                ],
                right: [
                    
                ]
            }
        };
    }
})();