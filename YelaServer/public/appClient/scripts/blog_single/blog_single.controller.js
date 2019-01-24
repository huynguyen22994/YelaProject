(function() {
    'use strict';

    angular
        .module('YelaAppClient.BlogSingle')
        .controller('BlogSingleController', ControllerController);

    ControllerController.$inject = ['BlogSingleService', '$route', 'clientConstant', '$location'];
    function ControllerController(BlogSingleService, $route, clientConstant, $location) {
        var vm = this;
        let blogId = $route.current.params.id;
        vm.RecommendProduct = {
            offset: 0,
            limit: 4,
            total: 0
        };
        vm.recommendProductConfig = {
            disableLeftButton: function () {
                return (vm.RecommendProduct.offset === 0) ? true : false;
            },
            disableRightButton: function() {
                return (vm.RecommendProduct.total <= (vm.RecommendProduct.offset + vm.RecommendProduct.limit)) ? true : false;
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
        vm.goToBlogsByType = goToBlogsByType;
        
        activate();

        ////////////////

        async function activate() { 
            //let productId = _.get($route, 'current.params.id');
            await loadBlogDetail(blogId);
            //await loadProductBestsellers(vm.RecommendProduct.offset, vm.RecommendProduct.limit);
        };

        function loadBrands(brands) {
            return new Promise((resolve, reject) => {
                BlogSingleService.getBrands()
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
                BlogSingleService.getCategories()
                    .then(function (categories) {
                        vm.categories = categories.data;
                        resolve(categories.data);
                    }).catch(function (err) {
                        console.log(err);
                        reject(err);
                    });
            });
        };

        function loadBlogDetail(urlKey) {
            vm.isLoading = true;
            var getBlogFunction;
            if(BlogSingleService.isURLPage(urlKey)) {
                getBlogFunction = BlogSingleService.getBlogByUrlKey;
            } else {
                getBlogFunction = BlogSingleService.getBlogById;
            }
            return new Promise((resolve, reject) => {
                getBlogFunction(urlKey)
                    .then(function (blog) {
                        vm.blog = blog.data;
                        //vm.blog.linkImg = `${clientConstant.serverUrl}/${vm.blog.linkImg}`;
                        var date = new Date(vm.blog.createdAt);
                        vm.blog.createdTime = date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear();
                        vm.isLoading = false;
                        resolve(blog.data);
                    }).catch(function (err) {
                        console.log(err);
                        vm.isLoading = false;
                        reject(err);
                    });
            });
        };

        function loadProductBestsellers(offset, limit) {
            return new Promise((resolve, reject) => {
                DetailService.getProductBestsellers(offset, limit)
                    .then(function (productBestsellers) {
                        vm.RecommendProduct.total = productBestsellers.data.count;
                        vm.productBestsellers = productBestsellers.data.rows;
                        resolve(productBestsellers.data);
                    }).catch(function (err) {
                        console.log(err);
                        reject(err);
                    });
            });
        };

        function changeProductBestsellers(offset, limit) {
            DetailService.getProductBestsellers(offset, limit)
                .then(function (productBestsellers) {
                    vm.productBestsellers = productBestsellers.data.rows;
                }).catch(function (err) {
                    console.log(err);
                    reject(err);
                });
        };

        function goToBlogsByType(type) {
            $location.path(`/blogs/${type}`);
        };

    }
})();