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
                                    <features-item array-data="vm.productFreatures"></features-item>
                                    <tab></tab>    
                                    <recommend-product array-data="vm.productBestsellers" config="vm.recommendProductConfig"></recommend-product>  
                                </div>
                            </div>
                        </div>
                    </section>
                `
            );
        });
})();