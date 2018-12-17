(function() {
    'use strict';
    angular
        .module('YelaAppClient.Blog')
        .run(function ($templateCache) {
            $templateCache.put('blogs.html',
                `   
                <section>
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-3">
                                <div class="left-sidebar">
                                    <div class="brands_products"><!--brands_products-->
                                        <h2>Chủ Đề</h2>
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
                                        <img src="images/home/shipping.jpg" alt="" />
                                    </div><!--/shipping-->
                                </div>
                            </div>

                            <div class="col-sm-9">
                                <div class="blog-post-area" style="text-align: -webkit-auto">
                                    <h2 class="title text-center">Bài Viết Mới Nhất</h2>

                                    <div class="single-blog-post advance" ng-repeat="blog in vm.blogs">
                                        <div class="post-meta">
                                            <ul>
                                                <li><i class="fa fa-user"></i> FoodTech</li>
                                                <li><i class="fa fa-calendar"></i> {{ vm.getFormatDate(blog.createdAt) }}</li>
                                            </ul>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <a href="">
                                                    <img ng-src="{{blog.imageLink}}" alt="Hình Ảnh">
                                                </a>
                                            </div>
                                            <div class="col-sm-9">
                                                <h4>{{ blog.title }}</h4>
                                                <p>{{ blog.summary }}</p>
                                                <a  class="btn btn-primary" ng-click="vm.readMore(blog)" >Đọc Thêm</a>
                                            </div>
                                        </div>
                                    </div>
    
                                    <div class="pagination-area">
                                        <ul class="pagination">
                                            <li><a href="" class="active">1</a></li>
                                            <li><a href="">2</a></li>
                                            <li><a href="">3</a></li>
                                            <li><a href=""><i class="fa fa-angle-double-right"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                `
            );
        });
})();