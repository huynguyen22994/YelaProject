(function () {
    'use strict';

    angular
        .module('YelaAppClient.Login')
        .constant('LoginConstant', { 
            google: {
                clientid: '725396331747-p277f82p7vggesl5to9bdbs9f390o6b2.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
                clientPath: 'https://www.googleapis.com/plus/v1/people/me',
                scope: 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
            }

        });
})();