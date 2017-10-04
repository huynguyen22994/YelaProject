app.controller('DetailCtrl', function($scope, DetailService, config, $interval, $routeParams, $window){


    $scope.initialization = () => {
        $scope.loadProductDetail();
    };

    $scope.loadProductDetail = () => {
        if ($routeParams.id){
            DetailService.getProductBrandProTypeByProductId($routeParams.id)
                .then((res) => {
                    $scope.product = res.data;
                    console.log($scope.product);
                }, (res) => {

                });
        } else {
            $window.location.href = '/';
        }
    };

    $interval(() => {
        $scope.Date = Date.now();
    }, 1000)

});