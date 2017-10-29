(function() {
    'use strict';

    angular
        .module('YelaApplication.ProductMgmt')
        .controller('HomeController', ControllerController);

    ControllerController.$inject = [];
    function ControllerController() {
        var vm = this;
        console.log('this is home');

        activate();

        ////////////////

        function activate() { }
    }
})();