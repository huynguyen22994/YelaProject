(function() {
    'use strict';

    angular
        .module('YelaApplication.productManagement')
        .run(function ($templateCache) {
            $templateCache.put('productMgmt.html',
                '<product-management></product-management>'
            );
        });
})();