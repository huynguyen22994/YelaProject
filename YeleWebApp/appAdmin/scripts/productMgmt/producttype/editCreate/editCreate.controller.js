(function() {
    'use strict';

    angular
        .module('YelaApplication.ProductMgmt')
        .controller('ProducttypeEditCreateController', ControllerController);

    ControllerController.$inject = ['$scope', '$window', '$location', 'ProducttypeService', 'categories'];
    function ControllerController($scope, $window, $location, ProducttypeService, categories) {
        var vm = this;
        vm.Category = {
            categoryId: null,
            name: null
        };

        activate();

        ////////////////

        function activate() {
            vm.categories = categories.data;
        }
    }
})();