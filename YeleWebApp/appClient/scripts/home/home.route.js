(function () {
    'use strict';

    angular
        .module('YelaAppClient.Home')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/', {
                templateUrl: 'home.html',
                controller: 'HomeController',
                controllerAs: 'vm',
                resolve: {
                    products: function (HomeService) {
                        return HomeService.getAllProduct();
                    }
                }
            });
        //$locationProvider.html5Mode(true);
    };
})();

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