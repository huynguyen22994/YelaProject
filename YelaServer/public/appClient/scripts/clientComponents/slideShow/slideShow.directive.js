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
                    <li data-target="#slider-carousel" data-slide-to="2"></li>
                </ol>
                
                <div class="carousel-inner">
                    <div class="item active">
                        <div class="col-sm-4">
                            <h1><span>F </span>| Food Tech</h1>
                            <p>Chúng tôi luôn khát khao, cố gắng cải thiện từng ngày để mang đến những sản phẩm và một dịch vụ tốt nhất cho cộng đồng. </p>
                        </div>
                        <div class="col-sm-8">
                            <img src="images/home/slide3.PNG" class="girl img-responsive" alt="" />
                        </div>
                    </div>
                    <div class="item">
                        <div class="col-sm-12">
                            <!-- <h2 class="brandSlideShow">Free E-Commerce Template</h2>
                            <p class="textSlideShow">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                            <button type="button" class="btn btn-default get textSlideShow">Get it now</button>
                            <div class="textSlideShow">Caption Three</div> -->
                            <img src="images/home/slide.PNG" class="girl img-responsive" alt="" />
                        </div>
                    </div>      
                    <div class="item">
                        <div class="col-sm-4">
                            <h1><span>F |</span> Food Tech</h1>
                            <p>Chúng tôi luôn khát khao, cố gắng cải thiện từng ngày để mang đến những sản phẩm và một dịch vụ tốt nhất cho cộng đồng. </p>
                        </div>
                        <div class="col-sm-8">
                            <img src="images/home/slide2.PNG" class="girl img-responsive" style="padding-top: 75px" alt="" />
                        </div>
                    </div>  
                </div>
                <a href="#slider-carousel" class="left control-carousel hidden-xs" data-slide="prev" style="margin-left: 8%">
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