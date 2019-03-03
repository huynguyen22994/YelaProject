(function() {
    'use strict';

    angular
        .module('YelaAppClient.CartApp')
        .factory('CartService', Service);

    Service.$inject = ['$http'];
    function Service($http) {

        var cartState = {
            isCartPage: true
        };

        var billInfo = {};
        var billInfoSuccess = {};

        var service = {
            getCartTableConfig: getCartTableConfig,
            getParseCurrencyToNumber: getParseCurrencyToNumber,
            getCartState: getCartState,
            getBillInfo: getBillInfo,
            createBill: createBill,
            getParseBillRequest: getParseBillRequest,
            getBillInfoSuccess: getBillInfoSuccess,
            getAllCities: getAllCities,
            getAllDistricts: getAllDistricts,
            getShipping: getShipping
        };
        
        return service;

        ////////////////
        function getCartTableConfig() {
            return {
                attrs: [
                    {
                        key: '',
                        i18name: 'foods',
                        class: 'image'
                    },
                    {
                        key: '',
                        i18name: 'description',
                        class: 'description'
                    },
                    {
                        key: '',
                        i18name: 'price',
                        class: 'price'
                    },
                    {
                        key: '',
                        i18name: 'quantity',
                        class: 'quantity'
                    },
                    {
                        key: '',
                        i18name: 'total',
                        class: 'total'
                    }
                ]
            }
        }

        function getParseCurrencyToNumber(currency) {
            if(currency) {
                return Number(currency.replace(/[^0-9.-]+/g,"")) * 1000;
            }
            return currency;
        }

        function getCartState() {
            return cartState;
        }

        function getBillInfo() {
            return billInfo;
        }

        function createBill(bill) {
            return $http({
                url: '/api/bill',
                method: 'POST',
                data: bill
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function getParseBillRequest(bill) {
            if(bill) {
                var items = JSON.stringify(bill.items);
                return {
                    customerId: bill.customerId,
                    items: items,
                    customerName: bill.name,
                    phoneOne: bill.phoneOne,
                    phoneTwo: bill.phoneTwo,
                    email: bill.email,
                    city: bill.contry,
                    district: bill.region,
                    address: bill.address,
                    description: bill.description
                }
            }
        }

        function getBillInfoSuccess() {
            return billInfoSuccess;
        }

        function getAllCities() {
            return $http({
                url: '/api/city',
                method: 'GET'
            }).then(function (res) {
                return res.data;
            }).catch(function (err) {
                return err;
            });
        };

        function getAllDistricts(cityId) {
            return $http({
                url: '/api/district/incity',
                method: 'GET',
                params: {
                    cityId: cityId
                }
            }).then(function (res) {
                return res.data;
            }).catch(function (err) {
                return err;
            });
        };

        function getShipping(cityId, districtId) {
            return $http({
                url: '/api/shipcostQuery',
                method: 'GET',
                params: {
                    cityId: cityId,
                    districtId: districtId
                }
            }).then(function (res) {
                return res.data;
            }).catch(function (err) {
                return err;
            });
        };

    }
})();