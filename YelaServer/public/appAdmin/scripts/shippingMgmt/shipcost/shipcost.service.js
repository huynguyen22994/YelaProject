(function() {
    'use strict';

    angular
        .module('YelaApplication.ShippingMgmt')
        .factory('ShipCostService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            getAllShipCost: getAllShipCost,
            deleteShipCost: deleteShipCost,
            getShipCostById: getShipCostById,
            createShipCost: createShipCost,
            updateShipCost: updateShipCost
        };
        
        return service;

        ////////////////
        function getAllShipCost() {
            return $http({
                url: '/api/shipcost',
                method: 'GET'
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function deleteShipCost(shipCostId) {
            return $http({
                url: '/api/shipcost',
                method: 'DELETE',
                params: {
                    shipCostId: shipCostId
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };


        function getShipCostById(shipCostId) {
            return $http({
                url: '/api/shipcost/one',
                method: 'GET',
                params: {
                    shipCostId: shipCostId
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function createShipCost(data) {
            return $http({
                url: '/api/shipcost',
                method: 'POST',
                data: data
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function updateShipCost(data) {
            return $http({
                url: '/api/shipcost',
                method: 'PUT',
                data: data
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };
    }
})();