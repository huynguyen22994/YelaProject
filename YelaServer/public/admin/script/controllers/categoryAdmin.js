app.controller('CategoryAdminCtrl', function($scope, CategoryService){

    $scope.newCategory = {};
    $scope.Category = {};

    $scope.initialization = () => {
        $scope.loadCategories();
    };

    $scope.loadCategories = () => {
        CategoryService.getCategories().then((res) => {
            console.log(res);
            $scope.categories = res.data;
        }, (err) => {
            console.log(err);
        })
    };

    $scope.createCategory = () => {
        CategoryService.createCategory($scope.newCategory)
            .then((res) => {
                $scope.loadCategories();
                $scope.newCategory = {};
            }, (err) => {

            });
    };

    $scope.updateCategory = () => {
        CategoryService.updateCategory($scope.Category)
            .then((res) => {
                $scope.loadCategories();
            }, (err) => {

            });
    };

    $scope.detailCategory = (categoryId) => {
        CategoryService.getOneCategory(categoryId)
            .then((res) => {
                $scope.Category = res.data;
            }, (err) => {

            });
    };

    $scope.deleteCategory = (categoryId) => {
        CategoryService.deleteCategory(categoryId)
            .then((res) => {
                $scope.loadCategories();
            }, (err) => {

            });
    };

});