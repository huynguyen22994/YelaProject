app.controller('SliderAdminCtrl', function($scope, SliderService, UploadFile, $q, config){

    $scope.newSlider = {};
    $scope.newSlider.status = 'enable';
    $scope.Slider = {};
    $scope.ImgLink = config.ImgLink;
    $scope.imageUpload = [];
    $scope.optionEnum = {
        upload: 'upload',
        change: 'change'
    };


    $scope.initialization = () => {
        $scope.loadSliders();
    };

    $scope.loadSliders = () => {
        SliderService.getSliders().then((res) => {
            $scope.sliders = res.data.rows;
        }, (err) => {
            console.log(err);
        })
    };

    $scope.createSlider = () => {
        $scope.newSlider.imgSlider1 = $scope.filterImg($scope.newSlider.imgSlider1);
        $scope.newSlider.imgSlider2 = $scope.filterImg($scope.newSlider.imgSlider2);
        $scope.newSlider.imgSlider3 = $scope.filterImg($scope.newSlider.imgSlider3);
        $scope.newSlider.imgPrice1 = $scope.filterImg($scope.newSlider.imgPrice1);
        $scope.newSlider.imgPrice2 = $scope.filterImg($scope.newSlider.imgPrice2);
        $scope.newSlider.imgPrice3 = $scope.filterImg($scope.newSlider.imgPrice3);
        SliderService.createSlider($scope.newSlider)
            .then((res) => {
                $scope.newSlider = {};
                $scope.ImgSlider1 = $scope.ImgSlider2 = $scope.ImgSlider3 = $scope.ImgPrice1 = $scope.ImgPrice2 = $scope.ImgPrice3 = {};
                $scope.loadSliders();
            }, (err) => {

            });
    };

    $scope.UploadImage = (ImgType) => {
        if (ImgType == 'ImgSlider1') {
            var promise = $q((resolve, reject) => {
                $scope.upload($scope.ImgSlider1, $scope.optionEnum.upload, resolve, reject);
            });
            promise.then((data) => {
                console.log(data);
                $scope.newSlider.imgSlider1 = data.data.path;
            }, (err) => {

            });
        } else if (ImgType == 'ImgPrice1') {
            var promise = $q((resolve, reject) => {
                $scope.upload($scope.ImgPrice1, $scope.optionEnum.upload, resolve, reject);
            });
            promise.then((data) => {
                console.log(data);
                $scope.newSlider.imgPrice1 = data.data.path;
            }, (err) => {

            });
        } else if (ImgType == 'ImgSlider2') {
            var promise = $q((resolve, reject) => {
                $scope.upload($scope.ImgSlider2, $scope.optionEnum.upload, resolve, reject);
            });
            promise.then((data) => {
                console.log(data);
                $scope.newSlider.imgSlider2 = data.data.path;
            }, (err) => {

            });
        } else if (ImgType == 'ImgPrice2') {
            var promise = $q((resolve, reject) => {
                $scope.upload($scope.ImgPrice2, $scope.optionEnum.upload, resolve, reject);
            });
            promise.then((data) => {
                console.log(data);
                $scope.newSlider.imgPrice2 = data.data.path;
            }, (err) => {

            });
        } else if (ImgType == 'ImgSlider3') {
            var promise = $q((resolve, reject) => {
                $scope.upload($scope.ImgSlider3, $scope.optionEnum.upload, resolve, reject);
            });
            promise.then((data) => {
                console.log(data);
                $scope.newSlider.imgSlider3 = data.data.path;
            }, (err) => {

            });
        } else if (ImgType == 'ImgPrice3') {
            var promise = $q((resolve, reject) => {
                $scope.upload($scope.ImgPrice3, $scope.optionEnum.upload, resolve, reject);
            });
            promise.then((data) => {
                console.log(data);
                $scope.newSlider.imgPrice3 = data.data.path;
            }, (err) => {

            });
        } else {

        }
    };

    $scope.getImgeUpload = (file, ImgType) => {
        if (ImgType == 'ImgSlider1') {
            $scope.ImgSlider1 = file;
        } else if (ImgType == 'ImgPrice1') {
            $scope.ImgPrice1 = file;
        } else if (ImgType == 'ImgSlider2') {
            $scope.ImgSlider2 = file;
        } else if (ImgType == 'ImgPrice2') {
            $scope.ImgPrice2 = file;
        } else if (ImgType == 'ImgSlider3') {
            $scope.ImgSlider3 = file;
        } else if (ImgType == 'ImgPrice3') {
            $scope.ImgPrice3 = file;
        } else {

        }
    };

    // $scope.updateCategory = () => {
    //     CategoryService.updateCategory($scope.Category)
    //         .then((res) => {
    //             $scope.loadCategories();
    //         }, (err) => {

    //         });
    // };

    $scope.detailSlider = (sliderId) => {
        SliderService.getOneSlider(sliderId)
            .then((res) => {
                $scope.Slider = res.data;
            }, (err) => {

            });
    };

    $scope.deleteSlider = (sliderId) => {
        SliderService.deleteSlider(sliderId)
            .then((res) => {
                $scope.loadSliders();
            }, (err) => {

            });
    };

    $scope.upload = function (file, option, resolve, reject) {
        if (file) {
            UploadFile.uploadSliderImg(file)
                .then(function (resp) {
                    if (option == 'upload') {

                    } else if (option == 'change') {

                    }
                    resolve(resp);
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
    };

    $scope.setEnableSlider = () => {
        console.log($scope.enableSlider);
    };

    $scope.filterImg = (imgLink) => {
        if (imgLink) {
            return imgLink.slice(14);
        } else {
            return null;
        };
    }

});