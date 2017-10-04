var app = angular.module("YelaAdminApp", ["ngRoute", "ngResource", "ngFileUpload", "ckeditor"]);

    app.config(['$routeProvider', '$locationProvider', function AppConfig($routeProvider, $locationProvider) {
        $routeProvider
        .when('/San-Pham', {
        templateUrl: 'views/Product/templates/tables_products.html',
        controller: 'ProductAdminCtrl'
        })
        .when('/Loai-San-Pham', {
        templateUrl: 'views/ProductType/templates/tables_producttype.html',
        controller: 'ProductTypeAdminCtrl'
        })    
        .when('/Danh-Muc', {
        templateUrl: 'views/Category/templates/tables_category.html',
        controller: 'CategoryAdminCtrl'
        }) 
        .when('/Hoa-Don', {
        templateUrl: 'views/Bill/templates/tables_bill.html',
        controller: 'BillAdminCtrl'
        })        
        .when('/Khach-Hang', {
        templateUrl: 'views/Customer/templates/tables_customer.html',
        controller: 'CustomerAdminCtrl'
        })
        .when('/Nhan-Hieu', {
        templateUrl: 'views/Brand/templates/tables_brand.html',
        controller: 'BrandAdminCtrl'
        })        
        .when('/Thanh-Truot', {
        templateUrl: 'views/Slider/templates/tables_slider.html',
        controller: 'SliderAdminCtrl'
        })         
        // removed other routes ... *snip
        .otherwise({
        redirectTo: '/San-Pham'
        }
        );
        //enable html5Mode for pushstate ('#'-less URLs)
        //$locationProvider.html5Mode(true);
        //$locationProvider.hashPrefix('!');
    }]);