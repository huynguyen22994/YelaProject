(function () {
    'use strict';

    angular
        .module('YelaApplication.UserManagement')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider', '$locationProvider'];
    function configFunction($routeProvider, $locationProvider) {
        //let urlParams = productMgmtConstant.appUrl.productMgmt.routeUrl + '/:route';

        $routeProvider
            .when('/userMgmt/contact', {
                templateUrl: '/admin/scripts/userMgmt/contact/contact.html',
                controller: 'ContactController',
                controllerAs: 'vm'
            })
            .when('/userMgmt/mail', {
                templateUrl: '/admin/scripts/userMgmt/mail/mail.html',
                controller: 'MailController',
                controllerAs: 'vm'
            });
        //$locationProvider.html5Mode(true);
    };
})();