(function() {
    'use strict';

    angular
        .module('Tab', [])
        .directive('tab', Directive);

    Directive.$inject = [];
    function Directive() {
        var directive = {
            controller: ControllerController,
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
            },
            templateUrl: 'scripts/clientComponents/tab/tab.directive.html'
        };
        return directive;
        
    }
    /* @ngInject */
    function ControllerController ($scope) {
        var vm = this;
        vm.tabMenuConfig = {
            tabs: [
                {
                    id: '#posts',
                    label: 'posts',
                    isChoosen: true,
                    items: [
                        {
                            label: 'Easy Polo Black Edition',
                            image: 'images/home/gallery1.jpg'
                        }
                    ]
                },
                {
                    id: '#newPosts',
                    label: 'newPosts',
                    isChoosen: false,
                    items: [
                        {
                            label: 'Easy Polo Black Edition',
                            image: 'images/home/gallery2.jpg'
                        }
                    ]
                }
            ]
        };

        vm.onChooseTab = onChooseTab;

        function onChooseTab(key) {
            angular.forEach(vm.tabMenuConfig.tabs, function(tab) {
                if(tab.id === key) {
                    tab.isChoosen = true;
                } else {
                    tab.isChoosen = false;
                }
            })
        }
    }
})();