(function() {
    'use strict';

    angular
        .module('YelaApplication.DashboardManagement')
        .controller('DashboardController', ControllerController);

    ControllerController.$inject = ['$scope', '$window', '$location', 'ylConstant'];
    function ControllerController($scope, $window, $location, ylConstant) {
       var vm = this;
       vm.data = [
            {
                name : "Blue",
                value : 10,
                color : "#4a87ee",
                label: 'thang 1'
            },
            {
                name : "Green",
                value : 40,
                color : "#66cc33",
                label: 'thang 2'
            },
            {
                name : "Orange",
                value : 70,
                color : "#f0b840",
                label: 'thang 3'
            },
            {
                name : "Red",
                value : 2,
                color : "#ef4e3a",
                label: 'thang 4'
            }
        ];
        ////////////////

    }
})();