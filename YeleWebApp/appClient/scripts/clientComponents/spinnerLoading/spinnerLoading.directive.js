(function() {
    'use strict';

    angular
        .module('SpinnerLoading', [])
        .directive('spinnerLoading', Directive);

    Directive.$inject = [];
    function Directive() {
        var directive = {
            controller: ControllerController,
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
                isShow: '='
            },
            template: `
            <div ng-if="isShow" class="container" id="loader-warpper">
                <div class="row">
                    <div id="loader">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="lading"></div>
                    </div>
                </div>
            </div>
            `
        };
        return directive;

    }
    /* @ngInject */
    function ControllerController ($scope) {
        var vm = this;
    }
})();