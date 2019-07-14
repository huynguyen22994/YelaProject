(function () {
    'use strict';

    angular
        .module('YelaAppClient.Home')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        var urlActiveAccount = '/active-account/:token/:id/:email';

        $routeProvider
            .when('/', {
                templateUrl: 'home.html',
                controller: 'HomeController',
                controllerAs: 'vm',
                appId: 'home',
                data: {
                    meta: {
                        'title': 'FoodTech Shop - Mì Tỏi & Cơm Vò',
                        'og:title': 'FoodTech Shop - Mì Tỏi & Cơm Vò',
                        'description': 'Chúng tôi luôn khát khao, cố gắng cải thiện từng ngày để mang đến những sản phẩm thức ăn nhanh và một dịch vụ tốt nhất cho cộng đồng.',
                        'og:description': 'Chúng tôi luôn khát khao, cố gắng cải thiện từng ngày để mang đến những sản phẩm thức ăn nhanh và một dịch vụ tốt nhất cho cộng đồng.',
                        'og:image': 'https://foodtechserver.herokuapp.com/images/home/foodtech_slide_3.jpg'
                    }
                },
            })
            .when(urlActiveAccount, {
                templateUrl: 'home.html',
                controller: 'HomeController',
                controllerAs: 'vm',
                isActiveRoute: true
            })
            .otherwise({
                redirectTo : '/'
            });
        //$locationProvider.html5Mode(true);
    };
})();