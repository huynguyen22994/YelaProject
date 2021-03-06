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
            <div id="slider-carousel" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#slider-carousel" data-slide-to="0" class="active"></li>
                    <li data-target="#slider-carousel" data-slide-to="1"></li>
                    <li data-target="#slider-carousel" data-slide-to="2"></li>
                </ol>
                
                <div class="carousel-inner">
                    <div class="item active">
                        <div class="col-sm-12">
                            <!-- <h2 class="brandSlideShow">Free E-Commerce Template</h2>
                            <p class="textSlideShow">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                            <button type="button" class="btn btn-default get textSlideShow">Get it now</button>
                            <div class="textSlideShow">Caption Three</div> -->
                            <img src="images/home/slide.PNG" class="girl img-responsive" alt="" />
                            <img src="images/home/pricing.png"  class="pricing" alt="" />
                        </div>
                    </div>        
                </div>
                <a href="#slider-carousel" class="left control-carousel hidden-xs" data-slide="prev">
                    <i class="fa fa-angle-left"></i>
                </a>
                <a href="#slider-carousel" class="right control-carousel hidden-xs" data-slide="next">
                    <i class="fa fa-angle-right"></i>
                </a>
            </div>
            `
        };
        return directive;

    }
    /* @ngInject */
    function ControllerController ($scope) {
        // config.data = [];
    }
})();