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