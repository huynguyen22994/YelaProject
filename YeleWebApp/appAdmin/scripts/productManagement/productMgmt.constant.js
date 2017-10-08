(function() {
    'use strict';

    angular.module('YelaApplication.productManagement')
    .constant('productMgmtConstant', {
        appUrl: {
            productMgmt: {
                routeUrl: '/productManagement',
                templateUrl: '/admin/scripts/productManagement/productMgmt.html'
            }
        },
        sideBar: {
            title: '',
            apps: [
                {
                    name: 'Product',
                    templateUrl: '',
                    apps: [
                        {
                            name: 'Comestic',
                            templateUrl: ''
                        },
                        {
                            name: 'Food',
                            templateUrl: ''
                        }
                    ]
                },
                {
                    name: 'Product Type',
                    templateUrl: '',
                    apps: [

                    ]
                },
                {
                    name: 'Category',
                    templateUrl: ''
                }
            ]
        }
    });
})();