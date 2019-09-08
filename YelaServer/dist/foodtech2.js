(function() {
    'use strict';

    angular
        .module('YelaAppClient.Product', [])
        .factory('Product', Service);

    Service.$inject = [];
    function Service() {

        function Product(id, name, price, linkImg, quantity) {
            this._id = id;
            this.productId = id;
            this.name = name;
            this.price = price;
            this.linkImg = linkImg;
            this.contructor = Product;
            this.quantity = quantity ? quantity : 0;
        }

        Product.prototype = {
            getPrice: getPrice,
            setName: setName,
            setPrice: setPrice,
            upQuantity: upQuantity,
            downQuantity: downQuantity,
            getQuantity: getQuantity,
            getPriceWithQuantity: getPriceWithQuantity
        }
        
        return Product;

        ////////////////

        function getPrice() {
            parseInt(this.price);
            return this.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        }

        function setName(name) {
            this.name = name;
            return this;
        }

        function setPrice(price) {
            this.price = price;
            return this;
        }

        function upQuantity(quantity) {
            this.quantity = quantity ? this.quantity + quantity : this.quantity + 1;
            return this;
        }

        function downQuantity(quantity) {
            this.quantity = quantity ? this.quantity - quantity : this.quantity - 1;
            if(this.quantity < 0) {
                this.quantity = 0;
            }
            return this;
        }

        function getQuantity() {
            return this.quantity;
        }

        function getPriceWithQuantity() {
            return this.price * this.quantity;
        }

    }
})();
(function() {
    'use strict';

    angular
        .module('YelaAppClient.Cart', [])
        .factory('Cart', Service);

    Service.$inject = [];
    function Service() {

        function Cart() {
            this.products = [];
            this.total = 0;
            this.contructor = Cart;
        }

        Cart.prototype = {
            addProduct: addProduct,
            adddProductWithQuatity: adddProductWithQuatity,
            getProductList: getProductList,
            getProductLength: getProductLength,
            removeProduct: removeProduct,
            getTotalPrice: getTotalPrice
        }
        
        return Cart;

        ////////////////

        function addProduct(product) {
            var isExistList = false;
            for(var i = 0; i < this.products.length; i++) {
                if(this.products[i]._id === product._id) {
                    this.products[i].upQuantity();
                    isExistList = true;
                }
            }
            if(!isExistList) {
                this.products.push(product);
            }
            return this;
        }

        function adddProductWithQuatity(product, quatity) {
            var isExistList = false;
            for(var i = 0; i < this.products.length; i++) {
                if(this.products[i]._id === product._id) {
                    if(quatity) {
                        this.products[i].upQuantity(quatity);
                    } else {
                        this.products[i].upQuantity();
                    }
                    isExistList = true;
                }
            }
            if(!isExistList) {
                this.products.push(product);
            }
            return this;
        }

        function getProductList() {
            return this.products;
        }

        function getProductLength() {
            return this.products.length;
        }

        function removeProduct(product) {
            for(var i = 0; i < this.products.length; i++) {
                if(this.products[i]._id === product._id) {
                    this.products.splice(i, 1);
                }
            }
            return this;
        }

        function getTotalPrice() {
            for(var i = 0; i < this.products.length; i++) {
                this.total = this.total + this.products[i].getPrice();
            }
            return this.total;
        }

    }
})();
(function() {
    'use strict';

    angular
        .module('CustomerModel', [])
        .factory('Customer', Service);

    Service.$inject = [];
    function Service() {

        function Customer(id, token, firstName, lastName, avatarLink, email) {
            this._id = id;
            this.token = token;
            this.firstName = firstName;
            this.lastName = lastName;
            this.avatarLink = avatarLink;
            this.email = email;
            this.contructor = Customer;
        }

        Customer.prototype = {
            getInfo: getInfo,
            getName: getName,
            getEmail: getEmail,
            getImage: getImage,
            getToken: getToken,
            getId: getId,
            isLogin: isLogin,
            destroy: destroy
        }
        
        return Customer;

        ////////////////

        function getInfo() {
            return angular.copy(this);
        }

        function getName() {
            return this.firstName + ' ' + this.lastName;
        }

        function getEmail() {
            return this.email;
        }

        function getImage() {
            return this.avatarLink ? this.avatarLink : 'images/shop/customer.png';
        }

        function getToken() {
            return this.token;
        }

        function getId() {
            return this._id;
        }

        function isLogin() {
            if(this.token) {
                return true;
            } else {
                return false;
            }
        }

        function destroy() {
            this._id = null;
            this.token = null;
            this.firstName = null;
            this.lastName = null;
            this.avatarLink = null;
            this.email = null;
            return this;
        }

    }
})();
(function() {
    'use strict';

    angular.module('YelaAppClient', [
        'YelaAppClient.Home',
        'YelaAppClient.Login',
        'YelaAppClient.Shop',
        'YelaAppClient.Detail',
        'YelaAppClient.FoodByType',
        'YelaAppClient.Foods',
        'YelaAppClient.Materials',
        'YelaAppClient.BlogSingle',
        'YelaAppClient.Cart',
        'YelaAppClient.Product',
        'YelaAppClient.CartApp',
        'YelaAppClient.Contact',
        'YelaAppClient.Blog',
        'YelaAppClient.FormFoods',
        'YelaAppClient.Searching',
        'YelaAppClient.Wishlist',
        'YelaAppClient.ngEnter',
        'YelaAppClient.Modal',
        'YelaAppClient.errorSrc',
        'YelaAppClient.Introduce',
        'YelaChatBox',
        'Brand',
        'Category',
        'FeaturesItem',
        'FooterApp',
        'HeaderApp',
        'ProductItem',
        'RecommendProduct',
        'Sidebar',
        'SlideShow',
        'SocialButton',
        'Tab',
        'CartTable',
        'CustomerModel',
        'ngAnimate',
        'toastr',
        'Resize',
        'ngMeta'
    ]);
})();
(function () {
    'use strict';
    angular.element(function() {
      angular.bootstrap(document, ['YelaAppClient']);
    });
})();
(function() {
    'use strict';

    angular
        .module('YelaAppClient')
        .config(AppConfigFunction);

    AppConfigFunction.$inject = ['$locationProvider', 'ngMetaProvider'];
    function AppConfigFunction($locationProvider, ngMetaProvider) {
        //$locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('');

        ngMetaProvider.useTitleSuffix(true);
        // On /home, the title would change to
        // 'Home Page | Best Website on the Internet!'
        ngMetaProvider.setDefaultTitle('FoodTech Shop - Mì Tỏi');
        ngMetaProvider.setDefaultTitleSuffix(' | FoodTech Shop');
        ngMetaProvider.setDefaultTag('author', 'FoodTech Team');
    }
})();

