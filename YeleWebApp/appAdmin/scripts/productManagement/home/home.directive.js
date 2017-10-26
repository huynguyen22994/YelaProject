(function() {
    'use strict';

    angular
        .module('YelaApplication.productManagement.home')
        .directive('test', Directive);

    Directive.$inject = [];
    function Directive() {

        var directive = {
            controller: 'HomeController',
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
            },
            templateUrl: '/admin/scripts/productManagement/home/home.html'
        };
        return directive;

    }
})();