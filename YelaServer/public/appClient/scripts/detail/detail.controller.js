(function() {
    'use strict';

    angular
        .module('YelaAppClient.Detail')
        .controller('DetailController', ControllerController);

    ControllerController.$inject = ['DetailService', '$route', 'clientConstant', '$rootScope', 'Product', 'toastr', '$timeout', '$scope'];
    function ControllerController(DetailService, $route, clientConstant, $rootScope, Product, toastr, $timeout, $scope) {
        var vm = this;
        let productId = $route.current.params.id;
        vm.RecommendProduct = {
            offset: 0,
            limit: 4,
            total: 0
        };
        vm.MainProduct = {
            offset: 0,
            limit: 8,
            total: 0
        };
        vm.recommendProductConfig = {
            title: 'setCombo',
            isLoading: false,
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
        vm.mainProductConfig = {
            title: 'mainFood',
            isLoading: true,
            totalItems: 0,
            currentPage: 1,
            limit: vm.MainProduct.limit,
            changePage: function (offset, limit, currentPage) {
                vm.mainProductConfig.isLoading = true;
                this.currentPage = currentPage;
                change(offset, limit);
                async function change(offset, limit) {
                    await loadProductMains(offset, limit);
                };
            }
        };
        vm.quantity = 1;
        vm.addToCart = addToCart; 
        vm.formatPrice = formatPrice;   
        
        activate();

        ////////////////

        async function activate() { 
            //let productId = _.get($route, 'current.params.id');
            loadBrands();
            loadCategories();
            await loadProductDetail(productId);
            loadProductBestsellers(vm.RecommendProduct.offset, vm.RecommendProduct.limit);
            loadProductMains(vm.MainProduct.offset, vm.MainProduct.limit);
        };

        function loadBrands(brands) {
            return new Promise((resolve, reject) => {
                DetailService.getBrands()
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
                DetailService.getCategories()
                    .then(function (categories) {
                        vm.categories = categories.data;
                        resolve(categories.data);
                    }).catch(function (err) {
                        console.log(err);
                        reject(err);
                    });
            });
        };

        function loadProductDetail(id) {
            vm.isLoading = true;
            return new Promise((resolve, reject) => {
                DetailService.getProductById(id)
                    .then(function (product) {
                        vm.product = product.data;
                        vm.product.linkImg = `${clientConstant.serverUrl}/${vm.product.linkImg}`;    
                        $rootScope.setMetaTag(vm.product.name, vm.product.discribe, vm.product.linkImg);                 
                        resolve(product.data);
                    }).catch(function (err) {
                        console.log(err);
                        reject(err);
                    }).finally(function() {
                        vm.isLoading = false;
                    })
            });
        };

        function formatPrice(price) {
            if(price) {
                return parseInt(price).toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
            }
            return price;
        }

        function loadProductBestsellers(offset, limit) {
            return new Promise((resolve, reject) => {
                DetailService.getProductBestsellers(offset, limit)
                    .then(function (productBestsellers) {
                        vm.RecommendProduct.total = productBestsellers.data.count;
                        vm.productBestsellers = productBestsellers.data.rows;
                        vm.recommendProductConfig.isLoading = false;
                        resolve(productBestsellers.data);
                    }).catch(function (err) {
                        console.log(err);
                        reject(err);
                    });
            });
        };

        function loadProductMains(offset, limit) {
            return new Promise((resolve, reject) => {
                DetailService.getProductMains(offset, limit)
                    .then(function (productMains) {
                        vm.mainProductConfig.totalItems = productMains.data.count;
                        vm.MainProduct.total = productMains.data.count;
                        vm.productMains = productMains.data.rows;
                        vm.mainProductConfig.isLoading = false;
                        resolve(vm.productMains);
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

        function addToCart(product, quantity) {
            var _product = new Product(product.productId, product.name, product.price, product.linkImg);
            _product.upQuantity(quantity);
            $rootScope.Cart.adddProductWithQuatity(_product, quantity);
            toastr.success(product.name + ' đã được thêm vào giỏ hàng');
        }

        $timeout(function() {
            if(window.FB && window.FB.XFBML) {
                window.FB.XFBML.parse();
            }
            if(window.ZaloSocialSDK && window.ZaloSocialSDK.reload) {
                window.ZaloSocialSDK.reload();
            }
        })

        $scope.$watch('vm.quantity', function (newValue, oldValue) {
            vm.quantity = (newValue && newValue > 0) ? newValue : 1;
        });

    }
})();