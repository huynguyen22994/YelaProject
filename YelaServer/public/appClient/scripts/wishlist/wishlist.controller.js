(function() {
    'use strict';

    angular
        .module('YelaAppClient.Wishlist')
        .controller('WishlistController', ControllerController);

    ControllerController.$inject = ['WishlistService', '$rootScope', '$location'];
    function ControllerController(WishlistService, $rootScope, $location) {
        var vm = this;

        vm.hasProduct = hasProduct;
        activate();
        ////////////////

        async function activate() { 
            if($rootScope.Customer) {
                await loadWishlist();
            } else {
                $location.path('/'); 
            }
        };

        function loadWishlist() {
            vm.isLoading = true;
            return new Promise((resolve, reject) => {
                var customerId = $rootScope.Customer.getId();
                WishlistService.getWishList(customerId)
                    .then(function (response) {
                        var wishlist = response.data.rows || [];
                        vm.wishlist = wishlist[0];
                        vm.products = vm.wishlist.productList;
                        resolve(vm.products);
                    }).catch(function (err) {
                        console.log(err);
                        reject(err);
                    }).finally(function() {
                        vm.isLoading = false;
                    })
            });
        };

        function hasProduct() {
            return (vm.products && angular.isArray(vm.products) && vm.products.length > 0 );
        }
    }
})();