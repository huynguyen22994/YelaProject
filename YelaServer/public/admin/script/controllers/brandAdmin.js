app.controller('BrandAdminCtrl', function($scope, BrandService){

    $scope.newBrand = {};
    $scope.Brand = {};

    $scope.initialization = () => {
        $scope.loadBrands();
    };

    $scope.loadBrands = () => {
        BrandService.getBrands().then((res) => {
            console.log(res);
            $scope.brands = res.data;
        }, (err) => {
            console.log(err);
        })
    };

    $scope.createBrand = () => {
        BrandService.createBrand($scope.newBrand)
            .then((res) => {
                $scope.loadBrands();
                $scope.newBrand = {};
            }, (err) => {

            });
    };

    $scope.updateBrand = () => {
        BrandService.updateBrand($scope.Brand)
            .then((res) => {
                $scope.loadBrands();
            }, (err) => {

            });
    };

    $scope.detailBrand = (brandId) => {
        BrandService.getOneBrand(brandId)
            .then((res) => {
                $scope.Brand = res.data;
            }, (err) => {

            });
    };

    $scope.deleteBrand = (brandId) => {
        BrandService.deleteBrand(brandId)
            .then((res) => {
                $scope.loadBrands();
            }, (err) => {

            });
    };

});