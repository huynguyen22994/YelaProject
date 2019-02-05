(function() {
    'use strict';

    angular
        .module('YelaApplication.ShippingMgmt')
        .factory('CityService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            getAllCities: getAllCities,
            deleteCity: deleteCity,
            getCityById: getCityById,
            createCity: createCity,
            updateCity: updateCity
        };
        
        return service;

        ////////////////
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

        function deleteCity(cityId) {
            return $http({
                url: '/api/city',
                method: 'DELETE',
                params: {
                    cityId: cityId
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };


        function getCityById(cityId) {
            return $http({
                url: '/api/city/one',
                method: 'GET',
                params: {
                    cityId: cityId
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function createCity(data) {
            return $http({
                url: '/api/city',
                method: 'POST',
                data: data
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function updateCity(data) {
            return $http({
                url: '/api/city',
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