app.controller('ProductTypeAdminCtrl', function($scope, ProductTypeService, CategoryService){

    $scope.newProductType = {};
    $scope.ProductType = {};

    $scope.initialization = () => {
        $scope.loadProductTypes();
        $scope.loadCategories();
    };

    $scope.loadProductTypes = () => {
        ProductTypeService.getProductTypes().then((res) => {
            console.log(res);
            $scope.productTypes = res.data;
        }, (err) => {
            console.log(err);
        })
    };

    $scope.loadCategories = () => {
        CategoryService.getCategories().then((res) => {
            $scope.categories = res.data;
        }, (err) => {
            console.log(err);
        });
    };

    $scope.createProductType = (selectedCategory) => {
        $scope.newProductType.categoryId = selectedCategory.categoryId;
        ProductTypeService.createProductType($scope.newProductType)
            .then((res) => {
                $scope.loadProductTypes();
                $scope.newProductType = {};
            }, (err) => {

            });
    };

    $scope.updateProductType = () => {
        ProductTypeService.updateProductType($scope.ProductType)
            .then((res) => {
                $scope.loadProductTypes();
            }, (err) => {

            });
    };

    $scope.detailProductType = (productTypeId) => {
        ProductTypeService.getOneProductType(productTypeId)
            .then((res) => {
                $scope.ProductType = res.data;
            }, (err) => {

            });
    };

    $scope.deleteProductType = (productTypeId) => {
        ProductTypeService.deleteProductType(productTypeId)
            .then((res) => {
                $scope.loadProductTypes();
            }, (err) => {

            });
    };

});