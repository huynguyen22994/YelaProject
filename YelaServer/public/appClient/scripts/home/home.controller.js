(function() {
    'use strict';

    angular
        .module('YelaAppClient.Home')
        .controller('HomeController', ControllerController);

    ControllerController.$inject = ['HomeService', 'clientConstant', '$route', '$rootScope', 'ngMeta'];
    function ControllerController(HomeService, clientConstant, $route, $rootScope, ngMeta) {
        ngMeta.setTitle('FoodTech Shop - Mì Tỏi & Cơm Vò');
        ngMeta.setTag('description', 'Chúng tôi luôn khát khao, cố gắng cải thiện từng ngày để mang đến những sản phẩm thức ăn nhanh và một dịch vụ tốt nhất cho cộng đồng.');
        ngMeta.setTag('image', 'https://foodtechserver.herokuapp.com/images/home/foodtech_slide_3.jpg');
        
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
        vm.MainProduct = {
            offset: 0,
            limit: 4,
            total: 0
        };
        vm.NewProduct = {
            offset: 0,
            limit: 4,
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

        vm.newProductConfig = {
            title: 'drinks',
            isLoading: false,
            disableLeftButton: function () {
                return (vm.NewProduct.offset === 0) ? true : false;
            },
            disableRightButton: function() {
                return (vm.NewProduct.total <= (vm.NewProduct.offset + vm.NewProduct.limit)) ? true : false;
            },
            leftButton: function () {
                vm.NewProduct.offset = vm.NewProduct.offset - vm.NewProduct.limit;
                loadProductNews(vm.NewProduct.offset, vm.NewProduct.limit);
            },
            rightButton: function () {
                vm.NewProduct.offset = vm.NewProduct.offset + vm.NewProduct.limit;
                loadProductNews(vm.NewProduct.offset, vm.NewProduct.limit);
            }
        };

        vm.featureProductConfig = {
            title: 'featuresFood',
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

        vm.mainProductConfig = {
            title: 'mainFood',
            isLoading: false,
            totalItems: 0,
            currentPage: 1,
            limit: vm.FeatureProduct.limit,
            changePage: function (offset, limit, currentPage) {
                this.currentPage = currentPage;
                change(offset, limit);
                async function change(offset, limit) {
                    await loadProductMains(offset, limit);
                };
            }
        };

        activate();

        ////////////////

        async function activate() {
            detectActiveAccount();
            await loadBrands();
            await loadCategories();
            await loadProductMains(vm.FeatureProduct.offset, vm.FeatureProduct.limit);
            await loadProductFreatures(vm.FeatureProduct.offset, vm.FeatureProduct.limit);
            await loadProductNews(vm.NewProduct.offset, vm.NewProduct.limit);
            await loadProductBestsellers(vm.RecommendProduct.offset, vm.RecommendProduct.limit);
         };

        function detectActiveAccount() {
            if(_.get($route, 'current.$$route.isActiveRoute')) {
                var token = _.get($route, 'current.params.token');
                var id = _.get($route, 'current.params.id');
                var email = _.get($route, 'current.params.email');
                activeAccount(token, id, email);
            }
        } 

        function activeAccount(token, id, email) {
            var requestData = HomeService.helper.parseActiveRequest(token, id, email);
            HomeService.activeAccount(requestData)
                .then(function(response) {
                    var data = response.data || {};
                    if(data.success) {
                        $rootScope.rootModal.headerTitle = "Kích hoạt tài khoản thành công";
                        $rootScope.rootModal.contentMsg = "Cám ơn bạn đã đăng ký tài khoản tại FoodTech. Chúng tôi sẽ gửi đến bạn thông vào về những chương trình giảm giá và sự kiện của shop.";
                        $rootScope.rootModal.show();
                        // login
                        $rootScope.getCustomer(data.token)
                            .then(function() {
                                window.localStorage.setItem('customerToken', data.token);
                            })
                    } else {
                        if(data.isActived) {
                            $rootScope.rootModal.headerTitle = "Kích hoạt tài khoản thất bại";
                            $rootScope.rootModal.contentMsg = "Tài khoản này đã được kích hoạt. Bạn có thể liên hệ với admin của FoodTech ở mục liên hệ để được hỗ trợ. Cám ơn bạn nhé.";
                            $rootScope.rootModal.show();
                        } else {
                            $rootScope.rootModal.headerTitle = "Kích hoạt tài khoản thất bại";
                            $rootScope.rootModal.contentMsg = "Đã xảy ra lỗi trong quá trỉnh kích hoạt tài khoản, bạn có thể vào mục liên hệ để gửi thông báo để được admin FoodTech hỗ trợ kích hoạt tài khoản nhé. Cám ơn bạn.";
                            $rootScope.rootModal.show();  
                        }  
                    }
                }).catch(function(error) {
                    $rootScope.rootModal.headerTitle = "Kích hoạt tài khoản thất bại";
                    $rootScope.rootModal.contentMsg = "Đã xảy ra lỗi trong quá trỉnh kích hoạt tài khoản, bạn có thể vào mục liên hệ để gửi thông báo để được admin FoodTech hỗ trợ kích hoạt tài khoản nhé. Cám ơn bạn.";
                    $rootScope.rootModal.show();
                });
        }

        function loadProductMains(offset, limit) {
            return new Promise((resolve, reject) => {
                HomeService.getProductMains(offset, limit)
                    .then(function (productMains) {
                        vm.mainProductConfig.totalItems = productMains.data.count;
                        vm.MainProduct.total = productMains.data.count;
                        vm.productMains = productMains.data.rows;
                        resolve(vm.productMains);
                    }).catch(function (err) {
                        console.log(err);
                        reject(err);
                    });
            });
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

        function loadProductNews(offset, limit) {
            return new Promise((resolve, reject) => {
                HomeService.getProductNews(offset, limit)
                    .then(function (productNews) {
                        vm.newProductConfig.totalItems = productNews.data.count;
                        vm.NewProduct.total = productNews.data.count;
                        vm.productNews = productNews.data.rows;
                        vm.newProductConfig.isLoading = false;
                        resolve(productNews.data);
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