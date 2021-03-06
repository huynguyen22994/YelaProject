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