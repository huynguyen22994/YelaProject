(function() {
    'use strict';

    angular
        .module('YelaAppClient')
        .run(AppRunFunction);

    AppRunFunction.$inject = ['$rootScope', 'ngMeta'];
    function AppRunFunction($rootScope, ngMeta) {
        ngMeta.init();
        $rootScope.$on("$locationChangeStart", function(event, next, current) {   
            $(window).scrollTop(0);
        }); 
    }
})();