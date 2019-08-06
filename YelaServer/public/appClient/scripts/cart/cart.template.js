(function() {
    'use strict';
    angular
        .module('YelaAppClient.CartApp')
        .run(runFunction);
        runFunction.$inject = ['$templateCache'];
        function runFunction($templateCache) {
            $templateCache.put('cart.html',
                `   
                   <div ng-include="'cartCheckout.html'"></div> 
                   <!--<div ng-if="!vm.cartState.isCartPage" ng-include="'checkout.html'"></div>--> 
                `
            );
        };
})();