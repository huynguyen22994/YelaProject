(function() {
    'use strict';

    angular
        .module('YelaAppClient.Wishlist')
        .factory('WishlistService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            getWishList: getWishList,
            addProductToWishlist: addProductToWishlist,
            removeProductFromWishlist: removeProductFromWishlist
        };
        
        return service;

        ////////////////
        function getWishList(customerId) {
            return $http({
                url: '/api/wishlist',
                method: 'GET',
                params: {
                    customerId: customerId
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function addProductToWishlist(customerId, productItem) {
            return $http({
                url: '/api/wishlist',
                method: 'POST',
                data: {
                    customerId: customerId,
                    productItem: productItem
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function removeProductFromWishlist(customerId, productItem) {
            return $http({
                url: '/api/wishlist/delete',
                method: 'POST',
                data: {
                    customerId: customerId,
                    productItem: productItem
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };
    }
})();