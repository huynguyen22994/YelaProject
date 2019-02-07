(function() {
    'use strict';

    angular
        .module('YelaApplication.ShippingMgmt')
        .factory('DistrictService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            getAllDistricts: getAllDistricts,
            deleteDistrict: deleteDistrict,
            getDistrictById: getDistrictById,
            createDistrict: createDistrict,
            updateDistrict: updateDistrict,
            getAllCities: getAllCities
        };
        
        return service;

        ////////////////
        function getAllDistricts() {
            return $http({
                url: '/api/district',
                method: 'GET'
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function deleteDistrict(districtId) {
            return $http({
                url: '/api/district',
                method: 'DELETE',
                params: {
                    districtId: districtId
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };


        function getDistrictById(districtId) {
            return $http({
                url: '/api/district/one',
                method: 'GET',
                params: {
                    districtId: districtId
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function createDistrict(data) {
            return $http({
                url: '/api/district',
                method: 'POST',
                data: data
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function updateDistrict(data) {
            return $http({
                url: '/api/district',
                method: 'PUT',
                data: data
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function getAllCities() {
            return $http({
                url: '/api/city',
                method: 'GET'
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };
    }
})();