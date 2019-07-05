(function() {
    'use strict';

    angular.module('YelaApplication', [
        'adminInfo',
        'YelaApplication.ProductMgmt',
        'YelaApplication.UserManagement',
        'YelaApplication.BlogMgmt',
        'YelaApplication.BillMgmt',
        'YelaApplication.DashboardManagement',
        'YelaApplication.ShippingMgmt',
        'YelaApplication.CheckoutMgmt',
        'YelaLineChart',
        'YelaPieChart',
        'jm.i18next',
        'toastr',
        'ngMaterial',
        'ngFileUpload',
        'ngImgCrop',
        'ckeditor',
        'ylZingGrid',
        'YelaAppClient.errorSrc'
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