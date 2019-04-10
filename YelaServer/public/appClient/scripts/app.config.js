(function() {
    'use strict';

    angular
        .module('YelaAppClient')
        .config(AppConfigFunction);

    AppConfigFunction.$inject = ['$locationProvider'];
    function AppConfigFunction($locationProvider) {
        //$locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('');
    }
})();

(function() {
    'use strict';

    angular
        .module('YelaAppClient')
        .config(AppConfigFunction);

    AppConfigFunction.$inject = ['toastrConfig'];
    function AppConfigFunction(toastrConfig) {
        angular.extend(toastrConfig, {
            autoDismiss: false,
            containerId: 'toast-container',
            maxOpened: 0,    
            newestOnTop: true,
            positionClass: 'toast-top-right',
            preventDuplicates: false,
            preventOpenDuplicates: false,
            target: 'body'
          });
    }
})();