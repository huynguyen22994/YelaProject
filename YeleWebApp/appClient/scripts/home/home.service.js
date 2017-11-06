(function() {
    'use strict';

    angular
        .module('YelaAppClient.Home')
        .factory('HomeService', Service);

    Service.$inject = [];
    function Service() {
        var service = {
            getAllProduct:getAllProduct
        };
        
        return service;

        ////////////////
        function getAllProduct() {
            return [
                { name: 'test1', id: 1 },
                { name: 'test12', id: 2 },
                { name: 'test3', id: 3 },
                { name: 'test4', id: 4}
            ]
        }
    }
})();