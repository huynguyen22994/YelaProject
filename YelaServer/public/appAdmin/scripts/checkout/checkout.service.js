(function() {
    'use strict';

    angular
        .module('YelaApplication.CheckoutMgmt')
        .factory('checkoutService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            addBillInDay: addBillInDay,
            getBillByday: getBillByday,
            updateBillInDayStatus: updateBillInDayStatus,
            parserAddData: parserAddData,
            parseDataUpdateBill: parseDataUpdateBill
        };
        
        return service;
        //////////////////////////////////
        function addBillInDay(data) {
            return $http({
                url: '/api/billinday',
                method: 'POST',
                data: data
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        }

        function getBillByday(date) {
            return $http({
                url: '/api/billinday/one',
                method: 'GET',
                params: {
                    date: date
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        }
        
        function updateBillInDayStatus(data) {
            return $http({
                url: '/api/billinday/update/status',
                method: 'PUT',
                data: data
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        }

        function parserAddData(ticketNumber, productList, takeAway) {
            var today = new Date();
            var date = today.toISOString().slice(0, 10);
            var time = today.getHours() + "h-" + today.getMinutes() + "m-" + today.getSeconds() + 's';
            var productObj = {
                id: time,
                number: ticketNumber,
                takeAway: takeAway,
                list: productList
            };
            var requestBody = {
                date: date,
                productString: JSON.stringify(productObj)
            }
            return requestBody;
        }

        function parseDataUpdateBill(bill, newStatus) {
            var today = new Date();
            var date = today.toISOString().slice(0, 10);
            bill.status = newStatus;
            var requestBody = {
                date: date,
                productString: JSON.stringify(bill)
            }
            return requestBody;
        }

    }
})();