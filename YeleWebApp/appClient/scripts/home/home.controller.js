(function() {
    'use strict';

    angular
        .module('YelaAppClient.Home')
        .controller('HomeController', ControllerController);

    ControllerController.$inject = ['HomeService', 'clientConstant'];
    function ControllerController(HomeService, clientConstant) {
        var vm = this;
        vm.offsetRecommendProduct = 0;
        vm.limitRecommendProduct = 4;
        vm.totalProductBestsellers = 0;
        vm.recommendProductConfig = {
            disableLeftButton: function () {
                return (vm.offsetRecommendProduct === 0) ? true : false;
            },
            disableRightButton: function() {
                return (vm.totalProductBestsellers <= vm.offsetRecommendProduct) ? true : false;
            },
            leftButton: function () {
                vm.offsetRecommendProduct = vm.offsetRecommendProduct - vm.limitRecommendProduct;
                changeProductBestsellers(vm.offsetRecommendProduct, vm.limitRecommendProduct);
            },
            rightButton: function () {
                vm.offsetRecommendProduct = vm.offsetRecommendProduct + vm.limitRecommendProduct;
                changeProductBestsellers(vm.offsetRecommendProduct, vm.limitRecommendProduct);
            }
        };

        activate();

        ////////////////

        async function activate() {
            await loadBrands();
            await loadProductFreatures();
            vm.productNews = await loadProductNews();
            await loadProductBestsellers(vm.offsetRecommendProduct, vm.limitRecommendProduct);
         };

        function loadProductFreatures() {
            return new Promise((resolve, reject) => {
                HomeService.getProductFreatures()
                    .then(function (productFreatures) {
                        vm.productFreatures = productFreatures.data.rows;
                        resolve(productFreatures.data);
                    }).catch(function (err) {
                        console.log(err);
                        reject(err);
                    });
            });
        };

        function loadProductNews() {
            return new Promise((resolve, reject) => {
                HomeService.getProductNews()
                    .then(function (productNews) {
                        resolve(productNews.data.rows);
                    }).catch(function (err) {
                        console.log(err);
                        reject(err);
                    });
            });
        };

        function loadProductBestsellers(offset, limit) {
            return new Promise((resolve, reject) => {
                HomeService.getProductBestsellers(offset, limit)
                    .then(function (productBestsellers) {
                        vm.totalProductBestsellers = productBestsellers.data.count;
                        vm.productBestsellers = productBestsellers.data.rows;
                        resolve(productBestsellers.data);
                    }).catch(function (err) {
                        console.log(err);
                        reject(err);
                    });
            });
        };

        function loadBrands() {
            return new Promise((resolve, reject) => {
                HomeService.getBrands()
                    .then(function (brands) {
                        vm.brands = brands.data;
                        resolve(brands.data);
                    }).catch(function (err) {
                        console.log(err);
                        reject(err);
                    });
            });
        };

        function changeProductBestsellers(offset, limit) {
            HomeService.getProductBestsellers(offset, limit)
                .then(function (productBestsellers) {
                    vm.productBestsellers = productBestsellers.data.rows;
                }).catch(function (err) {
                    console.log(err);
                    reject(err);
                });
        };
        
    }
})();