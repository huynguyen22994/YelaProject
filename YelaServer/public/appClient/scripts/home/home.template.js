(function() {
    'use strict';
    angular
        .module('YelaAppClient.Home')
        .run(function ($templateCache) {
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
                                    <features-item array-data="vm.productFreatures" config="vm.featureProductConfig"></features-item>    
                                    <recommend-product array-data="vm.productBestsellers" config="vm.recommendProductConfig"></recommend-product>  
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
        });
})();