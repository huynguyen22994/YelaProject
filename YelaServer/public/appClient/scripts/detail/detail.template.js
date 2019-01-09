(function() {
    'use strict';
    angular
        .module('YelaAppClient.Detail')
        .run(function ($templateCache) {
            $templateCache.put('detail.html',
                `   
                    <section>
                        <div class="container">
                            <div class="row">
                                <div class="col-sm-3">
                                    <sidebar brand-data="vm.brands" category-data="vm.categories"></sidebar>
                                </div>
                                <div class="col-sm-9 padding-right">
                                    <div class="product-details"><!--product-details-->
                                        <div class="col-sm-5">
                                            <div class="view-product">
                                                <img ng-src="{{vm.product.linkImg}}" alt="" />
                                            </div>
                                        </div>
                                        <div class="col-sm-7">
                                            <div class="product-information"><!--/product-information-->
                                             <label class="newarrival banner-lable">{{ vm.product.productStatus | i18next }}</label>   
                                                <h2>{{vm.product.name}}</h2>
                                                <!--<p>Web ID: 1089772</p>-->
                                                <p>
                                                    <span>
                                                        <span>{{vm.product.price}}</span>
                                                    </span>
                                                </p>
                                                <span>
                                                    <label>{{ 'quantity' | i18next }}:</label>
                                                    <input type="number" ng-model="vm.quantity" />
                                                    <button type="button" class="btn btn-fefault cart" ng-click="vm.addToCart(vm.product, vm.quantity)">
                                                        <i class="fa fa-shopping-cart"></i>
                                                        {{ 'addToCart' | i18next }}
                                                    </button>
                                                </span>
                                                <p><b>{{ 'status' | i18next }}:</b> Còn</p>
                                                <p><b>{{ 'type' | i18next }}:</b> {{ vm.product.productStatus | i18next }}</p>
                                                <p><b>{{ 'describe' | i18next }}:</b> {{vm.product.discribe}}</p>
                                            </div><!--/product-information-->
                                        </div>
                                    </div><!--/product-details-->

                                    <recommend-product array-data="vm.productBestsellers" config="vm.recommendProductConfig"></recommend-product>  

                                </div>
                            </div>
                        </div>
                    </section>
                `
            );
        });
})();