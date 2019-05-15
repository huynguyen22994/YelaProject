(function() {
    'use strict';

    angular
        .module('YelaAppClient')
        .run(AppRunFunction);

    AppRunFunction.$inject = ['$rootScope'];
    function AppRunFunction($rootScope) {
        $rootScope.$on("$locationChangeStart", function(event, next, current) {   
            $(window).scrollTop(0);
        }); 
    }
})();