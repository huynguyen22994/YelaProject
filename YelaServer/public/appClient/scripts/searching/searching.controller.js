(function() {
    'use strict';

    angular
        .module('YelaAppClient.Searching')
        .controller('SearchingController', ControllerController);

    ControllerController.$inject = ['$route', 'clientConstant', '$location', 'ShopService', 'SearchingService', '$rootScope'];
    function ControllerController($route, clientConstant, $location, ShopService, SearchingService, $rootScope) {
        var vm = this;
        let searchKey = $route.current.params.key;
        $rootScope.searchValue = searchKey;
        vm.products = [];
        vm.pageArray = [];
        vm.changePage = changePage;
        vm.hasProduct = hasProduct;
        vm.productItemConfig = {};
        vm.paging = {
            offset: 0,
            limit: 6
        };

        activate();
        ////////////////

        async function activate() { 
            await loadProductByKey(searchKey);
            await loadBrands();
            await loadCategories();
        };

        function getFormatDate(dateString) {
            if(dateString) {
                var date = new Date(dateString);
                return date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear();
            }
            return dateString;
        };

        function readMore(blog) {

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
                if(blogType) {
                    await loadBlogsByType(blogType, offset, limit);
                } else {
                    await loadBlogs(offset, limit);
                }
            };
        };

        function loadProductByKey(key) {
            return new Promise((resolve, reject) => {
                SearchingService.getProductByKey(key)
                    .then(function (response) {
                        var data = response.data;
                        vm.products = data.rows;
                        resolve(vm.products);
                    }).catch(function (err) {
                        console.log(err);
                        reject(err);
                    });
            });
        }

        ////////// Load Side Bar ///////////
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

        function hasProduct() {
            return vm.products.length > 0;
        }

    }
})();