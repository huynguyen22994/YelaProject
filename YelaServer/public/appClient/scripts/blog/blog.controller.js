(function() {
    'use strict';

    angular
        .module('YelaAppClient.Blog')
        .controller('BlogController', ControllerController);

    ControllerController.$inject = ['BlogService', '$route', 'clientConstant'];
    function ControllerController(BlogService, $route, clientConstant) {
        var vm = this;
        vm.blogs = [];
    
        activate();
        ////////////////

        async function activate() { 
            //let productId = _.get($route, 'current.params.id');
            await loadBlogs();
            //await loadProductBestsellers(vm.RecommendProduct.offset, vm.RecommendProduct.limit);
        };

        function loadBlogs() {
            return new Promise((resolve, reject) => {
                BlogService.getBlogs()
                    .then(function (response) {
                        var data = response.data;
                        vm.blogs = data.blogs;
                        console.log(response);
                        //vm.blog.linkImg = `${clientConstant.serverUrl}/${vm.blog.linkImg}`;
                        // var date = new Date(vm.blog.createdAt);
                        resolve(vm.blogs);
                    }).catch(function (err) {
                        console.log(err);
                        reject(err);
                    });
            });
        };

        function getFormatDate(dateString) {
            if(dateString) {
                var date = new Date(dateString);
                return date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear();
            }
            return dateString;
        };

    }
})();