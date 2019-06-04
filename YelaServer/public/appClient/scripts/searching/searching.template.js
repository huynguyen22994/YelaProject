(function() {
    'use strict';
    angular
        .module('YelaAppClient.Searching')
        .run(function ($templateCache) {
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
        });
})();