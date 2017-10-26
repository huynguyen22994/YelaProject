(function() {
    'use strict';

    angular.module('YelaApplication.productManagement', [
        'ngRoute',
        'YelaSkeleton',
        'YelaState',
        'YelaApplication.productManagement.home'
    ]);
})();