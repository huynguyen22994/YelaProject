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
                                    <sidebar></sidebar>
                                </div>
                                <div class="col-sm-9 padding-right">
                                    <features-item></features-item>
                                    <tab></tab>    
                                    <recommend-product></recommend-product>        
                                </div>
                            </div>
                        </div>
                    </section>
                `
            );
        });
})();