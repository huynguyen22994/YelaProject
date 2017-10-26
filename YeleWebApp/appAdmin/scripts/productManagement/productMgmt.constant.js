(function() {
    'use strict';

    angular.module('YelaApplication.productManagement')
    .constant('productMgmtConstant', {
        appUrl: {
            productMgmt: {
                routeUrl: '/productManagement',
                templateUrl: 'productMgmt.html'
            }
        },
        productMgmt: {
            title: 'ProductMgmt',
            home: {
                id: 'home',
                name: 'Home',
                templateUrl: 'admin/scripts/productManagement/home/home.html',
                iconClass: '',
                url: '/productManagement/home'
            },
            product: {
                id: 'product',
                name: 'Product',
                templateUrl: '',
                iconClass: 'fa fa-bar-chart-o fa-fw',
                url: '/productManagement/product',
                comestic: {
                    id: 'comestic',
                    name: 'Comestic',
                    templateUrl: '',
                    url: '/productManagement/product/comestic'
                },
                food: {
                    id: 'food',
                    name: 'Food',
                    templateUrl: '',
                    url: '/productManagement/prduct/comestic'
                }
                
            },
            producttype: {
                id: 'producttype',
                name: 'Product Type',
                templateUrl: 'admin/scripts/productManagement/producttype/producttype.html',
                iconClass: '',
                url: '/productManagement/producttype'
            },
            category: {
                id: 'category',
                name: 'Category',
                templateUrl: 'admin/scripts/productManagement/category/category.html',
                iconClass: '',
                url: '/productManagement/category'
            }
        }
    });
})();