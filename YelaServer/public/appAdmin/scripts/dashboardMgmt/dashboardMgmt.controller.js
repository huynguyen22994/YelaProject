(function() {
    'use strict';

    angular
        .module('YelaApplication.DashboardManagement')
        .controller('DashboardController', ControllerController);

    ControllerController.$inject = ['$scope', '$window', '$location', 'ylConstant', 'DashboardService'];
    function ControllerController($scope, $window, $location, ylConstant, DashboardService) {
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
        initialize();

        function initialize() {
            loadBannerCount();
        };

        function loadBannerCount() {
            DashboardService.getDashboardBannerCount()
                .then(function(response) {
                    var data = response.data;
                    if(data) {
                        vm.messageCount = data.chatCount;
                        vm.maillCount = data.mailCount;
                        vm.billCount = data.billCount;
                    }
                })
        }

    }
})();