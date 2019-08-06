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