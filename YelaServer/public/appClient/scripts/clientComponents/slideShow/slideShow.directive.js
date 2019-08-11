(function() {
    'use strict';

    angular
        .module('SlideShow', [])
        .directive('slideShow', Directive);

    Directive.$inject = [];
    function Directive() {
        var directive = {
            controller: ControllerController,
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
                config: '='
            },
            //templateUrl: 'components/silideShow/slideShow.directive.html'
            template: `
            <div id="slider-carousel" class="carousel slide" data-ride="carousel" style="position: initial">
                <ol class="carousel-indicators" style="width: 69%">
                    <li data-target="#slider-carousel" data-slide-to="0" class="active"></li>
                    <li data-target="#slider-carousel" data-slide-to="1"></li>
                    <!--<li data-target="#slider-carousel" data-slide-to="2"></li>-->
                </ol>
                
                <div class="carousel-inner">
                    <div class="item active">
                        <div class="col-sm-4">
                            <h1><span>Mì Tỏi |</span> Từng những sợi mì thơm ngon kết hợp với vị Tỏi đặc trưng tạo nên hương vị lạ mà quen.</h1>
                            <button type="button" class="btn btn-default get textSlideShow" ng-click="vm.viewProduct('mitoi')">Xem Ngay</button>
                        </div>
                        <div class="col-sm-8">
                            <img src="images/home/foodtech_slide_3.jpg" class="girl img-responsive"/>
                        </div>
                    </div>
                    <div class="item">
                        <div class="col-sm-4">
                            <h1><span>F </span>| Food Tech</h1>
                            <p></p>
                        </div>
                        <div class="col-sm-8">
                            <img src="images/home/foodtech_slide_1.jpg" class="girl img-responsive" alt="" />
                        </div>
                    </div>      
                    <!--<div class="item">

                    <div class="col-sm-12 pull-right">
                        <h2 class="brandSlideShow">Free E-Commerce Template</h2>
                        <p class="textSlideShow">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                        <button type="button" class="btn btn-default get textSlideShow">Get it now</button>
                        <div class="textSlideShow">Caption Three</div>
                        <img src="images/home/foodtech_slide_2.jpg" class="girl img-responsive" alt="" />
                    </div>

                        <div class="col-sm-4">
                            <h1><span>Food |</span> Cơm Vò</h1>
                        </div>
                        <div class="col-sm-8">
                            <img src="images/home/foodtech_slide_2.jpg" class="girl img-responsive"/>
                        </div>
                    </div> --> 
                </div>
                <a href="#slider-carousel" class="left control-carousel hidden-xs" data-slide="prev" style="margin-left: 5%">
                    <i class="fa fa-angle-left"></i>
                </a>
                <a href="#slider-carousel" class="right control-carousel hidden-xs" data-slide="next" style="margin-right: 3%">
                    <i class="fa fa-angle-right"></i>
                </a>
            </div>
            `
        };
        return directive;

    }
    ControllerController.$inject = ['$scope', '$location'];
    /* @ngInject */
    function ControllerController ($scope, $location) {
        // config.data = [];
        var vm = this;
        vm.viewProduct = viewProduct;

        /////////////////////////////
        function viewProduct(key) {
            $location.path('/detail/ee2a4ff0-a647-11e9-8d8d-85dfb713e4df');
        }
    }
})();