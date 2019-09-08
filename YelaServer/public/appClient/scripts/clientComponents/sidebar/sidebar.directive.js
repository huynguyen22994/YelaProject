(function() {
    'use strict';

    angular
        .module('Sidebar', [
            'Category',
            'Brand'
        ])
        .directive('sidebar', Directive);

    Directive.$inject = [];
    function Directive() {
        var directive = {
            controller: ControllerController,
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
                brandData: '=',
                categoryData: '='
            },
            template: `
                <div class="left-sidebar">
                    <category category-data="categoryData"></category>
                    <brand brand-data="brandData"></brand> 
                    <div style="padding-top: 3px">
                        <a href ng-click="vm.openMenuDialog()">Xem Menu Ăn Tại Quán</a>
                    </div>           
                    <div ng-if="!$root.isSmallScreen" class="shipping text-center"><!--shipping-->
                        <img src="images/home/banner_1.jpg" alt="" />
                    </div><!--/shipping-->
                    <div ng-if="!$root.isSmallScreen" class="shipping text-center"><!--shipping-->
                        <img src="images/home/banner.jpg" alt="" />
                    </div><!--/shipping-->

                    <div>
                        <modal id="side-bar-menu-dialog">
                            <div class="modal">
                                <div class="modal-body main-banner-dialog content-left">
                                    <span class="close" ng-click="$root.closeModal('side-bar-menu-dialog')">&times;</span>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <img class="img-responsive" src="images/home/menu.png" alt="" on-error-src="{{ $root.notFoundImg }}"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-background" style="opacity: 0.5"></div>
                        </modal>
                    </div>

                </div>
            `
        };
        return directive;
        
    }

    ControllerController.$inject = ['$scope', 'ModalService'];
    /* @ngInject */
    function ControllerController ($scope, ModalService) {
        var vm = this;
        vm.openMenuDialog = openMenuDialog;
        //////////////////////////////////
        function openMenuDialog() {
            ModalService.Open('side-bar-menu-dialog');
        }
    }
})();