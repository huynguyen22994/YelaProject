(function() {
    'use strict';

    angular
        .module('YelaAppClient.Home')
        .controller('HomeController', ControllerController);

    ControllerController.$inject = ['HomeService', 'clientConstant', '$route', '$rootScope'];
    function ControllerController(HomeService, clientConstant, $route, $rootScope) {
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
            detectActiveAccount();
            await loadBrands();
            await loadCategories();
            await loadProductFreatures(vm.FeatureProduct.offset, vm.FeatureProduct.limit);
            vm.productNews = await loadProductNews();
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