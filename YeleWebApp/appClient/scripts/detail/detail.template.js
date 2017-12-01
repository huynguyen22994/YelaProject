(function() {
    'use strict';
    angular
        .module('YelaAppClient.Detail')
        .run(function ($templateCache) {
            $templateCache.put('detail.html',
                `   
                    <section>
                        <div class="container">
                            <div class="row">
                                <div class="col-sm-3">
                                    <sidebar brand-data="vm.brands" category-data="vm.categories"></sidebar>
                                </div>
                                <div class="col-sm-9 padding-right">
                                    <div class="product-details"><!--product-details-->
                                        <div class="col-sm-5">
                                            <div class="view-product">
                                                <img ng-src="{{vm.product.linkImg}}" alt="" />
                                                <h3>ZOOM</h3>
                                            </div>
                                            <div id="similar-product" class="carousel slide" data-ride="carousel">
                                                
                                                <!-- Wrapper for slides -->
                                                    <div class="carousel-inner">
                                                        <div class="item active">
                                                        <a href=""><img src="images/product-details/similar1.jpg" alt=""></a>
                                                        <a href=""><img src="images/product-details/similar2.jpg" alt=""></a>
                                                        <a href=""><img src="images/product-details/similar3.jpg" alt=""></a>
                                                        </div>
                                                        <div class="item">
                                                        <a href=""><img src="images/product-details/similar1.jpg" alt=""></a>
                                                        <a href=""><img src="images/product-details/similar2.jpg" alt=""></a>
                                                        <a href=""><img src="images/product-details/similar3.jpg" alt=""></a>
                                                        </div>
                                                        <div class="item">
                                                        <a href=""><img src="images/product-details/similar1.jpg" alt=""></a>
                                                        <a href=""><img src="images/product-details/similar2.jpg" alt=""></a>
                                                        <a href=""><img src="images/product-details/similar3.jpg" alt=""></a>
                                                        </div>
                                                        
                                                    </div>

                                                <!-- Controls -->
                                                <a class="left item-control" href="#similar-product" data-slide="prev">
                                                    <i class="fa fa-angle-left"></i>
                                                </a>
                                                <a class="right item-control" href="#similar-product" data-slide="next">
                                                    <i class="fa fa-angle-right"></i>
                                                </a>
                                            </div>

                                        </div>
                                        <div class="col-sm-7">
                                            <div class="product-information"><!--/product-information-->
                                                <img src="images/product-details/new.jpg" class="newarrival" alt="" />
                                                <h2>{{vm.product.name}}</h2>
                                                <p>Web ID: 1089772</p>
                                                <p>
                                                    <span>
                                                        <span>{{vm.product.price}}</span>
                                                    </span>
                                                </p>
                                                <span>
                                                    <label>Quantity:</label>
                                                    <input type="text" value="1" />
                                                    <button type="button" class="btn btn-fefault cart">
                                                        <i class="fa fa-shopping-cart"></i>
                                                        Add to cart
                                                    </button>
                                                </span>
                                                <p><b>Availability:</b> In Stock</p>
                                                <p><b>Condition:</b> New</p>
                                                <p><b>Brand:</b> E-SHOPPER</p>
                                                <a href=""><img src="images/product-details/share.png" class="share img-responsive"  alt="" /></a>
                                            </div><!--/product-information-->
                                        </div>
                                    </div><!--/product-details-->

                                    <recommend-product array-data="vm.productBestsellers" config="vm.recommendProductConfig"></recommend-product>  

                                </div>
                            </div>
                        </div>
                    </section>
                `
            );
        });
})();