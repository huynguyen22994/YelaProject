(function() {
    'use strict';

    angular.module('YelaApplication')
        .constant('ylConstant', {
            appTitle: 'Yela Admin',
            ylAppMenu: [
                {
                    name: 'Product Management',
                    url: '#!/productManagement',
                    apps: [
                        {
                            name: 'Product',
                            url: '',
                            apps: [
                                {
                                    name: 'Comestic',
                                    url: ''
                                },
                                {
                                    name: 'Food',
                                    url: ''
                                }
                            ]
                        },
                        {
                            name: 'Product Type',
                            url: '',
                            apps: [
                                
                            ]
                        }
                    ]
                },
                {
                    name: 'Revenue Management',
                    url: '',
                    apps: [

                    ]
                },
                {
                    name: 'User Management',
                    url: '',
                    apps: [
                        {
                            name: 'User',
                            url: ''
                        },
                        {
                            name: 'ChatBox Management',
                            url: ''
                        }
                    ]
                }
            ],
            serverUrl: 'http://localhost:3000'
    });
})();