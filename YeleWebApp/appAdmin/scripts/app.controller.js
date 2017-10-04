(function() {
    'use strict';

    angular
        .module('YelaApplication')
        .controller('IndexController', ControllerController);

    ControllerController.$inject = [];
    function ControllerController() {
        var vm = this;
        vm.test = 'ahihi';

        activate();

        ////////////////

        function activate() { }
    }
})();