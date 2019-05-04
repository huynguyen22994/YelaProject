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

                                    <div class="single-blog-post advance" ng-repeat="product in vm.products">
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <a href="">
                                                    <img ng-src="{{product.linkImg}}" alt="Hình Ảnh">
                                                </a>
                                            </div>
                                            <div class="col-sm-9">
                                                <h4>{{ product.name }}</h4>
                                                <p>{{ product.discribe }}</p>
                                                <a  class="btn btn-primary" ng-click="vm.readMore(blog)" >Đọc Thêm</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>    
                        </div>
                    </div>
                </section>
                `
            );
        });
})();