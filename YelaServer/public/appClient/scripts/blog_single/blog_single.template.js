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
                                    <sidebar brand-data="vm.brands" category-data="vm.categories"></sidebar>
                                </div>
                                <div class="col-sm-9 padding-right">
                                   
                                    <div class="blog-post-area">
                                        <h2 class="title text-center">Bài Viết</h2>
                                        <div class="single-blog-post">
                                            <h3>{{ vm.blog.title }}</h3>
                                            <div class="post-meta">
                                                <ul>
                                                    <li><i class="fa fa-user"></i> FoodTech</li>
                                                    <li><i class="fa fa-clock-o"></i> 1:33 pm</li>
                                                    <li><i class="fa fa-calendar"></i> {{ vm.blog.createdTime }}</li>
                                                </ul>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <div style="float: left" ng-bind-html="vm.blog.description"></div>
                                                </div>
                                            </div>
                                            <div class="pager-area">
                                                <ul class="pager pull-right">
                                                    <li><a href="#">Pre</a></li>
                                                    <li><a href="#">Next</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div><!--/blog-post-area-->
                
                                    <div class="rating-area">
                                        <ul class="ratings">
                                            <li class="rate-this">Rate this item:</li>
                                            <li>
                                                <i class="fa fa-star color"></i>
                                                <i class="fa fa-star color"></i>
                                                <i class="fa fa-star color"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                            </li>
                                            <li class="color">(6 votes)</li>
                                        </ul>
                                        <ul class="tag">
                                            <li>TAG:</li>
                                            <li><a class="color" href="">Pink <span>/</span></a></li>
                                            <li><a class="color" href="">T-Shirt <span>/</span></a></li>
                                            <li><a class="color" href="">Girls</a></li>
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
                                            <h4 class="media-heading">Huy Nguyen</h4>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
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
                                        <div class="col-sm-8">
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