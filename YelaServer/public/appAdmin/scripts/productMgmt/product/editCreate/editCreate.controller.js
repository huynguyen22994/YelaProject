(function() {
    'use strict';

    angular
        .module('YelaApplication.ProductMgmt')
        .controller('ProductCreateController', ControllerController);

    ControllerController.$inject = ['ProductService', '$scope', '$window', '$location', '$route', 'toastr', 'Upload', '$q', 'ylConstant'];
    function ControllerController(ProductService, $scope, $window, $location, $route, toastr, Upload, $q, ylConstant) {
        console.log(ylConstant);
        var vm = this;
        vm.Product = {};
        vm.Producttype = {};
        vm.Brand = {};
        vm.ProductStatus = {};
        vm.typeObj = {};
        vm.isCreate = isCreate;
        vm.isEdit = isEdit;
        vm.create = create;  
        vm.edit = edit;
        vm.cancel = cancel;
        vm.croppedDataUrl = '';
        vm.productStatus = [
            {
                id: 'new',
                name: 'Mới'
            },
            {
                id: 'old',
                name: 'Cũ'
            },
            {
                id: 'normal',
                name: 'Bình thường'
            },
            {
                id: 'bestseller',
                name: 'Bán chạy'
            },
            {
                id: 'prominentest',
                name: 'Nổi bật'
            }
        ];
        vm.types = [
            { id: 'food', name: 'Món Ăn'},
            { id: 'resource', name: 'Nguyên Liệu'},
            { id: 'drink', name: 'Thức Uống'},
            { id: 'cake', name: 'Bánh'}
        ];

        vm.isSelectedBrand = isSelectedBrand;
        vm.isSelectedProducttype = isSelectedProducttype;
        vm.isSelectedStatus = isSelectedStatus;
        //vm.isSelectedType = isSelectedType;

        activate();

        ////////////////

        async function activate() {
            vm.producttypes = await loadProducttype();
            vm.brands = await loadBrand();
            
            if (isCreate()) {

            } else {
                let id = _.get($route, 'current.params.id');
                loadProductEdit(id);
            }
        };

        function loadProductEdit(id) {
            ProductService.getProductById(id)
                .then(function (res) {
                    vm.Product = res.data;
                    vm.croppedDataUrl = `${ylConstant.serverUrl}/${res.data.linkImg}`;
                    vm.Producttype = _.find(vm.producttypes, function (producttype) {
                        return producttype.productTypeId === res.data.productTypeId
                    });
                    vm.Brand = _.find(vm.brands, function (brand) {
                        return brand.brandId === res.data.brandId;
                    });
                    vm.ProductStatus = _.find(vm.productStatus, function (status) {
                        return status.id === res.data.productStatus; 
                    });
                    vm.typeObj = _.find(vm.types, function(type) {
                        return type.id === res.data.type;
                    });
            }).catch(function (err) {
                console.log(err);
                toastr.error('Have error when get product');
            });
        };

        function loadProducttype() {
            return new Promise((resolve, reject) => {
                ProductService.getAllProducttypes()
                    .then(function (producttypes) {
                        //vm.producttypes = producttypes.data;
                        resolve(producttypes.data);
                    }).catch(function (err) {
                        console.log(err);
                        reject(err);
                    });
            });
        };

        function loadBrand() {
            return new Promise((resolve, reject) => {
                ProductService.getAllBrands()
                    .then(function (brands) {
                        //vm.brands = brands.data;
                        resolve(brands.data);
                    }).catch(function (err) {
                        console.log(err);
                        reject(err);
                    });
            });
        };

        function isCreate() {
            return (_.get($route, 'current.$$route.routeId') === 'create') ? true : false;
        };

        function isEdit() {
            return (_.get($route, 'current.$$route.routeId') === 'edit') ? true : false;
        };

        function create(dataUrl, name) {
            let result = {
                imgPath: null
            };
            let productObj = {
                name: vm.Product.name,
                price: vm.Product.price,
                discribe: vm.Product.discribe,
                quantity: vm.Product.quantity,
                productStatus: vm.ProductStatus.id,
                productTypeId: vm.Producttype.productTypeId,
                brandId: vm.Brand.brandId,
                type: vm.typeObj.id
            };

            if (name) {
                let promise = uploadImg(dataUrl, name);

                promise.then(function (resObj) {
                    productObj.originalImg = resObj.originalName;
                    productObj.linkImg = resObj.imgPath;
                    ProductService.createProduct(productObj)
                        .then(function (res) {
                            toastr.success('Tạo mới thành công');
                            $location.path('/productMgmt/product');
                        }).catch(function (err) {
                            toastr.error('Tạo mới thất bại');
                        });
                }, function (err) {
                    
                });
            } else {
                ProductService.createProduct(productObj)
                    .then(function (res) {
                        toastr.success('Tạo mới thành công');
                        $location.path('/productMgmt/product');
                    }).catch(function (err) {
                        toastr.error('Tạo mới thất bại');
                    });
            }
        };

        function edit(dataUrl, name) {
            let productObj = {
                productId: vm.Product.productId,
                name: vm.Product.name,
                price: vm.Product.price,
                discribe: vm.Product.discribe,
                quantity: vm.Product.quantity,
                linkImg: vm.Product.linkImg,
                originalImg: vm.Product.originalImg,
                productStatus: vm.ProductStatus.id,
                productTypeId: vm.Producttype.productTypeId,
                brandId: vm.Brand.brandId,
                type: vm.typeObj.id
            };
            if (name) {
                 let promise = uploadImg(dataUrl, name);

                promise.then(function (resObj) {
                    productObj.originalImg = resObj.originalName;
                    productObj.linkImg = resObj.imgPath;
                    ProductService.updateProduct(productObj)
                        .then(function (res) {
                            toastr.success('Tạo mới thành công');
                            $location.path('/productMgmt/product');
                        }).catch(function (err) {
                            toastr.error('Tạo mới thất bại');
                        });
                }, function (err) {
                    
                });
            } else {
                ProductService.updateProduct(productObj)
                    .then(function (res) {
                        toastr.success('Cập nhật thành công');
                        $location.path('/productMgmt/product');
                    }).catch(function (err) {
                        toastr.error('Cập nhật thất bại');
                    });
            };      
        };

        function uploadImg(data, name) {
            let promiseUploadImage = $q(function (resolve, reject) {
                let imgPath = null;
                let originalName = null;
                Upload.upload({
                    url: '/api/product/upload',
                    data: {
                        file: Upload.dataUrltoBlob(data, name)
                    },
                }).then(function (response) {
                    let resObj = {
                        imgPath: response.data.path,
                        originalName: response.data.originalname
                    };
                    resolve(resObj);
                }, function (response) {
                    if (response.status > 0) $scope.errorMsg = response.status
                        + ': ' + response.data;
                    reject(response);
                });
            });
            return promiseUploadImage;
        };

        function cancel() {
            $location.path('/productMgmt/product');
        };

        function isSelectedStatus() {
            return vm.ProductStatus.id ? true : false;
        };

        function isSelectedType() {
            return vm.typeObj.id ? true : false;
        };

        function isSelectedBrand() {
            return vm.Brand.brandId ? true : false;
        };

        function isSelectedProducttype() {
            return vm.Producttype.productTypeId ? true : false;
        };
    }
})();