(function() {
    'use strict';

    angular
        .module('YelaAppClient')
        .config(AppConfigFunction);

    AppConfigFunction.$inject = ['toastrConfig'];
    function AppConfigFunction(toastrConfig) {
        angular.extend(toastrConfig, {
            autoDismiss: false,
            containerId: 'toast-container',
            maxOpened: 0,    
            newestOnTop: true,
            positionClass: 'toast-top-right',
            preventDuplicates: false,
            preventOpenDuplicates: false,
            target: 'body'
          });
    }
})();
(function() {
    'use strict';

    angular
        .module('YelaAppClient')
        .run(AppRunFunction);

    AppRunFunction.$inject = ['$rootScope', 'ngMeta'];
    function AppRunFunction($rootScope, ngMeta) {
        ngMeta.init();
        $rootScope.$on("$locationChangeStart", function(event, next, current) {   
            $(window).scrollTop(0);
        }); 
    }
})();
(function() {
    'use strict';

    angular.module('YelaAppClient')
        .constant('clientConstant', {
            serverUrl: '',
            notFoundImg: 'images/404/noImage.png'
    });
})();
(function() {
    'use strict';

    angular
        .module('YelaAppClient')
        .controller('ClientController', ControllerController);

    ControllerController.$inject = ['$i18next', '$timeout', '$rootScope', 'Cart', '$scope', 'LoginService', 'Customer', '$location', 'ModalService', 'Product', 'toastr', '$window', 'ShopService', 'clientConstant', 'ngMeta'];
    function ControllerController($i18next, $timeout, $rootScope, Cart, $scope, LoginService, Customer, $location, ModalService, Product, toastr, $window, ShopService, clientConstant, ngMeta) {
        var vm = this;
        var TIME_OUT = 500;
        var customerToken = window.localStorage.getItem('customerToken');
        // this is root cart
        $rootScope.Cart = new Cart();
        $rootScope.useChatBox = false;
        $rootScope.logout = logout;
        $rootScope.rootModal = {
            headerTitle: '',
            contentMsg: '',
            show: function() {
                angular.element('#rootModal').modal('show');
            },
            hide: function() {
                angular.element('#rootModal').modal('hide');
            },
            toggle: function() {
                angular.element('#rootModal').modal('toggle');
            },
            closeCallback: function() {
                $location.path('/');
            }
        }
        $rootScope.productDetailModal = {};
        $rootScope.notFoundImg = clientConstant.notFoundImg;

        //////// Function ////////
        $rootScope.getCustomer = getCustomer;
        $rootScope.openModal = openModal;
        $rootScope.closeModal = closeModal;
        $rootScope.addToCart = addToCart;
        $rootScope.setMetaTag = setMetaTag;

        activate();
        ////////////////

        function activate() { 
            getCustomer(customerToken);
            initCartFirst();
            openMainBenner();
        };

        function getCustomer(token) {
            var promise = new Promise(function(resolve, reject) {
                if(token) {
                    LoginService.getCustomerByToken(token)
                        .then(function(res) {
                            var data = res.data;
                            if(data) {
                                if(data.success) {
                                    var cusInfo = data.customer;
                                    $rootScope.Customer = new Customer(cusInfo.customerId, cusInfo.token, cusInfo.firstName, cusInfo.lastName, cusInfo.avatarLink, cusInfo.email);
                                    vm.spinnerHide = true;
                                }
                            }
                            resolve();
                        })
                } else {
                    $timeout(function() {
                        vm.spinnerHide = true;
                        resolve();
                    }, TIME_OUT);
                }
            })
            return promise;
        }

        function logout() {
            window.localStorage.removeItem("customerToken");
            $rootScope.Customer.destroy();
            $rootScope.$emit("closeChatBox");
            $location.path('/');
        }

        function openModal(id) {
            ModalService.Open(id);
        }

        function closeModal(id) {
            ModalService.Close(id);
        }

        function addToCart(product, quantity) {
            var _product = new Product(product.productId, product.name, product.price, product.linkImg);
            _product.upQuantity(quantity);
            $rootScope.Cart.adddProductWithQuatity(_product, quantity);
            toastr.success(product.name + ' đã được thêm vào giỏ hàng');
        }

        function initCartFirst() {
            var cacheCartString = window.localStorage.getItem('cart');
            var cacheCart = JSON.parse(cacheCartString);
            if(cacheCart && cacheCart.length > 0) {
                ShopService.getAllProducts()
                .then(function(response) {
                    vm.allProducts = response.data.products;
                    angular.forEach(cacheCart, function(productCache) {
                        var product = _.find(vm.allProducts, function(item) {
                            return item.productId === productCache.productId;
                        })
                        if(product) {
                            var _product = new Product(product.productId, product.name, product.price, product.linkImg);
                            _product.upQuantity(productCache.quantity);
                            $rootScope.Cart.adddProductWithQuatity(_product, productCache.quantity);
                        }
                    })
                })
            }
        }

        function cacheCart() {
            var cart = $rootScope.Cart.getProductList() || [], cacheCart = [];
            window.localStorage.removeItem('cart');
            angular.forEach(cart, function(product) {
                cacheCart.push({
                    productId: product.productId,
                    quantity: product.quantity
                });
            })
            window.localStorage.setItem('cart', JSON.stringify(cacheCart));
        }

        function openMainBenner() {
            setTimeout(function() {
                openModal('main-banner-dialog');
            }, 5000);
        }

        function setMetaTag(title, description, image) {
            ngMeta.setTitle(title);
            ngMeta.setTag('description', description);
            ngMeta.setTag('image', 'https://foodtechserver.herokuapp.com' + image);
        }

        $scope.$on("$destroy", function() {

        });

        $window.onbeforeunload = function (evt) {
            cacheCart();
        }

    }
})();
(function() {
    'use strict';

    angular.module('YelaAppClient.Home', [
        'ngRoute'
    ]);
})();
(function() {
    'use strict';

    angular
        .module('YelaAppClient.Home')
        .factory('HomeService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            getAllProduct: getAllProduct,
            getProductFreatures: getProductFreatures,
            getProductMains: getProductMains,
            getProductNews: getProductNews,
            getProductBestsellers: getProductBestsellers,
            getBrands: getBrands,
            getCategories: getCategories,
            activeAccount: activeAccount,
            helper: {
                parseActiveRequest: parseActiveRequest
            }
        };
        
        return service;

        ////////////////
        function getAllProduct() {
            return [
                { name: 'test1', id: 1 },
                { name: 'test12', id: 2 },
                { name: 'test3', id: 3 },
                { name: 'test4', id: 4}
            ]
        };

        function getProductFreatures(offset, limit) {
            return $http({
                url: '/api/productfreatures',
                method: 'GET',
                params: {
                    offset: offset,
                    limit: limit
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function getProductMains(offset, limit) {
            return $http({
                url: '/api/productmains',
                method: 'GET',
                params: {
                    offset: offset,
                    limit: limit
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function getProductNews(offset, limit) {
            return $http({
                url: '/api/productnew',
                method: 'GET',
                params: {
                    offset: offset,
                    limit: limit
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function getProductBestsellers(offset, limit) {
            return $http({
                url: '/api/productbestseller',
                method: 'GET',
                params: {
                    offset: offset,
                    limit: limit
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function getBrands() {
            return $http({
                url: '/api/brand',
                method: 'GET'
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function getCategories() {
            return $http({
                url: '/api/category/producttype',
                method: 'GET'
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function activeAccount(data) {
            return $http({
                url: '/api/customer/active',
                method: 'POST',
                data: data
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function parseActiveRequest(token, id, email) {
            return {
                token: token,
                customerId: id,
                email: email
            }
        }
    }
})();
(function() {
    'use strict';
    angular
        .module('YelaAppClient.Home')
        .run(runFunction);
        runFunction.$inject = ['$templateCache'];
        function runFunction($templateCache) {
            $templateCache.put('home.html',
                `   
                    <section id="slider">
                        <div class="container">
                            <div class="row">
                                <div class="col-sm-12">
                                    <slide-show></slide-show>
                                </div>
                            </div>
                        </div>
                    </section>
            
                    <section>
                        <div class="container">
                            <div class="row">
                                <div class="col-sm-3">
                                    <sidebar brand-data="vm.brands" category-data="vm.categories"></sidebar>
                                </div>
                                <div class="col-sm-9 padding-right">
                                    <div ng-show="vm.mainLoading">
                                        <div class="foodtech-loader"></div>
                                        <div class="foodtech-loader-backdrop main"></div>
                                    </div>
                                    <features-item array-data="vm.productMains" config="vm.mainProductConfig"></features-item>  
                                    <features-item array-data="vm.productFreatures" config="vm.featureProductConfig"></features-item>    
                                    <recommend-product array-data="vm.productBestsellers" config="vm.recommendProductConfig"></recommend-product>
                                    <recommend-product array-data="vm.productNews" config="vm.newProductConfig"></recommend-product>
                                    <tab></tab>
                                    <div class="col-xs-12 col-sm-10 col-md-8">
                                        <div class="fb-comments" data-href="https://foodtechserver.herokuapp.com" data-numposts="5"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                `
            );
        }
})();
(function () {
    'use strict';

    angular
        .module('YelaAppClient.Home')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        var urlActiveAccount = '/active-account/:token/:id/:email';

        $routeProvider
            .when('/', {
                templateUrl: 'home.html',
                controller: 'HomeController',
                controllerAs: 'vm',
                appId: 'home',
                data: {
                    meta: {
                        'title': 'FoodTech Shop - Mì Tỏi',
                        'og:title': 'FoodTech Shop - Mì Tỏi',
                        'description': 'Chúng tôi luôn khát khao, cố gắng cải thiện từng ngày để mang đến những sản phẩm thức ăn nhanh và một dịch vụ tốt nhất cho cộng đồng.',
                        'og:description': 'Chúng tôi luôn khát khao, cố gắng cải thiện từng ngày để mang đến những sản phẩm thức ăn nhanh và một dịch vụ tốt nhất cho cộng đồng.',
                        'og:image': 'https://foodtechserver.herokuapp.com/images/home/foodtech_slide_3.jpg'
                    }
                },
            })
            .when(urlActiveAccount, {
                templateUrl: 'home.html',
                controller: 'HomeController',
                controllerAs: 'vm',
                isActiveRoute: true
            })
            .otherwise({
                redirectTo : '/'
            });
        //$locationProvider.html5Mode(true);
    };
})();
(function() {
    'use strict';

    angular
        .module('YelaAppClient.Home')
        .controller('HomeController', ControllerController);

    ControllerController.$inject = ['HomeService', 'clientConstant', '$route', '$rootScope', 'ngMeta'];
    function ControllerController(HomeService, clientConstant, $route, $rootScope, ngMeta) {
        ngMeta.setTitle('FoodTech Shop - Mì Tỏi');
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
                vm.featureProductConfig.isLoading = true;
                this.currentPage = currentPage;
                change(offset, limit);
                async function change(offset, limit) {
                    await loadProductFreatures(offset, limit);
                };
            }
        };

        vm.mainProductConfig = {
            title: 'mainFood',
            isLoading: true,
            totalItems: 0,
            currentPage: 1,
            limit: vm.FeatureProduct.limit,
            changePage: function (offset, limit, currentPage) {
                vm.mainProductConfig.isLoading = true;
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
            vm.mainLoading = true;
            detectActiveAccount();
            loadBrands();
            loadCategories();
            loadProductMains(vm.FeatureProduct.offset, vm.FeatureProduct.limit).then(function() {
                vm.mainLoading = false;
            })
            loadProductFreatures(vm.FeatureProduct.offset, vm.FeatureProduct.limit);
            loadProductNews(vm.NewProduct.offset, vm.NewProduct.limit);
            loadProductBestsellers(vm.RecommendProduct.offset, vm.RecommendProduct.limit);
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
                        vm.mainProductConfig.isLoading = false;
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
                        vm.featureProductConfig.isLoading = false;
                        resolve(productFreatures.data);
                    }).catch(function (err) {
                        console.log(err);
                        reject(err);
                    });
            });
        };

        function loadProductNews(offset, limit) {
            vm.newProductConfig.isLoading = true;
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
                    }).finally(function() {
                        vm.newProductConfig.isLoading = false;
                    })
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
            vm.recommendProductConfig.isLoading = true;
            HomeService.getProductBestsellers(offset, limit)
                .then(function (productBestsellers) {
                    vm.productBestsellers = productBestsellers.data.rows;
                }).catch(function (err) {
                    console.log(err);
                    reject(err);
                }).finally(function() {
                    vm.recommendProductConfig.isLoading = false;
                })
        };
        
    }
})();
(function() {
    'use strict';

    angular.module('YelaAppClient.Shop', [
        'ngRoute'
    ]);
})();
(function() {
    'use strict';

    angular
        .module('YelaAppClient.Shop')
        .factory('ShopService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            getBrands: getBrands,
            getCategories: getCategories,
            getProducts: getProducts,
            getAllProducts: getAllProducts
        };
        
        return service;

        ////////////////
        function getBrands() { 
            return $http({
                url: '/api/brand',
                method: 'GET'
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function getCategories() {
            return $http({
                url: '/api/category/producttype',
                method: 'GET'
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function getProducts(offset, limit) {
            return $http({
                url: '/api/product/offset',
                method: 'GET',
                params: {
                    offset: offset,
                    limit: limit
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function getAllProducts() {
            return $http({
                url: '/api/products',
                method: 'GET'
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        }
    }
})();
(function() {
    'use strict';
    angular
        .module('YelaAppClient.Shop')
        .run(runFunction);
        runFunction.$inject = ['$templateCache'];
        function runFunction($templateCache) {
            $templateCache.put('shop.html',
                `               
                    <section>
                        <div class="container">
                            <div class="row">
                                <div class="col-sm-3">
                                    <sidebar brand-data="vm.brands" category-data="vm.categories"></sidebar>
                                </div>
                                <div class="col-sm-9 padding-right" id="all-products">
                                    <div class="features_items">
                                        <div ng-if="vm.isLoading">
                                            <div class="foodtech-loader"></div>
                                            <div class="foodtech-loader-backdrop"></div>
                                        </div>
						                <h2 class="title text-center">Tất Cả Sản Phẩm</h2>
                                        <product-item ng-repeat="data in vm.products" data="data" config="vm.productItemConfig" ></product-item>
                                    </div>
                                    <div ng-show="!vm.isLoading" class="pagination-area">
                                        <ul class="pagination">
                                            <li ng-class="{disabled:vm.pageTotal === 1}">
                                                <a ng-click="vm.changePage(0, vm.Product.limit, 1)"><i class="fa fa-angle-double-left"></i></a>
                                            </li>
                                            <li ng-repeat="page in vm.pageArray">
                                                <a ng-click="vm.changePage(page.offset, page.limit, page.page)" ng-class="{active:page.page === vm.currentPage}"> {{ page.page }} </a>
                                            </li>
                                            <li ng-class="{disabled:vm.pageTotal === 1}">
                                                <a ng-click="vm.changePage((vm.pageTotal  - 1) * vm.Product.limit, vm.Product.limit, vm.pageTotal)"><i class="fa fa-angle-double-right"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                `
            );
        };
})();
(function () {
    'use strict';

    angular
        .module('YelaAppClient.Shop')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/shop', {
                templateUrl: 'shop.html',
                controller: 'ShopController',
                controllerAs: 'vm',
                appId: 'shop'
            });
        //$locationProvider.html5Mode(true);
    };
})();
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
            vm.isLoading = true;
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
(function() {
    'use strict';

    angular.module('YelaAppClient.Detail', [
        'ngRoute'
    ]);
})();
(function() {
    'use strict';

    angular
        .module('YelaAppClient.Detail')
        .factory('DetailService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            getBrands: getBrands,
            getCategories: getCategories,
            getProductById: getProductById,
            getProductMains: getProductMains,
            getProductBestsellers: getProductBestsellers
        };
        
        return service;

        ////////////////
        function getBrands() { 
            return $http({
                url: '/api/brand',
                method: 'GET'
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function getCategories() {
            return $http({
                url: '/api/category/producttype',
                method: 'GET'
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function getProductById(productId) {
            return $http({
                url: '/api/product/one',
                method: 'GET',
                params: {
                    productId: productId
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function getProductBestsellers(offset, limit) {
            return $http({
                url: '/api/productbestseller',
                method: 'GET',
                params: {
                    offset: offset,
                    limit: limit
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function getProductMains(offset, limit) {
            return $http({
                url: '/api/productmains',
                method: 'GET',
                params: {
                    offset: offset,
                    limit: limit
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

    }
})();
(function() {
    'use strict';
    angular
        .module('YelaAppClient.Detail')
        .run(runFunction);
        runFunction.$inject = ['$templateCache'];
        function runFunction($templateCache) {
            $templateCache.put('detail.html',
                `   
                    <section>
                        <div class="container">
                            <div class="row">
                                <div class="col-sm-3">
                                    <sidebar brand-data="vm.brands" category-data="vm.categories"></sidebar>
                                </div>
                                <div class="col-sm-9 padding-right">
                                    <div ng-if="vm.isLoading">
                                        <div class="foodtech-loader"></div>
                                        <div class="foodtech-loader-backdrop"></div>
                                    </div>
                                    <h2 class="title text-center">{{ 'productDetail' | i18next }}</h2>
                                    <div class="product-details content-left"><!--product-details-->
                                        <div class="col-sm-5">
                                            <div class="view-product">
                                                <img ng-src="{{vm.product.linkImg}}" on-error-src="{{ $root.notFoundImg }}"/>
                                            </div>
                                        </div>
                                        <div class="col-sm-7">
                                            <div class="product-information"><!--/product-information-->
                                             <label class="newarrival banner-lable">{{ vm.product.productStatus | i18next }}</label>   
                                                <h2>{{vm.product.name}}</h2>
                                                <!--<p>Web ID: 1089772</p>-->
                                                <p>
                                                    <span>
                                                        <span>{{ vm.formatPrice(vm.product.price) }}</span>
                                                    </span>
                                                </p>
                                                <span>
                                                    <label>{{ 'quantity' | i18next }}:</label>
                                                    <input type="number" ng-model="vm.quantity" min="1"/>
                                                    <button type="button" class="btn btn-fefault cart" ng-click="vm.addToCart(vm.product, vm.quantity)">
                                                        <i class="fa fa-shopping-cart"></i>
                                                        {{ 'addToCart' | i18next }}
                                                    </button>
                                                </span>
                                                <p><b>{{ 'status' | i18next }}:</b> Còn</p>
                                                <div style="display: -webkit-box">
                                                    <p style="line-height: 40px; padding-right: 5px"><b>{{ 'share' | i18next }}:</p>
                                                    <!-- Your like button code Facebook-->
                                                    <div class="fb-like" 
                                                    data-href="{{ 'http://www.foodtechshop.vn/#!/detail/' +  vm.product.productId }}" 
                                                    data-layout="standard" 
                                                    data-action="like" 
                                                    data-show-faces="true"
                                                    data-share="true">
                                                    </div>
                                                    <!-- Your like button code Zalo -->
                                                    <div style="display: flex">
                                                        <div style="margin-right: 5px" class="zalo-share-button" data-href="" data-oaid="2730045833870873800" data-layout="1" data-color="blue" data-customize=false></div>
                                                        <div class="zalo-follow-only-button" data-oaid="2730045833870873800"></div>
                                                    </div>
                                                </div>
                                                <p><b>{{ 'describe' | i18next }}:</b> {{vm.product.discribe}}</p>
                                            </div><!--/product-information-->
                                        </div>
                                    </div><!--/product-details-->

                                    <div class="category-tab shop-details-tab" style="text-align: left"><!--category-tab-->
                                        <div class="col-sm-12">
                                            <ul class="nav nav-tabs">
                                                <li class="active"><a href="#reviews" data-toggle="tab">{{ 'comment' | i18next }}</a></li>
                                            </ul>
                                        </div>
                                        <div class="tab-content">
                                            <div class="tab-pane fade active in" id="reviews" >
                                                <div class="col-sm-12">
                                                    <div class="fb-comments" 
                                                        data-href="{{ 'http://www.foodtechshop.vn/#!/detail/' +  vm.product.productId }}" 
                                                        data-width="700" 
                                                        data-numposts="10"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div><!--/category-tab-->
                                    <features-item array-data="vm.productMains" config="vm.mainProductConfig"></features-item> 
                                    <recommend-product array-data="vm.productBestsellers" config="vm.recommendProductConfig"></recommend-product>  
                                </div>
                            </div>
                        </div>
                    </section>
                `
            );
        };
})();
(function () {
    'use strict';

    angular
        .module('YelaAppClient.Detail')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/detail/:id', {
                templateUrl: 'detail.html',
                controller: 'DetailController',
                controllerAs: 'vm'
            });
        //$locationProvider.html5Mode(true);
    };
})();
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
(function() {
    'use strict';

    angular.module('YelaAppClient.FoodByType', [
        'ngRoute'
    ]);
})();
(function() {
    'use strict';

    angular
        .module('YelaAppClient.FoodByType')
        .factory('FoodTypeService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            getBrands: getBrands,
            getCategories: getCategories,
            getFoodByType: getFoodByType,
            getFoodType: getFoodType
        };
        
        return service;

        ////////////////
        function getBrands() { 
            return $http({
                url: '/api/brand',
                method: 'GET'
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function getCategories() {
            return $http({
                url: '/api/category/producttype',
                method: 'GET'
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function getFoodByType(offset, limit, productTypeId) {
            return $http({
                url: '/api/product/producttypeid',
                method: 'GET',
                params: {
                    offset: offset,
                    limit: limit,
                    productTypeId: productTypeId
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function getFoodType(productTypeId) {
            return $http({
                url: '/api/producttype/one',
                method: 'GET',
                params: {
                    productTypeId: productTypeId
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        }
    }
})();
(function() {
    'use strict';
    angular
        .module('YelaAppClient.FoodByType')
        .run(runFunction);
        runFunction.$inject = ['$templateCache'];
        function runFunction($templateCache) {
            $templateCache.put('FoodType.html',
                `               
                    <section>
                        <div class="container">
                            <div class="row">
                                <div class="col-sm-3">
                                    <sidebar brand-data="vm.brands" category-data="vm.categories"></sidebar>
                                </div>
                                <div class="col-sm-9 padding-right" id="all-products">
					                <div class="features_items">
                                        <h2 class="title text-center">{{ vm.productType.name }}</h2>
                                        <div ng-if="vm.isLoading">
                                            <div class="foodtech-loader"></div>
                                            <div class="foodtech-loader-backdrop"></div>
                                        </div>
                                        <product-item ng-repeat="data in vm.products" data="data" config="vm.productItemConfig" ></product-item>
                                    </div>
                                    <div ng-show="!vm.isLoading" class="pagination-area">
                                        <ul class="pagination">
                                            <li ng-class="{disabled:vm.pageTotal === 1}">
                                                <a ng-click="vm.changePage(0, vm.Product.limit, 1)"><i class="fa fa-angle-double-left"></i></a>
                                            </li>
                                            <li ng-repeat="page in vm.pageArray">
                                                <a ng-click="vm.changePage(page.offset, page.limit, page.page)" ng-class="{active:page.page === vm.currentPage}"> {{ page.page }} </a>
                                            </li>
                                            <li ng-class="{disabled:vm.pageTotal === 1}">
                                                <a ng-click="vm.changePage((vm.pageTotal  - 1) * vm.Product.limit, vm.Product.limit, vm.pageTotal)"><i class="fa fa-angle-double-right"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                `
            );
        };
})();
(function () {
    'use strict';

    angular
        .module('YelaAppClient.FoodByType')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/foodtype/:id', {
                templateUrl: 'FoodType.html',
                controller: 'FoodTypeController',
                controllerAs: 'vm'
            });
        //$locationProvider.html5Mode(true);
    };
})();
(function() {
    'use strict';

    angular
        .module('YelaAppClient.FoodByType')
        .controller('FoodTypeController', ControllerController);

    ControllerController.$inject = ['FoodTypeService', 'clientConstant', '$location', '$route'];
    function ControllerController(FoodTypeService, clientConstant, $location, $route) {
        var vm = this;
        let productTypeId = $route.current.params.id;
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
            vm.isLoading = true;
            return new Promise((resolve, reject) => {
                FoodTypeService.getFoodByType(offset, limit, productType)
                    .then(function (products) {
                        vm.products = products.data.rows;
                        if (isLoadNew) {
                            setPage(products.data.count, products.data.rows.length, vm.Product.limit)  
                        };
                        vm.isLoading = false;
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
                await loadFoodType(offset, limit, productTypeId);
            };
        };
    }
})();
(function() {
    'use strict';

    angular.module('YelaAppClient.Foods', [
        'ngRoute'
    ]);
})();
(function() {
    'use strict';

    angular
        .module('YelaAppClient.Foods')
        .factory('FoodsService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            getFoods: getFoods
        };
        
        return service;

        ////////////////
        function getFoods(offset, limit, type) {
            return $http({
                url: '/api/product/type',
                method: 'GET',
                params: {
                    offset: offset,
                    limit: limit,
                    type: type
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };
    }
})();
(function() {
    'use strict';
    angular
        .module('YelaAppClient.Foods')
        .run(runFunction);
        runFunction.$inject = ['$templateCache'];
        function runFunction($templateCache) {
            $templateCache.put('foods.html',
                `               
                    <section>
                        <div class="container">
                            <div class="row">
                                <div class="col-sm-3">
                                    <sidebar brand-data="vm.brands" category-data="vm.categories"></sidebar>
                                </div>
                                <div class="col-sm-9 padding-right">
                                    <div class="features_items">
                                        <div ng-if="vm.isLoading">
                                            <div class="foodtech-loader"></div>
                                            <div class="foodtech-loader-backdrop"></div>
                                        </div>
						                <h2 class="title text-center">{{ 'foods' | i18next }}</h2>
                                        <product-item ng-repeat="data in vm.products" data="data" config="vm.productItemConfig" ></product-item>
                                    </div>
                                    <div class="pagination-area">
                                        <ul class="pagination">
                                            <li ng-class="{disabled:vm.pageTotal === 1}">
                                                <a ng-click="vm.changePage(0, vm.Product.limit, 1)"><i class="fa fa-angle-double-left"></i></a>
                                            </li>
                                            <li ng-repeat="page in vm.pageArray">
                                                <a ng-click="vm.changePage(page.offset, page.limit, page.page)" ng-class="{active:page.page === vm.currentPage}"> {{ page.page }} </a>
                                            </li>
                                            <li ng-class="{disabled:vm.pageTotal === 1}">
                                                <a ng-click="vm.changePage((vm.pageTotal  - 1) * vm.Product.limit, vm.Product.limit, vm.pageTotal)"><i class="fa fa-angle-double-right"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                `
            );
        };
})();
(function () {
    'use strict';

    angular
        .module('YelaAppClient.Foods')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/foods', {
                templateUrl: 'foods.html',
                controller: 'FoodsController',
                controllerAs: 'vm',
                appId: 'foods'
            });
        //$locationProvider.html5Mode(true);
    };
})();
(function() {
    'use strict';

    angular
        .module('YelaAppClient.Foods')
        .controller('FoodsController', ControllerController);

    ControllerController.$inject = ['ShopService', 'clientConstant', '$location', 'FoodsService'];
    function ControllerController(ShopService, clientConstant, $location, FoodsService) {
        var vm = this;
        var foodType = 'food';
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
            await loadFoods(vm.Product.offset, vm.Product.limit, true);
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

        function loadFoods(offset, limit, isLoadNew) {
            return new Promise((resolve, reject) => {
                FoodsService.getFoods(offset, limit, foodType)
                    .then(function (products) {
                        vm.products = products.data.rows;
                        if (isLoadNew) {
                            setPage(products.data.count, products.data.rows.length, vm.Product.limit)  
                        };
                        vm.isLoading = false;
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
                await loadFoods(offset, limit);
            };
        };
    }
})();
(function() {
    'use strict';

    angular.module('YelaAppClient.Materials', [
        'ngRoute'
    ]);
})();
(function() {
    'use strict';

    angular
        .module('YelaAppClient.Materials')
        .factory('MaterialsService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            getMaterials: getMaterials
        };
        
        return service;

        ////////////////
        function getMaterials(offset, limit, type) {
            return $http({
                url: '/api/product/type',
                method: 'GET',
                params: {
                    offset: offset,
                    limit: limit,
                    type: type
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };
    }
})();
(function() {
    'use strict';
    angular
        .module('YelaAppClient.Materials')
        .run(runFunction);
        runFunction.$inject = ['$templateCache'];
        function runFunction($templateCache) {
            $templateCache.put('materials.html',
                `               
                    <section>
                        <div class="container">
                            <div class="row">
                                <div class="col-sm-3">
                                    <sidebar brand-data="vm.brands" category-data="vm.categories"></sidebar>
                                </div>
                                <div class="col-sm-9 padding-right">
                                    <div class="features_items">
                                        <div ng-if="vm.isLoading">
                                            <div class="foodtech-loader"></div>
                                            <div class="foodtech-loader-backdrop"></div>
                                        </div>
						                <h2 class="title text-center">{{ 'materials' | i18next }}</h2>
                                        <product-item ng-repeat="data in vm.products" data="data" config="vm.productItemConfig" ></product-item>
                                    </div>
                                    <div ng-show="!vm.isLoading" class="pagination-area">
                                        <ul class="pagination">
                                            <li ng-class="{disabled:vm.pageTotal === 1}">
                                                <a ng-click="vm.changePage(0, vm.Product.limit, 1)"><i class="fa fa-angle-double-left"></i></a>
                                            </li>
                                            <li ng-repeat="page in vm.pageArray">
                                                <a ng-click="vm.changePage(page.offset, page.limit, page.page)" ng-class="{active:page.page === vm.currentPage}"> {{ page.page }} </a>
                                            </li>
                                            <li ng-class="{disabled:vm.pageTotal === 1}">
                                                <a ng-click="vm.changePage((vm.pageTotal  - 1) * vm.Product.limit, vm.Product.limit, vm.pageTotal)"><i class="fa fa-angle-double-right"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                `
            );
        };
})();
(function () {
    'use strict';

    angular
        .module('YelaAppClient.Materials')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/materials', {
                templateUrl: 'materials.html',
                controller: 'MaterialsController',
                controllerAs: 'vm',
                appId: 'materials'
            });
        //$locationProvider.html5Mode(true);
    };
})();
(function() {
    'use strict';

    angular
        .module('YelaAppClient.Materials')
        .controller('MaterialsController', ControllerController);

    ControllerController.$inject = ['ShopService', 'clientConstant', '$location', 'MaterialsService'];
    function ControllerController(ShopService, clientConstant, $location, MaterialsService) {
        var vm = this;
        var foodType = 'resource';
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
            await loadMaterials(vm.Product.offset, vm.Product.limit, true);
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

        function loadMaterials(offset, limit, isLoadNew) {
            vm.isLoading = true;
            return new Promise((resolve, reject) => {
                MaterialsService.getMaterials(offset, limit, foodType)
                    .then(function (products) {
                        vm.products = products.data.rows;
                        if (isLoadNew) {
                            setPage(products.data.count, products.data.rows.length, vm.Product.limit)  
                        };
                        vm.isLoading = false;
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
(function() {
    'use strict';

    angular.module('YelaAppClient.BlogSingle', [
        'ngRoute'
    ]);
})();
(function() {
    'use strict';

    angular
        .module('YelaAppClient.BlogSingle')
        .factory('BlogSingleService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            getBrands: getBrands,
            getCategories: getCategories,
            getBlogById: getBlogById,
            getBlogByUrlKey: getBlogByUrlKey,
            getBlogs: getBlogs,
            isURLPage: isURLPage
        };
        
        return service;

        ////////////////
        function getBrands() { 
            return $http({
                url: '/api/brand',
                method: 'GET'
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function getCategories() {
            return $http({
                url: '/api/category/producttype',
                method: 'GET'
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function getBlogById(blogId) {
            return $http({
                url: '/api/blog/one',
                method: 'GET',
                params: {
                    blogId: blogId
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function getBlogByUrlKey(urlKey) {
            return $http({
                url: '/api/blog/one/urlkey',
                method: 'GET',
                params: {
                    urlKey: urlKey
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function getBlogs(offset, limit) {
            return $http({
                url: '/api/productbestseller',
                method: 'GET',
                params: {
                    offset: offset,
                    limit: limit
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function isURLPage(url) {
            var regex = /html$/;
            return regex.test(url);
        }

    }
})();
(function() {
    'use strict';
    angular
        .module('YelaAppClient.BlogSingle')
        .run(runFunction);
        runFunction.$inject = ['$templateCache'];
        function runFunction($templateCache) {
            $templateCache.put('blogsingle.html',
                `   
                    <section>
                        <div class="container">
                            <div class="row">

                                <div class="col-sm-3">
                                    <div class="left-sidebar">
                                        <div class="brands_products"><!--brands_products-->
                                            <h2>{{ 'topic' | i18next }}</h2>
                                            <div class="brands-name">
                                                <ul class="nav nav-pills nav-stacked">
                                                    <li><a href="" ng-click="vm.goToBlogsByType('food')">Món Ăn</a></li>
                                                    <li><a href="" ng-click="vm.goToBlogsByType('nutrition')">Dinh Dưỡng</a></li>
                                                    <li><a href="" ng-click="vm.goToBlogsByType('lowcarb')">LowCarb</a></li>
                                                    <li><a href="" ng-click="vm.goToBlogsByType('discover')">Khám Phá</a></li>
                                                </ul>
                                            </div>
                                        </div><!--/brands_products-->
                                        
                                        <!--<div class="shipping text-center">
                                            <img src="images/home/banner.png" alt="" />
                                        </div>-->
                                    </div>
                                </div>

                                <div class="col-sm-9 padding-right">
                                   
                                    <div class="blog-post-area">
                                        <h2 class="title text-center">{{ 'post' | i18next }}</h2>
                                        <div class="single-blog-post">
                                            <h3>{{ vm.blog.title }}</h3>
                                            <div class="post-meta">
                                                <ul>
                                                    <li><i class="fa fa-user"></i> FoodTech</li>
                                                    <li><i class="fa fa-calendar"></i> {{ vm.blog.createdTime }}</li>
                                                </ul>
                                            </div>
                                            <div class="row">
                                                <div ng-if="vm.isLoading">
                                                    <div class="foodtech-loader"></div>
                                                    <div class="foodtech-loader-backdrop"></div>
                                                </div>
                                                <div ng-if="!vm.isLoading" id="foodtech-single-blog" class="col-xs-12 col-sm-12" style="text-align: justify">
                                                    <div style="float: left; width: inherit" ng-bind-html="vm.blog.description"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div><!--/blog-post-area-->
                
                                    <div class="rating-area">
                                        <ul class="ratings">
                                            <li class="rate-this">{{ 'rate' | i18next }}:</li>
                                            <li>
                                                <i class="fa fa-star color"></i>
                                                <i class="fa fa-star color"></i>
                                                <i class="fa fa-star color"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                            </li>
                                            <li class="color">(6 votes)</li>
                                        </ul>
                                    </div><!--/rating-area-->
                
                                    <div class="socials-share" style="float: left">
                                        <div class="fb-like" data-href="https://foodtechserver.herokuapp.com/" data-layout="standard" data-action="like" data-size="small" data-show-faces="true" data-share="true"></div>
                                    </div><!--/socials-share-->

                                    <div class="media commnets" style="float: left">
                                        <a class="pull-left" href="#">
                                            <img class="media-object" src="images/blog/man-one.jpg" alt="">
                                        </a>
                                        <div class="media-body">
                                            <h4 class="media-heading">FoodTech Shop</h4>
                                            <p>Khi bạn đã thật sự xác định được mục tiêu của cuộc đời mình thì hãy tập trung theo đuổi và kiên trì với nó. Hãy luôn giữ một niềm tin và khát khao cháy bỏng về điều đó, vì đó là hai yếu tố không thể thiếu để biến ước mơ của bạn thành sự thật.</p>
                                            <div class="blog-socials">
                                                <ul>
                                                    <li><a href=""><i class="fa fa-facebook"></i></a></li>
                                                    <li><a href=""><i class="fa fa-twitter"></i></a></li>
                                                    <li><a href=""><i class="fa fa-dribbble"></i></a></li>
                                                    <li><a href=""><i class="fa fa-google-plus"></i></a></li>
                                                </ul>
                                                <a class="btn btn-primary" href="">Other Posts</a>
                                            </div>
                                        </div>
                                    </div><!--Comments-->

                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="fb-comments" data-href="https://foodtechserver.herokuapp.com/blog" data-numposts="8"></div>
                                        </div>
                                    </div>

                                   <!-- <recommend-product array-data="vm.productBestsellers" config="vm.recommendProductConfig"></recommend-product>  -->

                                </div>
                            </div>
                        </div>
                    </section>
                `
            );
        };
})();
(function () {
    'use strict';

    angular
        .module('YelaAppClient.BlogSingle')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/blog/:id', {
                templateUrl: 'blogsingle.html',
                controller: 'BlogSingleController',
                controllerAs: 'vm'
            });
        //$locationProvider.html5Mode(true);
    };
})();
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
(function() {
    'use strict';

    angular.module('YelaAppClient.CartApp', [
        'ngRoute'
    ]);
})();
(function() {
    'use strict';

    angular
        .module('YelaAppClient.CartApp')
        .factory('CartService', Service);

    Service.$inject = ['$http'];
    function Service($http) {

        var cartState = {
            isCartPage: true
        };

        var billInfo = {};
        var billInfoSuccess = {};

        var service = {
            getCartTableConfig: getCartTableConfig,
            getParseCurrencyToNumber: getParseCurrencyToNumber,
            getCartState: getCartState,
            getBillInfo: getBillInfo,
            createBill: createBill,
            getParseBillRequest: getParseBillRequest,
            getBillInfoSuccess: getBillInfoSuccess,
            getAllCities: getAllCities,
            getDistrictByCity: getDistrictByCity,
            getShipping: getShipping
        };
        
        return service;

        ////////////////
        function getCartTableConfig() {
            return {
                attrs: [
                    {
                        key: '',
                        i18name: 'foods',
                        class: 'image'
                    },
                    {
                        key: '',
                        i18name: 'description',
                        class: 'description'
                    },
                    {
                        key: '',
                        i18name: 'price',
                        class: 'price'
                    },
                    {
                        key: '',
                        i18name: 'quantity',
                        class: 'quantity'
                    },
                    {
                        key: '',
                        i18name: 'total',
                        class: 'total'
                    }
                ]
            }
        }

        function getParseCurrencyToNumber(currency) {
            if(currency) {
                return Number(currency.replace(/[^0-9.-]+/g,"")) * 1000;
            }
            return currency;
        }

        function getCartState() {
            return cartState;
        }

        function getBillInfo() {
            return billInfo;
        }

        function createBill(bill) {
            return $http({
                url: '/api/bill',
                method: 'POST',
                data: bill
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function getParseBillRequest(bill) {
            if(bill) {
                var items = JSON.stringify(bill.items);
                return {
                    customerId: bill.customerId,
                    items: items,
                    customerName: bill.name,
                    phoneOne: bill.phoneOne || 0,
                    phoneTwo: bill.phoneTwo || 0,
                    email: bill.email || 'No',
                    city: bill.contry.city || 'No',
                    district: bill.region.district || 'No',
                    address: bill.address || 'No',
                    description: bill.description || 'No'
                }
            }
        }

        function getBillInfoSuccess() {
            return billInfoSuccess;
        }

        function getAllCities() {
            return $http({
                url: '/api/city',
                method: 'GET'
            }).then(function (res) {
                return res.data;
            }).catch(function (err) {
                return err;
            });
        };

        function getDistrictByCity(cityId) {
            return $http({
                url: '/api/district/incity',
                method: 'GET',
                params: {
                    cityId: cityId
                }
            }).then(function (res) {
                return res.data;
            }).catch(function (err) {
                return err;
            });
        };

        function getShipping(cityId, districtId) {
            return $http({
                url: '/api/shipcostQuery',
                method: 'GET',
                params: {
                    cityId: cityId,
                    districtId: districtId
                }
            }).then(function (res) {
                return res.data;
            }).catch(function (err) {
                return err;
            });
        };

    }
})();
(function() {
    'use strict';
    angular
        .module('YelaAppClient.CartApp')
        .run(runFunction);
        runFunction.$inject = ['$templateCache'];
        function runFunction($templateCache) {
            $templateCache.put('cart.html',
                `   
                   <div ng-include="'cartCheckout.html'"></div> 
                   <!--<div ng-if="!vm.cartState.isCartPage" ng-include="'checkout.html'"></div>--> 
                `
            );
        };
})();
(function () {
    'use strict';

    angular
        .module('YelaAppClient.CartApp')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/cart', {
                templateUrl: 'cart.html',
                controller: 'CartController',
                controllerAs: 'vm',
                appId: 'cart'
            });
        //$locationProvider.html5Mode(true);
    };
})();
(function() {
    'use strict';

    angular
        .module('YelaAppClient.CartApp')
        .controller('CartController', ControllerController);

    ControllerController.$inject = ['CartService', 'clientConstant', '$rootScope', '$scope', '$location', '$q'];
    function ControllerController(CartService, clientConstant, $rootScope, $scope, $location, $q) {
        var vm = this;
        vm.cartTableConfig = CartService.getCartTableConfig();
        // shipping
        vm.cities = [];
        vm.districts = [];
        vm.CityObj = {};
        vm.DistrictObj = {};
        vm.ShippingObj = {};
        // total cart price
        vm.total = 0;
        vm.shipCost = 0;
        // config for cart table in checkout page
        vm.cartTableCheckoutConfig = CartService.getCartTableConfig();
        vm.cartTableCheckoutConfig.isView = true;
        vm.cartTableCheckoutConfig.shipCost = vm.shipCost;
        // cart cost value
        vm.cartTableConfig.cartTotal = 0;
        vm.totalCartPrice = 0;
        vm.totalCartPriceFormatted = 0;
        // vm.cartState = CartService.getCartState();

        vm.getShipCost = getShipCost;
        vm.isCheckOutValid = isCheckOutValid;
        vm.goToCheckoutPage = goToCheckoutPage;

        activate();
        ////////////////

        async function activate() { 
            await loadCart();
            vm.totalCartPriceFormatted = vm.cartTableConfig.cartTotal;
            updateTotal();
            prepareShipData();
        };

        function loadCart() {
            return new Promise((resolve, reject) => {
                vm.cartData = $rootScope.Cart.getProductList();
                resolve(vm.cartData);
            });
        };

        function getCartTotal() {
            return new Promise((resolve, reject) => {
                if(angular.isArray(vm.cartData)) {
                    angular.forEach(vm.cartData, function(product) {
                        vm.totalCartPrice = vm.totalCartPrice + product.price;
                    })
                }
                resolve(vm.totalCartPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}));
            });
        };

        function updateTotal() {
            //  var total = CartService.getParseCurrencyToNumber(vm.totalCartPriceFormatted) + vm.shipCost;
            var total = CartService.getParseCurrencyToNumber(vm.totalCartPriceFormatted);
             vm.total = total.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        };

        function getShipCost() {
            return vm.shipCost ? vm.shipCost.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}) : '0';
        };

        function isCheckOutValid() {
            // for trial
            //return true;
            return CartService.getParseCurrencyToNumber(vm.total) <= 0
        };

        function goToCheckoutPage() {
            //vm.cartTableCheckoutConfig.shipCost = vm.shipCost;
            $location.path('/checkout'); 
        };

        function getCities() {
            return CartService.getAllCities();
        };

        function getDistricts(cityId) {
            if(cityId) {
                CartService.getAllDistricts(cityId)
                    .then(function(res) {
                        vm.districts = res;
                    })
            }
        };

        function getShipping(cityId, districtId) {
            return CartService.getShipping(cityId, districtId)
                .then(function(res) {
                    var theShipping = res[0];
                    vm.ShippingObj = theShipping;
                    if(theShipping) {
                        vm.shipCost = vm.ShippingObj.cost ? vm.ShippingObj.cost : 0;
                    } else {
                        vm.shipCost = 0;
                    }
                    vm.cartTableCheckoutConfig.shipCost = vm.shipCost;
                    updateTotal();
                })
        };

        function prepareShipData() {
            return $q.all([
                getCities()
            ]).then(function(data) {
                vm.cities = data[0].rows;
            })
        };

        var clearCartWatch = $scope.$watch('vm.cartTableConfig.cartTotal', function(newVal, oldVal) {
            vm.totalCartPriceFormatted = newVal;
            updateTotal();
        });

        var clearCityWatch = $scope.$watch('vm.CityObj.cityId', function(newVal, oldVal) {
            if(newVal && newVal !== oldVal) {
                getDistricts(vm.CityObj.cityId);
            }
        });

        var clearDistrictWatch = $scope.$watch('vm.DistrictObj.districtId', function(newVal, oldVal) {
            if(newVal && newVal !== oldVal) {
                getShipping(vm.CityObj.cityId, vm.DistrictObj.districtId);
            }
        });

        $scope.$on('$destroy', function () {
            clearCartWatch();
            clearCityWatch();
            clearDistrictWatch();
        });

    }
})();
(function() {
    'use strict';
    angular
        .module('YelaAppClient.CartApp')
        .run(runFunction);
        runFunction.$inject = ['$templateCache'];
        function runFunction($templateCache) {
            $templateCache.put('cartCheckout.html',
                `   
                <section id="cart_items" class="cart-wrapper">
                    <div class="container">
                        <div class="breadcrumbs">
                            <ol class="breadcrumb" style="margin-bottom: 2rem">
                            <li><a href="#">{{ 'home' | i18next }}</a></li>
                            <li class="active">{{ 'cart' | i18next }}</li>
                            </ol>
                        </div>

                        <div ng-if="false" class="register-req" style="margin-top: -20px">
                            <p>{{ 'noActiveMsg' | i18next }}</p>
                        </div><!--/register-req-->

                        <cart-table config="vm.cartTableConfig" cart-data="vm.cartData"></cart-table>

                    </div>
                </section> <!--/#cart_items-->
            
                <section id="do_action" class="cart-wrapper">
                    <div class="container">
                        <div class="heading">
                            <h3>{{ 'checkShipPrice' | i18next }}</h3>
                            <p>{{ 'checkShipPriceMsg' | i18next }}</p>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="chose_area">
                                    <ul class="user_info">
                                        <li class="single_field">
                                            <label>{{ 'city' | i18next }}:</label>
                                            <select 
                                                ng-options="option.city for option in vm.cities track by option.cityId" 
                                                ng-model="vm.CityObj">
                                            </select>
                                            
                                        </li>
                                        <li class="single_field">
                                            <label>{{ 'township' | i18next }}:</label>
                                            <select
                                                ng-options="option.district for option in vm.districts track by option.districtId" 
                                                ng-model="vm.DistrictObj">
                                            </select>
                                        
                                        </li>
                                        <li class="single_field zip-field">
                                            <label>{{ 'priceMoney' | i18next }}:</label>
                                            <input type="text" value="{{ vm.getShipCost() }}" ng-disabled="true">
                                        </li>
                                    </ul>
                                    <!--<a class="btn btn-default update" href="">Kiểm Tra</a> -->
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="total_area">
                                    <ul>
                                        <li>{{ 'totalCart' | i18next }} <span>{{ vm.totalCartPriceFormatted }}</span></li>
                                        <!--<li>{{ 'shipPrice' | i18next }} <span>{{ vm.getShipCost() }}</span></li>-->
                                        <li>{{ 'totalMoney' | i18next }} <span>{{ vm.total }}</span></li>
                                    </ul>
                                        <a ng-disabled="vm.isCheckOutValid()" ng-click="vm.goToCheckoutPage()" class="btn btn-default update">Thanh Toán</a>
                                        <!-- <a class="btn btn-default check_out" href=""></a> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </section><!--/#do_action-->

                `
            );
        };
})();
(function() {
    'use strict';
    angular
        .module('YelaAppClient.CartApp')
        .run(runFunction);
        runFunction.$inject = ['$templateCache'];
        function runFunction($templateCache) {
            $templateCache.put('checkout.html',
                `   
                <section id="cart_items" class="cart-wrapper">
                    <div class="container">
                        <div class="breadcrumbs">
                            <ol class="breadcrumb">
                            <li><a href="#">Trang Chủ</a></li>
                            <li class="active">Giỏ Hàng</li>
                            </ol>
                        </div>

                        <div class="register-req" style="margin-top: -20px">
                        <p>Please use Register And Checkout to easily get access to your order history, or use Checkout as Guest</p>
                    </div><!--/register-req-->
        
                    <div class="shopper-informations">
                        <div class="row">
                            <div class="col-sm-3">
                                <div class="shopper-info">
                                    <p>Thông Tin Thanh Toán</p>
                                    <form>
                                        <input type="text" placeholder="*Họ và Tên">
                                        <input type="text" placeholder="Số điện thoại 1">
                                        <input type="text" placeholder="Số điện thoại 2">
                                        <input type="email" placeholder="Địa chỉ mail">
                                        <select class="cart-select">
                                            <option>-- Thành Phố --</option>
                                            <option>United States</option>
                                            <option>Bangladesh</option>
                                            <option>UK</option>
                                            <option>India</option>
                                            <option>Pakistan</option>
                                            <option>Ucrane</option>
                                            <option>Canada</option>
                                            <option>Dubai</option>
                                        </select>
                                        <select class="cart-select">
                                            <option>-- Quận/Huyện --</option>
                                            <option>United States</option>
                                            <option>Bangladesh</option>
                                            <option>UK</option>
                                            <option>India</option>
                                            <option>Pakistan</option>
                                            <option>Ucrane</option>
                                            <option>Canada</option>
                                            <option>Dubai</option>
                                        </select>
                                        <input type="text" placeholder="Địa Chỉ">
                                    </form>
                                </div>
                            </div>
                        
                            <div class="col-sm-4">
                                <div class="order-message">
                                    <p>Thông tin Thêm</p>
                                    <textarea name="message"  placeholder="Ghi chú về đơn hàng. Ví dụ: lưu ý khi giao hàng" rows="16"></textarea>
                                </div>	
                            </div>			
                            
                            <div class="col-sm-5">
                                <div class="order-message">
                                    <p>Ship Và Trả Tiền Mặt Khi Nhận Hàng</p>
                                    <textarea ng-disabled="true" name="message" rows="16">Cám ơn Quý khách đã đặt hàng từ FoodTech, xin vui lòng hoàn tất bước tiếp theo để xác nhận đơn hàng. Chúng tôi sẽ gửi đơn đặt hàng điện tử tới hòm thư email của Quý khách khi đơn hàng được đặt thành công!
                                    </textarea>
                                </div>
                                <a class="btn btn-primary" style="float: right">Đặt Hàng</a>
                            </div>
                        </div>
                    </div>
                    <div class="review-payment">
                        <h2>Đơn Hàng Của Bạn</h2>
                    </div>

                    <cart-table config="vm.cartTableCheckoutConfig" cart-data="vm.cartData"></cart-table>

                    </div>
                </section> <!--/#cart_items-->
                `
            );
        };
})();
(function() {
    'use strict';
    angular
        .module('YelaAppClient.CartApp')
        .run(runFunction);
        runFunction.$inject = ['$templateCache'];
        function runFunction($templateCache) {
            $templateCache.put('checkoutPage.html',
                `   
                    <div ng-if="!vm.isHaveProductInCart() && !vm.isCheckoutSuccess()" ng-include="'checkoutPageNoProduct.html'"></div>
                    <div ng-if="vm.isHaveProductInCart() && !vm.isCheckoutSuccess()" ng-include="'checkoutPageHaveProduct.html'"></div>
                    <div ng-if="vm.isCheckoutSuccess()" ng-include="'checkoutSuccessPage.html'"></div>
                `
            );
        };
})();

(function() {
    'use strict';
    angular
        .module('YelaAppClient.CartApp')
        .run(runFunction);
        runFunction.$inject = ['$templateCache'];
        function runFunction($templateCache) {
            $templateCache.put('checkoutPageNoProduct.html',
                `   
                <section id="cart_items" class="cart-wrapper">
                    <div class="container">
                        <div class="breadcrumbs">
                            <ol class="breadcrumb">
                            <li><a href="#">Trang Chủ</a></li>
                            <li class="active">Thanh Toán</li>
                            </ol>
                        </div>

                        <div class="register-req" style="margin-top: -20px">
                        <p>Hiện tại bạn chưa có sản phẩm nào trong giỏ hàng. Vui lòng chọn sản phẩm trước khi thanh toán giúp chúng mình nhé.</p>
                    </div><!--/register-req-->
                </section> <!--/#cart_items-->
                `
            );
        };
})();

(function() {
    'use strict';
    angular
        .module('YelaAppClient.CartApp')
        .run(runFunction);
        runFunction.$inject = ['$templateCache'];
        function runFunction($templateCache) {
            $templateCache.put('checkoutSuccessPage.html',
                `   
                <section id="cart_items" class="cart-wrapper">
                    <div class="container">
                        <div class="breadcrumbs">
                            <ol class="breadcrumb">
                            <li><a href="#">Trang Chủ</a></li>
                            <li class="active">Thanh Toán</li>
                            </ol>
                        </div>

                        <div style="text-align: center; margin-bottom: 3rem">
                            <h3 style="color: #696763">Xác nhận đơn hàng thành công!</h3>
                            <h4 style="color: #696763">Cám ơn bạn đã cho chúng tôi cơ hội để phục vụ</h4>
                        </div>

                        <div class="register-req" style="margin-top: -20px">
                            <h5>Mã đơn hàng của bạn: <i>{{ vm.billInfoSuccess.billId }}</i></h5>
                            <p>Cám ơn bạn đã đặt hàng tại quán ăn của chúng tôi. Trong vòng 5 phút nhân viên của FoodTech gọi điện hoặc nhắn tin để xác nhận đơn hàng của bạn.</p>
                            <div class="row" style="padding-top: 2rem">
                                <div class="col-sm-6">
                                    <label>Thông tin giao hàng</label>
                                    <div class="total_area">
                                        <ul style="padding-left: inherit">
                                            <li>Khách hàng: <span>{{ vm.billInfoSuccess.customerName }}</span></li>
                                            <li>Địa chỉ: <span>{{ vm.billInfoSuccess.address }}</span></li>
                                            <li>SĐT 1: <span>{{ vm.billInfoSuccess.phoneOne }}</span></li>
                                            <li>SĐT 2: <span>{{ vm.billInfoSuccess.phoneTwo }}</span></li>
                                        </ul>
                                    </div>
                                    <label>Sản phẩm đã đặt</label>
                                    <div class="total_area">
                                        <ul style="padding-left: inherit">
                                            <li ng-repeat="food in vm.billInfoSuccess.itemsObject.foods">{{ food.name }} <span>{{ vm.formatMoney(food.price) }}</span></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <label>Tóm tắt đơn hàng</label>
                                    <div class="total_area">
                                        <ul style="padding-left: inherit">
                                            <li>Ngày đặt: <span>{{ vm.billInfoSuccess.orderDate }}</span></li>
                                            <li>Giá tiền sản phẩm: <span>{{ vm.formatMoney(vm.billInfoSuccess.itemsObject.totalPrice) }}</span></li>
                                            <li>Phí giao hàng: <span>{{ vm.formatMoney(vm.billInfoSuccess.itemsObject.shipCost) }}</span></li>
                                            <!--<li>Khuyến mãi: <span>{{ vm.billInfoSuccess.itemsObject }}</span></li>-->
                                            <li>Tổng cộng: <span>{{ vm.formatMoney(vm.billInfoSuccess.itemsObject.totalBill) }}</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                    </div><!--/register-req-->
                </section> <!--/#cart_items-->
                `
            );
        };
})();

(function() {
    'use strict';
    angular
        .module('YelaAppClient.CartApp')
        .run(runFunction);
        runFunction.$inject = ['$templateCache'];
        function runFunction($templateCache) {
            $templateCache.put('checkoutPageHaveProduct.html',
                `   
                <section id="cart_items" class="cart-wrapper">
                    <div class="container">
                        <div class="breadcrumbs">
                            <ol class="breadcrumb">
                            <li><a href="#">Trang Chủ</a></li>
                            <li class="active">Thanh Toán</li>
                            </ol>
                        </div>

                    <div ng-if="!$root.isCustomerLogin()" class="register-req" style="margin-top: -20px">
                        <p>Bạn có thể đăng ký để có thể dể dàng truy cập vào lịch sử đặt hàng của bạn và có thể nhận được nhiều ưu đãi hơn nhé.</p>
                    </div><!--/register-req-->
        
                    <div class="shopper-informations">
                        <div class="row">
                            <div class="col-sm-3">
                                <div class="shopper-info">
                                    <p>Thông Tin Thanh Toán</p>
                                    <form>
                                        <label>{{ '*Họ và Tên' | i18next }}:</label>
                                        <input type="text" ng-model="vm.billInfo.name" autofocus>
                                        <label>{{ '*Số điện thoại 1' | i18next }}:</label>
                                        <input type="text" ng-model="vm.billInfo.phoneOne">
                                        <label>{{ 'Số điện thoại 2' | i18next }}:</label>
                                        <input type="text" ng-model="vm.billInfo.phoneTwo">
                                        <label>{{ 'Email' | i18next }}:</label>
                                        <input type="email" ng-model="vm.billInfo.email">
                                        <label>{{ '*Thành Phố' | i18next }}:</label>
                                        <select
                                            class="cart-select"
                                            ng-options="option.city for option in vm.cities track by option.cityId" 
                                            ng-model="vm.billInfo.contry"
                                            ng-change="vm.onCityChange()">
                                        </select>
                                        <label>{{ '*Quận/Huyện' | i18next }}:</label>
                                        <select
                                        class="cart-select"
                                            ng-options="option.district for option in vm.districts track by option.districtId" 
                                            ng-model="vm.billInfo.region"
                                            ng-change="vm.onDistrictChange()">
                                        </select>
                                        <label>{{ '*Địa Chỉ' | i18next }}:</label>
                                        <input type="text" ng-model="vm.billInfo.address">
                                    </form>
                                </div>
                            </div>
                        
                            <div class="col-sm-4">
                                <div class="order-message">
                                    <p>Thông tin Thêm</p>
                                    <label>{{ 'Ghi chú về đơn hàng' | i18next }}:</label>
                                    <textarea name="message" style="height: 490px" ng-model="vm.billInfo.description" placeholder="Ví dụ: lưu ý khi giao hàng" rows="16"></textarea>
                                </div>	
                            </div>			
                            
                            <div class="col-sm-5">
                                <div class="order-message">
                                    <p>Ship Và Trả Tiền Mặt Khi Nhận Hàng</p>
                                    <textarea ng-disabled="true" style="height: 515px" name="message" rows="16">Cám ơn Quý khách đã đặt hàng từ FoodTech, xin vui lòng hoàn tất bước tiếp theo để xác nhận đơn hàng. Chúng tôi sẽ gửi đơn đặt hàng điện tử tới hòm thư email của Quý khách khi đơn hàng được đặt thành công!
                                    </textarea>
                                </div>
                                <a class="btn btn-primary" ng-click="vm.onCheckOut()" style="float: right">Đặt Hàng</a>
                            </div>
                        </div>
                    </div>
                    <div class="review-payment">
                        <h2>Đơn Hàng Của Bạn</h2>
                    </div>

                    <cart-table config="vm.cartTableCheckoutConfig" cart-data="vm.cartData"></cart-table>

                    </div>
                </section> <!--/#cart_items-->
                `
            );
        };
})();
(function() {
    'use strict';

    angular
        .module('YelaAppClient.CartApp')
        .controller('CheckoutController', ControllerController);

    ControllerController.$inject = ['CartService', 'clientConstant', '$rootScope', '$scope', '$q', 'toastr', '$interval'];
    function ControllerController(CartService, clientConstant, $rootScope, $scope, $q, toastr, $interval) {
        var vm = this;
        // total cart price
        vm.total = 0;
        vm.shipCost = 0;
        vm.isCheckoutSuccessPage = false;
        vm.cities = [];
        vm.districts = [];
        // config for cart table in checkout page
        vm.cartTableCheckoutConfig = CartService.getCartTableConfig();
        vm.cartTableCheckoutConfig.isView = true;
        vm.cartTableCheckoutConfig.shipCost = vm.shipCost;
        // Bill Info
        vm.billInfo = CartService.getBillInfo();
        vm.billInfoSuccess = CartService.getBillInfoSuccess();

        vm.getShipCost = getShipCost;
        vm.isCheckOutValid = isCheckOutValid;
        vm.goToCheckoutPage = goToCheckoutPage;
        vm.isHaveProductInCart = isHaveProductInCart;
        vm.isCheckoutSuccess = isCheckoutSuccess;
        vm.onCheckOut = onCheckOut;
        vm.formatMoney = formatMoney;
        vm.onCityChange = onCityChange;
        vm.onDistrictChange = onDistrictChange;

        activate();
        ////////////////

        async function activate() { 
            await loadCart();
            vm.totalCartPriceFormatted = vm.cartTableCheckoutConfig.cartTotal;
            updateTotal();
            prepareShipData();
            await loadCustomerData();
        };

        function loadCart() {
            return new Promise((resolve, reject) => {
                vm.cartData = $rootScope.Cart.getProductList();
                resolve(vm.cartData);
            });
        };

        function getDistrictByCity(cityId) {
            return CartService.getDistrictByCity(cityId);
        };

        function getShipping(cityId, districtId) {
            return CartService.getShipping(cityId, districtId);
        };

        function getCities() {
            return CartService.getAllCities();
        };

        function prepareShipData() {
            return $q.all([
                getCities()
            ]).then(function(data) {
                vm.cities = data[0].rows;
            })
        };

        function getCartTotal() {
            return new Promise((resolve, reject) => {
                if(angular.isArray(vm.cartData)) {
                    angular.forEach(vm.cartData, function(product) {
                        vm.totalCartPrice = vm.totalCartPrice + product.price;
                    })
                }
                resolve(vm.totalCartPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}));
            });
        };

        function updateTotal() {
             var total = CartService.getParseCurrencyToNumber(vm.totalCartPriceFormatted) + vm.shipCost;
             vm.total = total.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        };

        function getShipCost() {
            return vm.shipCost ? vm.shipCost.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}) : 'Miễn Phí';
        };
         
        function isCheckOutValid() {
            return CartService.getParseCurrencyToNumber(vm.total) <= 0
        };

        function goToCheckoutPage() {
            vm.cartState.isCartPage = false;
            vm.cartTableCheckoutConfig.shipCost = vm.shipCost;
        };

        function isHaveProductInCart() {
            return angular.isArray(vm.cartData) ? vm.cartData.length > 0 : false;
        }

        function onCheckOut() {
            if(isCanCheckOut()) {
                vm.billInfo.items = {
                    foods: angular.copy(vm.cartData),
                    shipCost: vm.shipCost
                }
                var billParsed = CartService.getParseBillRequest(vm.billInfo);
                CartService.createBill(billParsed).then(function(response) {
                    var data = response.data;
                    if(data) {
                        vm.billInfoSuccess = data;
                        goToCheckOutSuccessPage();
                    }
                }, function(err) {
                    console.log(err);
                }).catch(function(err) {
                    console.log(err);
                })
            } else {
                toastr.error('Giúp chúng mình nhập đầy đủ thông tin ở mục có dấu (*) nhé.');
            }
        }

        function isCanCheckOut() {
            var bill = vm.billInfo;
            var city = bill.contry;
            var district = bill.region;
            return bill.name && bill.phoneOne && bill.address && city.city && district.districtId;
        }

        function goToCheckOutSuccessPage() {
            vm.isCheckoutSuccessPage = true;
        }

        function isCheckoutSuccess() {
            return vm.isCheckoutSuccessPage;
        }

        function formatMoney(number) {
            return number.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        }

        function onCityChange() {
            var city = vm.billInfo.contry;
            vm.billInfo.region = {};
            if(city.cityId) {
                getDistrictByCity(city.cityId)
                    .then(function(districts) {
                        vm.districts = districts;
                    })
            }
        }

        function onDistrictChange() {
            var city = vm.billInfo.contry;
            var district = vm.billInfo.region;
            if(city.cityId && district.districtId) {
                getShipping(city.cityId, district.districtId)
                    .then(function(shipping) {
                        var ship = shipping[0];
                        if(ship){
                            vm.shipCost = ship.cost;
                            vm.cartTableCheckoutConfig.shipCost = ship.cost;
                            
                        } else {
                            vm.shipCost = 0;
                            vm.cartTableCheckoutConfig.shipCost = 0;
                        }
                        updateTotal();
                    })
            }
        }

        function loadCustomerData(){
            return new Promise(function(resolve, reject) {
                var customerToken = window.localStorage.getItem('customerToken');
                if(customerToken) {
                    var stopInterval = $interval(function() {
                        if(angular.isFunction($rootScope.isCustomerLogin) && $rootScope.isCustomerLogin()) {
                            vm.billInfo.name = $rootScope.Customer.getName();
                            vm.billInfo.email = $rootScope.Customer.getEmail();
                            $interval.cancel(stopInterval);
                            stopInterval = undefined;
                        }
                    })
                }
                resolve();
            })
        }

    }
})();
(function () {
    'use strict';

    angular
        .module('YelaAppClient.CartApp')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/checkout', {
                templateUrl: 'checkoutPage.html',
                controller: 'CheckoutController',
                controllerAs: 'vm',
                appId: 'checkout'
            });
        //$locationProvider.html5Mode(true);
    };
})();
(function() {
    'use strict';

    angular.module('YelaAppClient.Login', [
        'ngRoute'
    ]);
})();
(function () {
    'use strict';

    angular
        .module('YelaAppClient.Login')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/login', {
                templateUrl: 'scripts/login/login.template.html',
                controller: 'LoginController',
                controllerAs: 'vm',
                appId: 'login'
            });
        //$locationProvider.html5Mode(true);
    };
})();
(function () {
    'use strict';

    angular
        .module('YelaAppClient.Login')
        .constant('LoginConstant', { 
            google: {
                clientid: '725396331747-p277f82p7vggesl5to9bdbs9f390o6b2.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
                clientPath: 'https://www.googleapis.com/plus/v1/people/me',
                scope: 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
            }

        });
})();
(function() {
    'use strict';

    angular
        .module('YelaAppClient.Login')
        .factory('LoginService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            createCustomer: createCustomer,
            emailAuthentication: emailAuthentication,
            loginCustomer: loginCustomer,
            logout: logout,
            loginGoogleFacebook: loginGoogleFacebook,
            getCustomerByToken: getCustomerByToken,
            helper: {
                parserGGRequest: parserGGRequest,
                parserFFRequest: parserFFRequest,
                parserManualRequest: parserManualRequest,
                parseManualLoginReq: parseManualLoginReq
            }
        };
        
        return service;

        ////////////////
        function parserGGRequest(data) {
            var name = data.name || {};
            var mail = data.emails[0] || {};
            var image = data.image || {};
            return {
                lastName: name.givenName,
                firstName: name.familyName,
                email: mail.value,
                id: data.id,
                avatarLink: image.url,
                loginType: 'google',
                displayName: data.displayName
            }
        }

        function parserFFRequest(data) {
            var pictureData = data.picture || {};
            var picture = pictureData.data || {};
            return {
                lastName: data.last_name,
                firstName: data.first_name,
                email: data.email,
                id: data.id,
                avatarLink: picture.url,
                loginType: 'facebook',
                displayName: data.name
            }   
        }

        function parserManualRequest(data) {
            return {
                lastName: data.lastName,
                firstName: data.firstName,
                email: data.email,
                loginType: 'manual',
                displayName: data.name,
                password: data.password,
                confirmPassword: data.confirmPassword
            }   
        }

        function createCustomer(customer) {
            return $http({
                method: 'POST',
                url: '/api/customer',
                data: customer
            }).then((res) => {
                return res;
            },
            (err) => {
                return err;
            });
        };
    
        function emailAuthentication(emailCustomer) {
            return $http({
                method: 'GET',
                url: '/api/email/authentication',
                params: {
                    email: emailCustomer
                }
            }).then((res) => {
                return res;
            }, (err) => {
                return err;
            });
        };
    
        function loginCustomer(login) {
            return $http({
                method: 'POST',
                url: 'api/customer/login',
                data: login
            }).then((res) => {
                return res;
            }, (err) => {
                return err;
            })
        };
    
        function logout() {
            return $http({
                method: 'GET',
                url: 'api/customer/logout'
            }).then((res) => {
                return res;
            }, (err) => {
                return err;
            });
        };
    
        function loginGoogleFacebook(customer) {
            return $http({
                method: 'POST',
                url: 'api/customer/login/google/facebook',
                data: customer
            }).then((res) => {
                return res;
            }, (err) => {
                return err;
            });
        };

        function getCustomerByToken(token) {
            return $http({
                method: 'GET',
                url: '/api/customer/token',
                params: {
                    token: token
                }
            }).then((res) => {
                return res;
            }, (err) => {
                return err;
            });
        };

        function parseManualLoginReq(data) {
            return {
                email: data.email,
                password: data.password
            }
        }

    }
})();
(function() {
    'use strict';

    angular
        .module('YelaAppClient.Login')
        .controller('LoginController', ControllerController);

    ControllerController.$inject = ['LoginConstant', 'LoginService', 'Customer', '$rootScope', '$location', '$scope', 'toastr'];
    function ControllerController(LoginConstant, LoginService, Customer, $rootScope, $location, $scope, toastr) {
        var vm = this;
        vm.customerSignUp = {};
        vm.customerSignIn = {};
        
        vm.onGoogleLogin = onGoogleLogin;
        vm.onFacebookLogin = onFacebookLogin;
        vm.onSignUp = onSignUp;
        vm.onSignIn = onSignIn;
        vm.backToLoginPage = backToLoginPage;

        activate();

        ////////////////

        function activate() {
            vm.isLoginPage = true;
         }

        function onGoogleLogin(){
            //if ($scope.customerLogined === false) {
                var params = {
                    'clientid': LoginConstant.google.clientid,
                    'cookiepolicy': LoginConstant.google.cookiepolicy,
                    'callback': function (result) {
                        if (result['status']['signed_in']) {
                            window.gapi.client.request({ path: LoginConstant.google.clientPath }).then(
                                function(success) {
                                    var user_info = JSON.parse(success.body);
                                    var requestBody = LoginService.helper.parserGGRequest(user_info);
                                    LoginService.loginGoogleFacebook(requestBody)
                                        .then(function(res) {
                                            if(res.data) {
                                                var cusInfo = res.data.customer;
                                                $rootScope.Customer = new Customer(cusInfo.customerId, cusInfo.token, cusInfo.firstName, cusInfo.lastName, cusInfo.avatarLink, cusInfo.email);
                                                window.localStorage.setItem('customerToken', $rootScope.Customer.getToken());
                                                $location.path('/'); 
                                            }
                                        })
                                },
                                function(error) {
                                    // Error occurred
                                    console.log(error);
                                }
                            );
                        }
                    },
                    'approvalprompt': 'force',
                    'scope': LoginConstant.google.scope
                };
                gapi.auth.signIn(params);
            // } else {
            //     alert('Moi ban dang xuat');
            // }
        }

        function onFacebookLogin() {
            checkFBLoginState();
        }

        function checkFBLoginState() {
            window.FB.getLoginStatus(function(response) {
                statusChangeCallback(response);
              });
        }

        function statusChangeCallback(response) {
            if (response.status === 'connected') {
                facebookAPI();
            } else {
                window.FB.login(function(response) {
                    facebookAPI();
                }, {scope: 'public_profile,email'});
            }
        }

        function facebookAPI() {
        FB.api('/me', {fields: 'name, email, last_name, first_name, picture'}, function(customerInfo) {
            var requestBody = LoginService.helper.parserFFRequest(customerInfo);
            LoginService.loginGoogleFacebook(requestBody)
                .then(function(res) {
                    if(res.data) {
                        var cusInfo = res.data.customer;
                        $rootScope.Customer = new Customer(cusInfo.customerId, cusInfo.token, cusInfo.firstName, cusInfo.lastName, cusInfo.avatarLink, cusInfo.email);
                        window.localStorage.setItem('customerToken', $rootScope.Customer.getToken());
                        $location.path('/'); 
                    }
                })
        });
        }

        function onSignIn() {
            if(vm.customerSignIn.email || vm.customerSignIn.password) {
                var requestBody = LoginService.helper.parseManualLoginReq(vm.customerSignIn);
                LoginService.loginCustomer(requestBody)
                    .then(function(res) {
                        if(res.data && res.data.token) {
                            var cusInfo = res.data.customer;
                            $rootScope.Customer = new Customer(cusInfo.customerId, cusInfo.token, cusInfo.firstName, cusInfo.lastName, cusInfo.avatarLink, cusInfo.email);
                            window.localStorage.setItem('customerToken', $rootScope.Customer.getToken());
                            $location.path('/'); 
                        } else {
                            vm.alertMsg = 'Đăng nhập thất bại';
                            toastr.error(vm.alertMsg);
                        }
                    }).catch(function() {
                        vm.alertMsg = 'Đăng nhập thất bại. Đã xảy ra lỗi khi đăng nhập.';
                        toastr.error(vm.alertMsg);
                    });
            } else {
                vm.alertMsg = 'Vui lòng nhập đầy đủ thông tin email, password.';
                toastr.error(vm.alertMsg);
            }
        }

        function onSignUp() {
            var isCapchaChecked;
            if(window.grecaptcha) {
              isCapchaChecked = window.grecaptcha.getResponse(window.foodtechLoginGReCapcha);   
            };

            if(isValidSignUp(vm.customerSignUp)) {
                if(isPasswordMatched(vm.customerSignUp.password, vm.customerSignUp.confirmPassword)) {
                    if(isCapchaChecked) {
                        var customerRequest = LoginService.helper.parserManualRequest(vm.customerSignUp);
                        LoginService.createCustomer(customerRequest)
                            .then(function(response) {
                                var data = response.data || {};
                                var customer = data.customer;
                                if(data.success && customer.status === 'pending'){
                                    vm.isLoginPage = false;
                                } else {
                                    if(data.isExistEmail) {
                                        vm.alertMsg = 'Email này đã được đăng ký, bạn có thử đăng ký với email khác hoặc đăng nhập bằng Google hoặc Facebook.';
                                        toastr.error(vm.alertMsg);
                                    } else {
                                        vm.alertMsg = 'Đã có lỗi xảy ra trong quá trình đăng ký, bạn đăng ký lại giúp chúng mình nhé.';
                                        toastr.error(vm.alertMsg);
                                    }
                                }
                            })
                    } else {
                        vm.alertMsg = 'Bạn vui lòng chọn mục capcha để chúng tôi biết bạn không phải là người máy nhé.';
                        toastr.error(vm.alertMsg);
                    }
                } else {
                    vm.alertMsg = 'Mật khẩu và xác nhận mật khẩu của bạn không đúng kìa.';
                    toastr.error(vm.alertMsg);
                }
            } else {
                vm.alertMsg = 'Bạn vui lòng nhập đầy đủ thông tin giúp chúng mình nhé.';
                toastr.error(vm.alertMsg);
            }
        }

        function isValidSignUp(data) {
            return data.lastName && data.firstName && data.email && data.password && data.confirmPassword;
        }

        function isPasswordMatched(pass, confirmPass) {
            return pass === confirmPass;
        }

        function backToLoginPage() {
            vm.customerSignUp = {};
            vm.isLoginPage = true;
        }

    }
})();
(function() {
    'use strict';

    angular.module('YelaAppClient.Contact', [
        'ngRoute'
    ]);
})();
(function() {
    'use strict';

    angular
        .module('YelaAppClient.Contact')
        .factory('ContactService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            submitLetter: submitLetter,
            getLetterRequest: getLetterRequest
        };
        
        return service;

        ////////////////
        function submitLetter(data) {
            return $http({
                url: '/api/letter',
                method: 'POST',
                data: data
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function getLetterRequest(letter) {
            var requestBody =  {
                name: letter.name || '',
                phone: letter.phone || '',
                email: letter.email || '',
                message: letter.message || ''
            };
            return requestBody;
        };
    }
})();
(function() {
    'use strict';
    angular
        .module('YelaAppClient.Contact')
        .run(runFunction);
        runFunction.$inject = ['$templateCache'];
        function runFunction($templateCache) {
            $templateCache.put('contact.html',
                `               
                <div id="contact-page" class="container">
                    <div class="bg">
                        <!--<div class="row">    		
                            <div class="col-sm-12">    			   			
                                <h2 class="title text-center">Liên Hệ</h2>   			    				    				
                                <div id="map" class="contact-map" style="height: 400px !important">
                                </div>
                            </div>			 		
                        </div>-->    	
                        <div class="row">  	
                            <div class="col-sm-8">
                                <div class="contact-form">
                                    <h2 class="title text-center">Để Lại Lời Nhắn Cho Chúng Tôi</h2>
                                    <div ng-if="vm.alertSuccess" class="status alert alert-success"> {{ vm.alertMsg }} </div>
                                    <div ng-if="vm.alertFail" class="status alert alert-danger"> {{ vm.alertMsg }} </div>
                                    <form id="main-contact-form" class="contact-form row" name="contact-form" method="post">
                                        <div class="form-group col-md-6">
                                            <input type="email" name="email" class="form-control" required="required" ng-model="vm.letter.email" placeholder="* Email">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <input type="text" name="phone" class="form-control" ng-model="vm.letter.phone" placeholder="Số điện thoai">
                                        </div>
                                        <div class="form-group col-md-12">
                                            <input type="text" name="subject" class="form-control" required="required" ng-model="vm.letter.name" placeholder="* Họ Tên">
                                        </div>
                                        <div class="form-group col-md-12">
                                            <textarea name="message" id="message" required="required" class="form-control" rows="8" ng-model="vm.letter.message" placeholder="* Nhập lời nhắn của bạn"></textarea>
                                        </div>       
                                        <div class="form-group col-md-12">
                                            <div id="g-recapcha"></div> 
                                        </div>            
                                        <div class="form-group col-md-12">
                                            <input type="submit" name="submit" class="btn btn-primary pull-right" ng-disabled="vm.canNotSubmit()" ng-click="vm.submitLetter()" value="Gửi">
                                        </div>
                                    </form>
                                </div>
                            </div>  
                            <div class="col-sm-4" style="text-align: left">
                                <div class="contact-info">
                                    <h2 class="title text-center">Thông Tin Liên Hệ</h2>
                                    <address>
                                        <p>Điện thoại: 0933800024</p>
                                        </br>
                                        <p>Địa chỉ: 11/3, Đường ĐHT 19, KP 1, Phường Đông Hưng Thuận, Quận 12, TP Hồ Chí Minh</p>
                                        </br>
                                        <p>Email: foodtechshopvn@gmail.com</p>
                                    </address>
                                    <div class="social-networks">
                                        <h2 class="title text-center">Mạng Xã Hội</h2>
                                        <ul>
                                            <li>
                                                <a href="https://www.facebook.com/foodtechshop" target="_blank"><i class="fa fa-facebook"></i></a>
                                            </li>
                                            <li>
                                                <a href="https://www.instagram.com/foodtechshop.vn" target="_blank"><i class="fa fa-instagram"></i></a>
                                            </li>
                                            <li>
                                                <a href="https://shopee.vn/foodtechshop" target="_blank"><i class="fa fa-shopping-bag"></i></a>
                                            </li>
                                            <li>
                                                <a href="https://www.youtube.com/channel/UCqseyN1QBcrjBTo5W01Mcjw" target="_blank"><i class="fa fa-youtube"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>    			
                            <div class="col-md-12">
                            <div id="g-recapcha"> 
                        </div>  
                        <div>
                            <h2 class="title text-center">Bản Đồ</h2>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.5133002287935!2d106.63502221474963!3d10.848508992272633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529538fc2d845%3A0xb2417d39b6a0d6d2!2zRm9vZFRlY2hTaG9wIC0gTcOsIFThu49pICYgQ8ahbSBWw7I!5e0!3m2!1sen!2s!4v1565451551532!5m2!1sen!2s" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
                        </div>
                            </div>
                        </div>  
                    </div>	
                </div><!--/#contact-page-->
                <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit"
                    async defer>
                </script>
                <script type="text/javascript">
                    var onloadCallback = function() {
                        window.foodtechGReCapcha = grecaptcha.render('g-recapcha', {
                        'sitekey' : '6LcDoY8UAAAAAOPbEpQPnOefbqbDtOe-5pg0eGbD'
                        });
                    };
                </script>
                `
            );
        };
    /* <script>
    var map;
    function initMap() {
        setTimeout(function() {
            map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 10.848469, 
                lng: 106.637527
            },
            zoom: 8
            });
        }, 500);
    }
    </script>
    <script defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAlwdeQyEcDwuDVui9r8z3-TQ51LO8pU-U&callback=initMap"></script> */
})();
(function () {
    'use strict';

    angular
        .module('YelaAppClient.Contact')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/contact', {
                templateUrl: 'contact.html',
                controller: 'ContactController',
                controllerAs: 'vm',
                appId: 'contact'
            });
        //$locationProvider.html5Mode(true);
    };
})();
(function() {
    'use strict';

    angular
        .module('YelaAppClient.Contact')
        .controller('ContactController', ControllerController);

    ControllerController.$inject = ['clientConstant', '$location', 'ContactService'];
    function ControllerController(clientConstant, $location, ContactService) {
        var vm = this;
        vm.letter = {};
        vm.alertSuccess = false;
        vm.alertFail = false;
        vm.alertMsg = '';
        vm.submitLetter = submitLetter;
        vm.canNotSubmit = canNotSubmit;

        activate();

        ////////////////
        function activate() { 

        };

        function submitLetter() {
            var isCapchaChecked;
            if(window.grecaptcha) {
              isCapchaChecked = window.grecaptcha.getResponse(window.foodtechGReCapcha);   
            };
            if(isCapchaChecked) {
                var reqBody = ContactService.getLetterRequest(vm.letter);
                ContactService.submitLetter(reqBody)
                    .then(function(res) {
                        var data = res.data;
                        if(data.success) {
                            vm.alertMsg = data.message;
                            vm.alertSuccess = true;
                            vm.alertFail = false;
                            vm.letter = {};
                        } else {
                            vm.alertMsg = data.message;
                            vm.alertSuccess = false;
                            vm.alertFail = true;
                        }
                    }).catch(function(err) {
                        vm.alertMsg = 'Đã có lỗi xảy ra trong quá trình gửi lời nhắn.';
                        vm.alertSuccess = false;
                        vm.alertFail = true;
                    });
            } else {
                vm.alertMsg = 'Vui lòng xác nhận bạn không phải là người máy tiếp tục gửi lời nhắn nhé. Điều này sẽ giúp chúng tôi ngăn chặn việc spam tin nhắn.';
                vm.alertSuccess = false;
                vm.alertFail = true;
            }
        };

        function canNotSubmit() {
          return !(vm.letter.name && vm.letter.email && vm.letter.message);  
        };

    }
})();
(function() {
    'use strict';

    angular.module('YelaAppClient.Blog', [
        'ngRoute'
    ]);
})();
(function() {
    'use strict';

    angular
        .module('YelaAppClient.Blog')
        .factory('BlogService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            getBlogs: getBlogs,
            getBlogsByType: getBlogsByType
        };
        
        return service;

        ////////////////

        function getBlogs(offset, limit) {
            return $http({
                url: '/api/blog/bypaging',
                method: 'GET',
                params: {
                    offset: offset,
                    limit: limit
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function getBlogsByType(type, offset, limit) {
            return $http({
                url: '/api/blog/type',
                method: 'GET',
                params: {
                    offset: offset,
                    limit: limit,
                    type: type
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

    }
})();
(function() {
    'use strict';
    angular
        .module('YelaAppClient.Blog')
        .run(runFunction);
        runFunction.$inject = ['$templateCache'];
        function runFunction($templateCache) {
            $templateCache.put('blogs.html',
                `   
                <section>
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-3">
                                <div class="left-sidebar">
                                    <div class="brands_products"><!--brands_products-->
                                        <h2>{{ 'topic' | i18next }}</h2>
                                        <div class="brands-name">
                                            <ul class="nav nav-pills nav-stacked">
                                                <li><a href="" ng-click="vm.goToBlogsByType('food')">Món Ăn</a></li>
                                                <li><a href="" ng-click="vm.goToBlogsByType('nutrition')">Dinh Dưỡng</a></li>
                                                <li><a href="" ng-click="vm.goToBlogsByType('lowcarb')">LowCarb</a></li>
                                                <li><a href="" ng-click="vm.goToBlogsByType('discover')">Khám Phá</a></li>
                                            </ul>
                                        </div>
                                    </div><!--/brands_products-->
                                    
                                    <!--<div class="shipping text-center">
                                        <img src="images/home/banner.png" alt="" on-error-src="{{ $root.notFoundImg }}"/>
                                    </div>-->
                                </div>
                            </div>

                            <div class="col-sm-9">
                                <div ng-if="vm.isLoading">
                                    <div class="foodtech-loader"></div>
                                    <div class="foodtech-loader-backdrop"></div>
                                </div>
                                <div ng-if="!vm.isLoading" class="blog-post-area" style="text-align: -webkit-auto">
                                    <h2 class="title text-center">{{ 'newPost' | i18next }}</h2>

                                    <div class="single-blog-post advance" ng-repeat="blog in vm.blogs">
                                        <div class="post-meta">
                                            <ul>
                                                <li><i class="fa fa-user"></i> FoodTech</li>
                                                <li><i class="fa fa-calendar"></i> {{ vm.getFormatDate(blog.createdAt) }}</li>
                                            </ul>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <a href="">
                                                    <img ng-src="{{blog.imageLink}}" alt="Hình Ảnh" on-error-src="{{ $root.notFoundImg }}">
                                                </a>
                                            </div>
                                            <div class="col-sm-9">
                                                <h4>{{ blog.title }}</h4>
                                                <p>{{ blog.summary }}</p>
                                                <a  class="btn btn-primary" ng-click="vm.readMore(blog)" >Đọc Thêm</a>
                                            </div>
                                        </div>
                                    </div>
    
                                    <div class="pagination-area" ng-if="vm.pageArray.length > 0">
                                        <ul class="pagination">
                                            <li ng-class="{disabled:vm.pageTotal === 1}">
                                                <a ng-click="vm.changePage(0, vm.paging.limit, 1)"><i class="fa fa-angle-double-left"></i></a>
                                            </li>
                                            <li ng-repeat="page in vm.pageArray">
                                                <a ng-click="vm.changePage(page.offset, page.limit, page.page)" ng-class="{active:page.page === vm.currentPage}"> {{ page.page }} </a>
                                            </li>
                                            <li ng-class="{disabled:vm.pageTotal === 1}">
                                                <a ng-click="vm.changePage((vm.pageTotal  - 1) * vm.paging.limit, vm.paging.limit, vm.pageTotal)"><i class="fa fa-angle-double-right"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                `
            );
        };
})();
(function () {
    'use strict';

    angular
        .module('YelaAppClient.Blog')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/blogs', {
                templateUrl: 'blogs.html',
                controller: 'BlogController',
                controllerAs: 'vm',
                appId: 'blogs'
            })
            .when('/blogs/:id', {
                templateUrl: 'blogs.html',
                controller: 'BlogController',
                controllerAs: 'vm',
                appId: 'blogs'
            });
        //$locationProvider.html5Mode(true);
    };
})();
(function() {
    'use strict';

    angular
        .module('YelaAppClient.Blog')
        .controller('BlogController', ControllerController);

    ControllerController.$inject = ['BlogService', '$route', 'clientConstant', '$location'];
    function ControllerController(BlogService, $route, clientConstant, $location) {
        var vm = this;
        let blogType = $route.current.params.id;
        vm.blogs = [];
        vm.pageArray = [];
        vm.readMore = readMore;
        vm.getFormatDate = getFormatDate;
        vm.goToBlogsByType = goToBlogsByType;
        vm.changePage = changePage;
        vm.paging = {
            offset: 0,
            limit: 6
        };

        activate();
        ////////////////

        async function activate() { 
            if(blogType) {
                await loadBlogsByType(blogType, vm.paging.offset, vm.paging.limit, true);
            } else {
                await loadBlogs(vm.paging.offset, vm.paging.limit, true);
            }
        };

        function loadBlogs(offset, limit, isNew) {
            vm.isLoading = true;
            return new Promise((resolve, reject) => {
                BlogService.getBlogs(offset, limit)
                    .then(function (response) {
                        var data = response.data;
                        vm.blogs = data.blogs;
                        if(isNew) {
                            setPage(data.count, vm.blogs.length, vm.paging.limit)  
                        }
                        vm.isLoading = false;
                        resolve(vm.blogs);
                    }).catch(function (err) {
                        console.log(err);
                        vm.isLoading = false;
                        reject(err);
                    });
            });
        };

        function loadBlogsByType(type, offset, limit, isNew) {
            vm.isLoading = true;
            return new Promise((resolve, reject) => {
                BlogService.getBlogsByType(type, offset, limit)
                    .then(function (response) {
                        var data = response.data;
                        vm.blogs = data.rows;
                        if(isNew) {
                            setPage(data.count, vm.blogs.length, vm.paging.limit)  
                        }
                        vm.isLoading = false;
                        resolve(vm.blogs);
                    }).catch(function (err) {
                        vm.isLoading = false;
                        reject(err);
                    });
            });
        };

        function getFormatDate(dateString) {
            if(dateString) {
                var date = new Date(dateString);
                return date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear();
            }
            return dateString;
        };

        function readMore(blog) {
            if(blog) {
                if(blog.urlKey) {
                    $location.path(`/blog/${blog.urlKey}`);
                } else {
                    $location.path(`/blog/${blog.blogId}`);
                }
            }
        };

        function goToBlogsByType(type) {
            $location.path(`/blogs/${type}`);
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

    }
})();
(function() {
    'use strict';

    angular.module('YelaAppClient.FormFoods', [
        'ngRoute'
    ]);
})();
(function() {
    'use strict';

    angular
        .module('YelaAppClient.FormFoods')
        .factory('FormFoodsService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            getMainFoods: getMainFoods
        };
        
        return service;

        ////////////////
        function getMainFoods(offset, limit, form) {
            return $http({
                url: '/api/product/form',
                method: 'GET',
                params: {
                    offset: offset,
                    limit: limit,
                    form: form
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };
    }
})();
(function() {
    'use strict';
    angular
        .module('YelaAppClient.FormFoods')
        .run(runFunction);
        runFunction.$inject = ['$templateCache'];
        function runFunction($templateCache) {
            $templateCache.put('formFoods.html',
                `               
                    <section>
                        <div class="container">
                            <div class="row">
                                <div class="col-sm-3">
                                    <sidebar brand-data="vm.brands" category-data="vm.categories"></sidebar>
                                </div>
                                <div class="col-sm-9 padding-right">
                                    <div class="features_items">
                                        <div ng-if="vm.isLoading">
                                            <div class="foodtech-loader"></div>
                                            <div class="foodtech-loader-backdrop"></div>
                                        </div>
						                <h2 class="title text-center">{{ 'foods' | i18next }}</h2>
                                        <product-item ng-repeat="data in vm.products" data="data" config="vm.productItemConfig" ></product-item>
                                    </div>
                                    <div ng-show="!vm.isLoading" class="pagination-area">
                                        <ul class="pagination">
                                            <li ng-class="{disabled:vm.pageTotal === 1}">
                                                <a ng-click="vm.changePage(0, vm.Product.limit, 1)"><i class="fa fa-angle-double-left"></i></a>
                                            </li>
                                            <li ng-repeat="page in vm.pageArray">
                                                <a ng-click="vm.changePage(page.offset, page.limit, page.page)" ng-class="{active:page.page === vm.currentPage}"> {{ page.page }} </a>
                                            </li>
                                            <li ng-class="{disabled:vm.pageTotal === 1}">
                                                <a ng-click="vm.changePage((vm.pageTotal  - 1) * vm.Product.limit, vm.Product.limit, vm.pageTotal)"><i class="fa fa-angle-double-right"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                `
            );
        };
})();
(function () {
    'use strict';

    angular
        .module('YelaAppClient.FormFoods')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/formfoods/:formId', {
                templateUrl: 'formFoods.html',
                controller: 'FormFoodsController',
                controllerAs: 'vm',
                appId: 'formfoods'
            });
        //$locationProvider.html5Mode(true);
    };
})();
(function() {
    'use strict';

    angular
        .module('YelaAppClient.FormFoods')
        .controller('FormFoodsController', ControllerController);

    ControllerController.$inject = ['ShopService', 'clientConstant', '$location', 'FormFoodsService', '$route'];
    function ControllerController(ShopService, clientConstant, $location, FormFoodsService, $route) {
        var vm = this;
        var foodForm = $route.current.params.formId;
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
            await loadFoods(vm.Product.offset, vm.Product.limit, true);
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

        function loadFoods(offset, limit, isLoadNew) {
            vm.isLoading = true;
            return new Promise((resolve, reject) => {
                FormFoodsService.getMainFoods(offset, limit, foodForm)
                    .then(function (products) {
                        vm.products = products.data.rows;
                        if (isLoadNew) {
                            setPage(products.data.count, products.data.rows.length, vm.Product.limit)  
                        };
                        vm.isLoading = false;
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
                await loadFoods(offset, limit);
            };
        };
    }
})();
(function() {
    'use strict';

    angular.module('YelaAppClient.Searching', [
        'ngRoute'
    ]);
})();
(function() {
    'use strict';

    angular
        .module('YelaAppClient.Searching')
        .factory('SearchingService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            getProductByKey: getProductByKey
        };
        
        return service;

        ////////////////

        function getProductByKey(key) {
            return $http({
                url: '/api/product/search',
                method: 'GET',
                params: {
                    key: key
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

    }
})();
(function() {
    'use strict';
    angular
        .module('YelaAppClient.Searching')
        .run(runFunction);
        runFunction.$inject = ['$templateCache'];
        function runFunction($templateCache) {
            $templateCache.put('searching.html',
                `   
                <section>
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-3">
                                <sidebar brand-data="vm.brands" category-data="vm.categories"></sidebar>
                            </div>
                            <div class="col-sm-9">
                                <div ng-if="vm.isLoading">
                                    <div class="foodtech-loader"></div>
                                    <div class="foodtech-loader-backdrop"></div>
                                </div>
                                <div ng-if="!vm.isLoading" class="blog-post-area" style="text-align: -webkit-auto">
                                    <h2 class="title text-center">{{ 'searchResult' | i18next }}</h2>
                                    <section id="cart_items" class="cart-wrapper">               
                                        <div ng-if="!vm.hasProduct()" class="register-req" style="margin-top: -20px">
                                            <p>Không tìm thấy kết quả cho từ khóa <b>"{{ ::$root.searchValue }}"</b>. Vui lòng tìm kiếm lại với từ khóa khác hoặc quay về trang chủ.</p>
                                        </div><!--/register-req-->
                                        <product-item ng-if="vm.hasProduct()" ng-repeat="data in vm.products" data="data" config="vm.productItemConfig" ></product-item>
                                    </section> <!--/#cart_items-->
                                </div>
                            </div>    
                        </div>
                    </div>
                </section>
                `
            );
        };
})();
(function () {
    'use strict';

    angular
        .module('YelaAppClient.Searching')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/searching/:key', {
                templateUrl: 'searching.html',
                controller: 'SearchingController',
                controllerAs: 'vm'
            });
        //$locationProvider.html5Mode(true);
    };
})();
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
(function() {
    'use strict';

    angular.module('YelaAppClient.Wishlist', [
        'ngRoute'
    ]);
})();
(function() {
    'use strict';

    angular
        .module('YelaAppClient.Wishlist')
        .factory('WishlistService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {
            getWishList: getWishList,
            addProductToWishlist: addProductToWishlist,
            removeProductFromWishlist: removeProductFromWishlist
        };
        
        return service;

        ////////////////
        function getWishList(customerId) {
            return $http({
                url: '/api/wishlist',
                method: 'GET',
                params: {
                    customerId: customerId
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function addProductToWishlist(customerId, productItem) {
            return $http({
                url: '/api/wishlist',
                method: 'POST',
                data: {
                    customerId: customerId,
                    productItem: productItem
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function removeProductFromWishlist(customerId, productItem) {
            return $http({
                url: '/api/wishlist/delete',
                method: 'POST',
                data: {
                    customerId: customerId,
                    productItem: productItem
                }
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };
    }
})();
(function() {
    'use strict';
    angular
        .module('YelaAppClient.Wishlist')
        .run(runFunction);
        runFunction.$inject = ['$templateCache'];
        function runFunction($templateCache) {
            $templateCache.put('wishlist.html',
                `               
                    <section>
                        <div class="container">
                            <div class="row">
                                <div class="col-sm-12 padding-right">
                                    <div class="features_items">
                                        <div ng-if="vm.isLoading">
                                            <div class="foodtech-loader"></div>
                                            <div class="foodtech-loader-backdrop"></div>
                                        </div>
						                <h2 class="title text-center">{{ 'productWishlist' | i18next }}</h2>
                                        <product-item ng-if="vm.hasProduct()" ng-repeat="data in vm.products" data="data" config="vm.productItemConfig" ></product-item>
                                        <div ng-if="!vm.hasProduct()" class="register-req" style="margin-top: -20px">
                                            <p>Hiện tại bạn chưa có sản phẩm nào trong danh sách yêu thích.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                `
            );
        };
})();
(function () {
    'use strict';

    angular
        .module('YelaAppClient.Wishlist')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/wishlist', {
                templateUrl: 'wishlist.html',
                controller: 'WishlistController',
                controllerAs: 'vm',
                appId: 'wishlist'
            });
        //$locationProvider.html5Mode(true);
    };
})();
(function() {
    'use strict';

    angular
        .module('YelaAppClient.Wishlist')
        .controller('WishlistController', ControllerController);

    ControllerController.$inject = ['WishlistService', '$rootScope', '$location'];
    function ControllerController(WishlistService, $rootScope, $location) {
        var vm = this;
        $rootScope.loadWishlist = loadWishlist;
        vm.productItemConfig = {
            loadWishlist: loadWishlist
        }
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
(function() {
    'use strict';

    angular.module('YelaAppClient.Introduce', [
        'ngRoute'
    ]);
})();
(function() {
    'use strict';
    angular
        .module('YelaAppClient.Introduce')
        .run(runFunction);
        runFunction.$inject = ['$templateCache'];
        function runFunction($templateCache) {
            $templateCache.put('introduce.html',
                `               
                <div id="contact-page" class="container">
                    <div class="bg">   	
                        <div class="row">  	
                            <div class="col-sm-12">
                                <div class="contact-form">
                                    <h2 class="title text-center">Giới Thiệu</h2>
                                    

                                    
                                </div>
                            </div>  
                            </div>
                        </div>  
                    </div>	
                </div><!--/#contact-page-->
                `
            );
        };
})();
(function() {
    'use strict';

    angular
        .module('YelaAppClient.Introduce')
        .controller('IntroduceController', ControllerController);

    ControllerController.$inject = [];
    function ControllerController() {
        var vm = this;
    }
})();
(function () {
    'use strict';

    angular
        .module('YelaAppClient.Introduce')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/introduce', {
                templateUrl: 'introduce.html',
                controller: 'IntroduceController',
                controllerAs: 'vm',
                appId: 'introduce'
            });
        //$locationProvider.html5Mode(true);
    };
})();