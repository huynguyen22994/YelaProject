(function() {
    'use strict';

    angular
        .module('YelaAppClient.Blog')
        .controller('BlogController', ControllerController);

    ControllerController.$inject = ['BlogService', '$route', 'clientConstant', '$location'];
    function ControllerController(BlogService, $route, clientConstant, $location) {
        var vm = this;
        vm.blogs = [];
        vm.readMore = readMore;
        vm.getFormatDate = getFormatDate;
        vm.goToBlogsByType = goToBlogsByType;

        activate();
        ////////////////

        async function activate() { 
            let blogType = $route.current.params.id;
            if(blogType) {
                await loadBlogsByType(blogType, 0);
            } else {
                await loadBlogs();
            }
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

        function loadBlogsByType(type, offset) {
            return new Promise((resolve, reject) => {
                BlogService.getBlogsByType(type, offset)
                    .then(function (response) {
                        var data = response.data;
                        vm.blogs = data.rows;
                        resolve(vm.blogs);
                    }).catch(function (err) {
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

        function readMore(blog) {
            if(blog) {
                $location.path(`/blog/${blog.blogId}`);
            }
        };

        function goToBlogsByType(type) {
            $location.path(`/blogs/${type}`);
        };

    }
})();