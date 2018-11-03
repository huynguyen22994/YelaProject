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
        vm.RecommendProduct = {
            offset: 0,
            limit: 4,
            total: 0
        };
        vm.FeatureProduct = {
            offset: 0,
            limit: 12,
            total: 0
        };
        vm.recommendProductConfig = {
            isLoading: true,
            disableLeftButton: function () {
                return (vm.RecommendProduct.offset === 0) ? true : false;
            },
            disableRightButton: function() {
                return (vm.RecommendProduct.total <= vm.RecommendProduct.offset) ? true : false;
            },
            leftButton: function () {
                vm.RecommendProduct.offset = vm.RecommendProduct.offset - vm.RecommendProduct.limit;
                changeProductBestsellers(vm.RecommendProduct.offset, vm.RecommendProduct.limit);
            },
            rightButton: function () {
                vm.RecommendProduct.offset = vm.RecommendProduct.offset + vm.RecommendProduct.limit;
                changeProductBestsellers(vm.RecommendProduct.offset, vm.RecommendProduct.limit);
            }
        };

        vm.featureProductConfig = {
            isLoading: true,
            totalItems: 0,
            currentPage: 1,
            limit: vm.FeatureProduct.limit,
            changePage: function (offset, limit, currentPage) {
                this.currentPage = currentPage;
                change(offset, limit);
                async function change(offset, limit) {
                    await loadProductFreatures(offset, limit);
                };
            }
        };

        activate();

        ////////////////

        async function activate() {
            await loadBrands();
            await loadCategories();
            await loadProductFreatures(vm.FeatureProduct.offset, vm.FeatureProduct.limit);
            vm.productNews = await loadProductNews();
            await loadProductBestsellers(vm.RecommendProduct.offset, vm.RecommendProduct.limit);
         };

        function loadProductFreatures(offset, limit) {
            return new Promise((resolve, reject) => {
                HomeService.getProductFreatures(offset, limit)
                    .then(function (productFreatures) {
                        vm.featureProductConfig.totalItems = productFreatures.data.count;
                        vm.FeatureProduct.total = productFreatures.data.count;
                        vm.productFreatures = productFreatures.data.rows;
                        vm.recommendProductConfig.isLoading = false;
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
                        vm.RecommendProduct.total = productBestsellers.data.count;
                        vm.productBestsellers = productBestsellers.data.rows;
                        vm.featureProductConfig.isLoading = false;
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

        function loadCategories() {
            return new Promise((resolve, reject) => {
                HomeService.getCategories()
                    .then(function (categories) {
                        vm.categories = categories.data;
                        resolve(categories.data);
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