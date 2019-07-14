(function() {
    'use strict';

    angular
        .module('YelaAppClient')
        .config(AppConfigFunction);

    AppConfigFunction.$inject = ['$locationProvider', 'ngMetaProvider'];
    function AppConfigFunction($locationProvider, ngMetaProvider) {
        //$locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('');

        ngMetaProvider.useTitleSuffix(true);
        // On /home, the title would change to
        // 'Home Page | Best Website on the Internet!'
        ngMetaProvider.setDefaultTitle('FoodTech Shop - Mì Tỏi & Cơm Vò');
        ngMetaProvider.setDefaultTitleSuffix(' | FoodTech Shop');
        ngMetaProvider.setDefaultTag('author', 'FoodTech Team');
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