(function() {
    'use strict';
    angular
        .module('YelaAppClient.Materials')
        .run(function ($templateCache) {
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
        });
})();