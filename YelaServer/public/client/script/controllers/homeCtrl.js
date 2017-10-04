app.controller('HomeCtrl', function($scope, HomeService, config, Value){

    $scope.offset = 0;
    $scope.countProductNew = 0;
    $scope.offsetProductBestseller = 0;
    $scope.countProductBestseller = 0;

    $scope.initialization = () => {
        $scope.loadProductFreature();
        $scope.loadProductNew();
        $scope.loadProductBestseller();
        $scope.loadSlider();
    };

    $scope.loadProductFreature = () => {
        HomeService.getProductFreature()
            .then((res) => {
                $scope.productFreatures = res.data.rows;
            }, (err) => {

            });
    };

    $scope.setProductId = (productId) => {
        // productId in rootCtrl
        Value.productId = productId;
    };

    $scope.loadProductNew = () => {
        HomeService.getProductNew($scope.offset)
            .then((res) => {
                $scope.getProductNews = res.data.rows;
                $scope.countProductNew = res.data.count;
                if ($scope.offset == 0) {
                    $scope.leftDisableProNew = true;
                }
            }, (err) => {

            });
    };

    $scope.rightProductNew = () => {
        $scope.offset = $scope.offset + 3;
        $scope.leftDisableProNew = false;
        HomeService.getProductNew($scope.offset)
            .then((res) => {
                $scope.getProductNews = res.data.rows;
                $scope.countProductNew = $scope.countProductNew - 3; 
                if ($scope.offset >= $scope.countProductNew) {
                    $scope.rightDisableProNew = true;
                }
            }, (err) => {

            });
    };

    $scope.leftProductNew = () => {
        $scope.offset = $scope.offset - 3;
        $scope.rightDisableProNew = false;
        HomeService.getProductNew($scope.offset)
            .then((res) => {
                $scope.getProductNews = res.data.rows;
                $scope.countProductNew = $scope.countProductNew + 3; 
                if ($scope.offset == 0) {
                    $scope.leftDisableProNew = true;
                }
            }, (err) => {

            });
    };

    $scope.loadProductBestseller = () => {
        HomeService.getProductBestseller($scope.offsetProductBestseller)
            .then((res) => {
                console.log(res);
                $scope.getProductBestsellers = res.data.rows;
                $scope.countProductBestseller = res.data.count;
                if ($scope.offsetProductBestseller == 0) {
                    $scope.leftDisableProBestseller = true;
                }
            }, (err) => {

            });
    };

    $scope.rightProductBestseller = () => {
        $scope.offsetProductBestseller = $scope.offsetProductBestseller + 3;
        $scope.leftDisableProBestseller = false;
        HomeService.getProductBestseller($scope.offsetProductBestseller)
            .then((res) => {
                $scope.getProductBestsellers = res.data.rows;
                $scope.countProductBestseller = $scope.countProductBestseller - 3; 
                if ($scope.offsetProductBestseller >= $scope.countProductBestseller) {
                    $scope.rightDisableProBestseller = true;
                }
            }, (err) => {

            });
    };

    $scope.leftProductBestseller = () => {
        $scope.offsetProductBestseller = $scope.offsetProductBestseller - 3;
        $scope.rightDisableProBestseller = false;
        HomeService.getProductBestseller($scope.offsetProductBestseller)
            .then((res) => {
                $scope.getProductBestsellers = res.data.rows;
                $scope.countProductBestseller = $scope.countProductBestseller + 3; 
                if ($scope.offsetProductBestseller == 0) {
                    $scope.leftDisableProBestseller = true;
                }
            }, (err) => {

            });
    };

    $scope.loadSlider = () => {
        HomeService.getSliderEnable()
            .then((res) => {
                $scope.slider = res.data;
            }, (err) => {

            });
    };

});