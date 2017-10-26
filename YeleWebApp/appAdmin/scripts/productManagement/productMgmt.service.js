(function() {
    'use strict';

    angular
        .module('YelaApplication.productManagement')
        .factory('productMgmtService', Service);

    Service.$inject = ['productMgmtConstant'];
    function Service(productMgmtConstant) {
        var service = {
            getSideBar: getSideBar,
            getCurrentState: getCurrentState
        };
        
        return service;

        ////////////////
        function getSideBar() {
            var item = {}, sidebar = {};
            item.home = {
                id: 'home',
                name: productMgmtConstant.productMgmt.home.name,
                templateUrl: productMgmtConstant.productMgmt.home.templateUrl,
                iconClass: productMgmtConstant.productMgmt.home.iconClass,
                url: productMgmtConstant.productMgmt.home.url
            };
            item.product = {
                id: 'product',
                name: productMgmtConstant.productMgmt.product.name,
                templateUrl: productMgmtConstant.productMgmt.product.templateUrl,
                iconClass: productMgmtConstant.productMgmt.product.iconClass,
                url: productMgmtConstant.productMgmt.product.url,
                apps: [
                    {
                        id: 'comestic',
                        name: productMgmtConstant.productMgmt.product.comestic.name,
                        templateUrl: productMgmtConstant.productMgmt.product.comestic.templateUrl,
                        url: productMgmtConstant.productMgmt.product.comestic.url
                    },
                    {
                        id: 'food',
                        name: productMgmtConstant.productMgmt.product.food.name,
                        templateUrl: productMgmtConstant.productMgmt.product.food.templateUrl,
                        url: productMgmtConstant.productMgmt.product.food.url
                    }
                ]
            };
            item.producttype = {
                id: 'producttype',
                name: productMgmtConstant.productMgmt.producttype.name,
                templateUrl: productMgmtConstant.productMgmt.producttype.templateUrl,
                iconClass: productMgmtConstant.productMgmt.producttype.iconClass,
                url: productMgmtConstant.productMgmt.producttype.url,
                apps: [

                ]
            };
            item.category = {
                id: 'category',
                name: productMgmtConstant.productMgmt.category.name,
                templateUrl: productMgmtConstant.productMgmt.category.templateUrl,
                iconClass: productMgmtConstant.productMgmt.category.iconClass,
                url: productMgmtConstant.productMgmt.category.url
            };

            sidebar.title = productMgmtConstant.productMgmt.title;
            sidebar.apps = [item.home, item.product, item.producttype, item.category]; 
            return sidebar;
        };

        function getCurrentState(route) {
            if (route) {
                for (var state in productMgmtConstant.productMgmt) {
                    if (productMgmtConstant.productMgmt[state].id === route) {
                        return productMgmtConstant.productMgmt[state];
                    }
                }
            } else {
                return productMgmtConstant.productMgmt.home;
            }
        };
    }
})();