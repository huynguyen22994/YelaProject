(function() {
    'use strict';

    angular
        .module('YelaApplication.Statistic')
        .controller('StatisticBillController', ControllerController);

    ControllerController.$inject = ['$scope', 'ProductService', 'checkoutService', 'toastr', '$rootScope', '$timeout'];
    function ControllerController($scope, ProductService, checkoutService, toastr, $rootScope, $timeout) {
        var vm = this;

    }
})();