app.controller('RootCtrl', function($scope, HomeService, jwtHelper, LoginService, $routeParams){

    // get id for product details    
    $scope.productId = '';
    $scope.customerLogined = false;

    $scope.initialization = () => {
        $scope.getCategories();
        $scope.loadSessionCurrent();
        $scope.getBrands();
    };

    $scope.getCategories = () => {
        HomeService.getCategories()
            .then((res) => {
                $scope.categories = res.data;
            }, (err) => {

            });
    };

    $scope.getProductTypebycategoryId = (categoryId) => {
        HomeService.getProductTypebycategoryId(categoryId)
            .then((res) => {
                $scope.producttypebyid = res.data;
            }, (err) => {

            });
    };

    $scope.loadSessionCurrent = () => {
        if (sessionStorage.token == "undefined") {
            $scope.customerLogined = false;
        } else if (sessionStorage.token && sessionStorage.token != "0") {
            $scope.currentSession = jwtHelper.decodeToken(sessionStorage.token);
            $scope.FullName = $scope.currentSession.firstName + " " + $scope.currentSession.lastName;
            $scope.customerLogined = true;
            $scope.customerHasImg = ($scope.currentSession.avatarLink) ? true : false;
        } else {
            $scope.customerLogined = false;
        }
    };

    $scope.logout = () => {
        LoginService.logout()
            .then((res) => {
                sessionStorage.token = res.data.token;
                $scope.loadSessionCurrent();
            }, (err) => {

            });
    };

    $scope.getBrands = () => {
        HomeService.getBrands()
            .then((res) => {
                $scope.brands = res.data;
            }, (err) => {

            });
    };

    $scope.filterImgLink = (imgLink) => {
        console.log(imgLink);
        if (imgLink == null && imgLink == '') {
            return '';
        } else {
            let link = imgLink.replace('public\client', '');
            return link;
        }
    };

});