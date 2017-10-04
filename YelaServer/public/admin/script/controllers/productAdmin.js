app.controller('ProductAdminCtrl', function($scope, $timeout, ProductService, UploadFile, config, ProductTypeService, $q, BrandService){

    $scope.isImgName = false;
    $scope.isUpload = false;
    $scope.newProduct = {};
    $scope.canAdd = false;
    $scope.ImgLink = config.ImgLink;
    $scope.Product = {};
    $scope.changeImage = false;
    $scope.optionEnum = {
        upload: 'upload',
        change: 'change'
    };
    $scope.productStatus = {
        model: null,
        productStatusOption: [
            { value: 'new', name: 'Mới' },
            { value: 'old', name: 'Củ' },
            { value: 'normal', name: 'Bình Thường' },
            { value: 'bestseller', name: 'Bán Chạy Nhất' },
            { value: 'prominentest', name: 'Nổi Bật Nhất' },
        ]
    };

    // Editor options.
    $scope.options = {
        language: 'en',
        allowedContent: true,
        entities: false
    };

    $scope.initialization = () => {
        $scope.loadProducts();
        $scope.loadProductTypes();
        $scope.loadBrands();
    };

    $scope.loadProducts = () => {
        ProductService.getProducts().then((res) => {
            $scope.products = res.data.products;
        }, (err) => {
            console.log(err);
        })
    };

    $scope.loadProductTypes = () => {
        ProductTypeService.getProductTypes().then((res) => {
            $scope.productTypes = res.data;
        }, (err) => {
            console.log(err);
        });
    };

    $scope.loadBrands = () => {
        BrandService.getBrands().then((res) => {
            $scope.brands = res.data;
        }, (err) => {
            console.log(err);
        });
    };
    
    $scope.createProduct = (selectedProductType, selectedBrand) => {
        $scope.newProduct.productTypeId = selectedProductType.productTypeId;
        $scope.newProduct.productStatus = $scope.productStatus.model;
        $scope.newProduct.brandId = selectedBrand.brandId;
        if ($scope.newProduct) {
            let promise = $q((resolve, reject) => {
                $scope.upload($scope.imageUpload, $scope.optionEnum.upload, resolve, reject);
            });

            promise.then((data) => {
                $scope.newProduct.linkImg = $scope.newProduct.linkImg.slice(14);
                ProductService.createProduct($scope.newProduct)
                    .then((res) => {
                    $scope.newProduct = {};
                    $scope.loadProducts();
                }, (err) => {

                });
            }, (err) => {
                console.log(err);
            });
            
        } else {

        }
    };

    $scope.detailProduct = (productId) => {
        ProductService.getOneProduct(productId)
            .then((res) => {
                $scope.Product = res.data;
                $scope.realImgLink = $scope.ImgLink + $scope.Product.linkImg;
                ProductTypeService.getOneProductType($scope.Product.productTypeId)
                    .then((res) => {
                        $scope.changeProductType = res.data;
                        //console.log($scope.changeProductType);
                    }, (err) => {

                    });
            }, (err) => {

            });
    };

    $scope.updateProduct = () => {
         ProductService.updateProduct($scope.Product)
            .then((res) => {
                $scope.loadProducts();
            }, (err) => {

            });
    };

    $scope.deleteProduct = (productId, linkImg) => {
        ProductService.deleteProduct(productId, linkImg)
            .then((res) => {
                $scope.loadProducts();
            }, (err) => {

            });
    };

    $scope.chooseProductStatus = (productStatus) => {
        console.log(productStatus);
        $scope.newProduct.productStatus = productStatus;
    };

    $scope.toggleImage = () => {
        $scope.changeImage = true;
    };
   
    $scope.changeImg = () => {
        console.log($scope.fileChanged);
        $scope.upload($scope.fileChanged);
    };

    $scope.getImgeUpload = (files) => {
        $scope.imageUpload = files;
        $scope.isImgName = true;
    };

    $scope.upload = function (files, option, resolve, reject) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i]; 
              if (!file.$error) {
                    UploadFile.uploadProductImg(file)
                        .then(function (resp) {
                            console.log(resp);
                            if (option == 'upload') {
                                $scope.newProduct.originalImg = resp.data.filename;
                                $scope.newProduct.linkImg = resp.data.path;
                                $scope.realImgLink = $scope.ImgLink + $scope.newProduct.linkImg;
                                $scope.canAdd = true;
                            } else if (option == 'change') {
                                $scope.Product.originalImg = resp.data.filename;
                                $scope.Product.linkImg = resp.data.path;
                                $scope.realImgLink = $scope.ImgLink + $scope.Product.linkImg;
                            }
                            resolve('Success');
                            // $timeout(function() {
                            //     $scope.log = 'file: ' +
                            //     resp.config.data.file.name + ', Response: ' + JSON.stringify(resp.data) + '\n' + $scope.log;
                            // });
                        }, null, function (evt) {
                            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                            $scope.process = progressPercentage;
                            $scope.linkImg = "/img/product/" + evt.config.data.file.name;
                            $scope.log = 'progress: ' + progressPercentage + '% ' + evt.config.data.file.name + '\n' + $scope.log;
                            console.log(evt.config.data.file);
                        });
                } else {
                  reject('anh bi loi');
                }
            }
        } else {
            reject('Loi chieu dai');
        }
    };

});