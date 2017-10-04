(function() {
    'use strict';

    angular
        .module('YelaApp')
        .config(config);

    function config($routeProvider, $locationProvider) {
        $routeProvider
        .when('/', {
        templateUrl: 'views/Home/templates/home.html',
        controller:'HomeCtrl'
        })
        .when('/productdetail/:id', {
        templateUrl: 'views/ProductDetail/templates/ProductDetail.html',
        controller:'DetailCtrl'
        })
        .when('/login', {
        templateUrl: 'views/Login/templates/login.html',
        controller:'LoginCtrl'
        })        
        // removed other routes ... *snip
        .otherwise({
        redirectTo: '/'
        }
        );
        //enable html5Mode for pushstate ('#'-less URLs)
        //$locationProvider.html5Mode(true);
        //$locationProvider.hashPrefix('!');
    }
})();