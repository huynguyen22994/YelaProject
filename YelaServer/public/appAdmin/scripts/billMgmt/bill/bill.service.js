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
            getBillWithStatus: getBillWithStatus,
            updateBill: updateBill,
            getParseRequestBill: getParseRequestBill 
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

        function updateBill(bill) {
            return $http({
                url: '/api/bill',
                method: 'PUT',
                data: bill
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function getParseRequestBill(bill) {
            if(bill) {
                return {
                    billId: bill.billId,
                    status: bill.status,
                    customerId: bill.customerId,
                    deliveryStatus: bill.deliveryStatus,
                    items: bill.items,
                    customerName: bill.customerName,
                    phoneOne: bill.phoneOne,
                    phoneTwo: bill.phoneTwo,
                    email: bill.email,
                    city: bill.city,
                    district: bill.district,
                    address: bill.address,
                    description: bill.description
                }
            }   
            return bill;
        };

    }
})();