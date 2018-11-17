(function() {
    'use strict';

    angular
        .module('YelaAppClient.CartApp')
        .factory('CartService', Service);

    Service.$inject = [];
    function Service() {

        var cartState = {
            isCartPage: true
        };

        var billInfo = {};

        var service = {
            getCartTableConfig: getCartTableConfig,
            getParseCurrencyToNumber: getParseCurrencyToNumber,
            getCartState: getCartState,
            getBillInfo: getBillInfo
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
            return Number(currency.replace(/[^0-9.-]+/g,"")) * 1000;
        }

        function getCartState() {
            return cartState;
        }

        function getBillInfo() {
            return billInfo;
        }

    }
})();