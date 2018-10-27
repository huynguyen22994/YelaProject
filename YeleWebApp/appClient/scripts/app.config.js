(function() {
    'use strict';

    angular
        .module('YelaAppClient')
        .config(AppConfigFunction);

    AppConfigFunction.$inject = ['$locationProvider'];
    function AppConfigFunction($locationProvider) {
        //$locationProvider.html5Mode(true);
    }
})();