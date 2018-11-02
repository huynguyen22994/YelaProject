(function() {
    'use strict';

    angular
        .module('YelaAppClient.FoodByType')
        .controller('FoodTypeController', ControllerController);

    ControllerController.$inject = ['FoodTypeService', 'clientConstant', '$location', '$route'];
    function ControllerController(FoodTypeService, clientConstant, $location, $route) {
        var vm = this;
        let productTypeId = $route.current.params.id;
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
            await loadFoodTypeById(productTypeId);
            await loadBrands();
            await loadCategories();
            await loadFoodType(vm.Product.offset, vm.Product.limit, productTypeId, true);
        };

        function loadFoodTypeById(productTypeId) {
            return new Promise((resolve, reject) => {
                FoodTypeService.getFoodType(productTypeId)
                    .then(function (response) {
                        vm.productType = response.data;
                        resolve(response.data);
                    }).catch(function (err) {
                        console.log(err);
                        reject(err);
                    });
            });
        }

        function loadBrands(brands) {
            return new Promise((resolve, reject) => {
                FoodTypeService.getBrands()
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
                FoodTypeService.getCategories()
                    .then(function (categories) {
                        vm.categories = categories.data;
                        resolve(categories.data);
                    }).catch(function (err) {
                        console.log(err);
                        reject(err);
                    });
            });
        };

        function loadFoodType(offset, limit, productType, isLoadNew) {
            return new Promise((resolve, reject) => {
                FoodTypeService.getFoodByType(offset, limit, productType)
                    .then(function (products) {
                        vm.products = products.data.rows;
                        if (isLoadNew) {
                            setPage(products.data.count, products.data.rows.length, vm.Product.limit)  
                        };
                        resolve(products.data.rows);
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