(function() {
    'use strict';

    angular.module('YelaApplication', [
        'YelaApplication.ProductMgmt',
        'YelaApplication.UserManagement',
        'jm.i18next',
        'toastr'
    ]);
})();

(function () {
    angular
        .module('YelaApplication')
        .config(toastrAppConfig);

    toastrAppConfig.$inject = ['toastrConfig'];

    function toastrAppConfig(toastrConfig) {
        angular.extend(toastrConfig, {
            autoDismiss: false,
            containerId: 'toast-container',
            maxOpened: 0,    
            newestOnTop: true,
            positionClass: 'toast-bottom-left',
            preventDuplicates: false,
            preventOpenDuplicates: false,
            target: 'body',
            closeButton: true
          });
    }

})();