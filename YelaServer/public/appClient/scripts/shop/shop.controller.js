(function() {
    'use strict';

    angular
        .module('YelaAppClient.Shop')
        .controller('ShopController', ControllerController);

    ControllerController.$inject = ['ShopService', 'clientConstant', '$location'];
    function ControllerController(ShopService, clientConstant, $location) {
        var vm = this;
        vm.isLoading = true;
        vm.Product = {
            offset: 0,
            limit: 12
        };
        vm.pageArray = [];
        vm.productItemConfig = {
            //new: true,
            //overlay: true,
            viewDetail: function (item) {
                console.log(item);
                $location.path(`/detail/${item.productId}`);
            }
        };

        vm.changePage = changePage;

        activate();

        ////////////////

        async function activate() { 
            await loadBrands();
            await loadCategories();
            await loadProducts(vm.Product.offset, vm.Product.limit, true);
        };

        function loadBrands(brands) {
            return new Promise((resolve, reject) => {
                ShopService.getBrands()
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
                ShopService.getCategories()
                    .then(function (categories) {
                        vm.categories = categories.data;
                        resolve(categories.data);
                    }).catch(function (err) {
                        console.log(err);
                        reject(err);
                    });
            });
        };

        function loadProducts(offset, limit, isLoadNew) {
            return new Promise((resolve, reject) => {
                ShopService.getProducts(offset, limit)
                    .then(function (products) {
                        vm.products = products.data.products;
                        if (isLoadNew) {
                            setPage(products.data.count, products.data.products.length, vm.Product.limit)  
                        };
                        vm.isLoading = false;
                        resolve(products.data.products);
                    }).catch(function (err) {
                        console.log(err);
                        reject(err);
                    });
            });
        };

        function setPage(total, dataLength, limit, currentPage) {
            vm.currentPage = currentPage || 1;
            vm.pageTotal = Math.ceil(total / dataLength);
            for (let i = 1; i <= vm.pageTotal; i++) {
                let pageObj = {
                    offset: (i - 1) * limit,
                    limit: limit,
                    page: i
                };
                vm.pageArray.push(pageObj);
            };
            // flag = true;
        };

        function changePage(offset, limit, currentPage) {
            vm.currentPage = currentPage;
            change(offset, limit);
            async function change(offset, limit) {
                await loadProducts(offset, limit);
            };
        };
    }
})();