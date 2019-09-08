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