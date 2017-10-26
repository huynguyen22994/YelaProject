(function() {
    'use strict';

    angular
        .module('YelaApplication.productManagement.home')
        .factory('HomeService', Service);

    Service.$inject = [];
    function Service() {
        var service = {
            exposedFn:exposedFn
        };
        
        return service;

        ////////////////
        function exposedFn() { }
    }
})();