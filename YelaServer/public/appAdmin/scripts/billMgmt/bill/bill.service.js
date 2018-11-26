(function() {
    'use strict';

    angular
        .module('YelaApplication.BillMgmt')
        .factory('BillService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            getAllBills: getAllBills,
            searchBill: searchBill,
            getBillWithStatus: getBillWithStatus
        };
        
        return service;

        ////////////////
        function getAllBills() {
            return $http({
                url: '/api/bill',
                method: 'GET'
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function getBillWithStatus(status) {
            return $http({
                url: '/api/bill/status',
                method: 'GET',
                params: {
                    status: status
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function searchBill(key) {
            return $http({
                url: '/api/product/search',
                method: 'GET',
                params: {
                    key: key
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

    }
})();