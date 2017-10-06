(function() {
    'use strict';

    angular
        .module('YelaApplication')
        .controller('IndexController', ControllerController);

    ControllerController.$inject = [];
    function ControllerController() {
        var vm = this;
        vm.navBarConfig = {
            appTitle: 'Yela Admin',
            appTitleUrl: '/',
            menus: [
                {
                    name: 'Product Management',
                    url: '',
                    subMenu: [

                    ]
                }
            ]
        };
        

        activate();

        ////////////////

        function activate() { }
    }
})();