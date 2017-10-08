(function() {
    'use strict';

    angular
        .module('YelaApplication.productManagement')
        .directive('productManagement', Directive);

    Directive.$inject = [];
    function Directive() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: 'productMgmtController',
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
            },
            templateUrl: '/admin/scripts/productManagement/productMgmt.directive.html'
        };
        return directive;
    }
})();