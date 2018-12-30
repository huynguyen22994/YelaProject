(function() {
    'use strict';
    angular
        .module('YelaAppClient.BlogSingle')
        .run(function ($templateCache) {
            $templateCache.put('blogsingle.html',
                `   
                    <section>
                        <div class="container">
                            <div class="row">

                                <div class="col-sm-3">
                                    <div class="left-sidebar">
                                        <div class="brands_products"><!--brands_products-->
                                            <h2>{{ 'topic' | i18next }}</h2>
                                            <div class="brands-name">
                                                <ul class="nav nav-pills nav-stacked">
                                                    <li><a href="" ng-click="vm.goToBlogsByType('food')">Món Ăn</a></li>
                                                    <li><a href="" ng-click="vm.goToBlogsByType('nutrition')">Dinh Dưỡng</a></li>
                                                    <li><a href="" ng-click="vm.goToBlogsByType('lowcarb')">LowCarb</a></li>
                                                    <li><a href="" ng-click="vm.goToBlogsByType('discover')">Khám Phá</a></li>
                                                </ul>
                                            </div>
                                        </div><!--/brands_products-->
                                        
                                        <div class="shipping text-center"><!--shipping-->
                                            <img src="images/home/banner.png" alt="" />
                                        </div><!--/shipping-->
                                    </div>
                                </div>

                                <div class="col-sm-9 padding-right">
                                   
                                    <div class="blog-post-area">
                                        <h2 class="title text-center">{{ 'post' | i18next }}</h2>
                                        <div class="single-blog-post">
                                            <h3>{{ vm.blog.title }}</h3>
                                            <div class="post-meta">
                                                <ul>
                                                    <li><i class="fa fa-user"></i> FoodTech</li>
                                                    <li><i class="fa fa-calendar"></i> {{ vm.blog.createdTime }}</li>
                                                </ul>
                                            </div>
                                            <div class="row">
                                                <div ng-if="vm.isLoading">
                                                    <div class="foodtech-loader"></div>
                                                    <div class="foodtech-loader-backdrop"></div>
                                                </div>
                                                <div ng-if="!vm.isLoading" class="col-xs-12 col-sm-12" style="text-align: justify">
                                                    <div style="float: left; width: inherit" ng-bind-html="vm.blog.description"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div><!--/blog-post-area-->
                
                                    <div class="rating-area">
                                        <ul class="ratings">
                                            <li class="rate-this">{{ 'rate' | i18next }}:</li>
                                            <li>
                                                <i class="fa fa-star color"></i>
                                                <i class="fa fa-star color"></i>
                                                <i class="fa fa-star color"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                            </li>
                                            <li class="color">(6 votes)</li>
                                        </ul>
                                    </div><!--/rating-area-->
                
                                    <div class="socials-share" style="float: left">
                                        <div class="fb-like" data-href="https://foodtechserver.herokuapp.com/" data-layout="standard" data-action="like" data-size="small" data-show-faces="true" data-share="true"></div>
                                    </div><!--/socials-share-->

                                    <div class="media commnets" style="float: left">
                                        <a class="pull-left" href="#">
                                            <img class="media-object" src="images/blog/man-one.jpg" alt="">
                                        </a>
                                        <div class="media-body">
                                            <h4 class="media-heading">FoodTech Shop</h4>
                                            <p>Khi bạn đã thật sự xác định được mục tiêu của cuộc đời mình thì hãy tập trung theo đuổi và kiên trì với nó. Hãy luôn giữ một niềm tin và khát khao cháy bỏng về điều đó, vì đó là hai yếu tố không thể thiếu để biến ước mơ của bạn thành sự thật.</p>
                                            <div class="blog-socials">
                                                <ul>
                                                    <li><a href=""><i class="fa fa-facebook"></i></a></li>
                                                    <li><a href=""><i class="fa fa-twitter"></i></a></li>
                                                    <li><a href=""><i class="fa fa-dribbble"></i></a></li>
                                                    <li><a href=""><i class="fa fa-google-plus"></i></a></li>
                                                </ul>
                                                <a class="btn btn-primary" href="">Other Posts</a>
                                            </div>
                                        </div>
                                    </div><!--Comments-->

                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="fb-comments" data-href="https://foodtechserver.herokuapp.com/blog" data-numposts="8"></div>
                                        </div>
                                    </div>

                                   <!-- <recommend-product array-data="vm.productBestsellers" config="vm.recommendProductConfig"></recommend-product>  -->

                                </div>
                            </div>
                        </div>
                    </section>
                `
            );
        });
})();