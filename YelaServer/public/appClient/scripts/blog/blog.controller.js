(function() {
    'use strict';

    angular
        .module('YelaAppClient.Blog')
        .controller('BlogController', ControllerController);

    ControllerController.$inject = ['BlogService', '$route', 'clientConstant', '$location'];
    function ControllerController(BlogService, $route, clientConstant, $location) {
        var vm = this;
        let blogType = $route.current.params.id;
        vm.blogs = [];
        vm.pageArray = [];
        vm.readMore = readMore;
        vm.getFormatDate = getFormatDate;
        vm.goToBlogsByType = goToBlogsByType;
        vm.changePage = changePage;
        vm.paging = {
            offset: 0,
            limit: 6
        };

        activate();
        ////////////////

        async function activate() { 
            if(blogType) {
                await loadBlogsByType(blogType, vm.paging.offset, vm.paging.limit, true);
            } else {
                await loadBlogs(vm.paging.offset, vm.paging.limit, true);
            }
        };

        function loadBlogs(offset, limit, isNew) {
            return new Promise((resolve, reject) => {
                BlogService.getBlogs(offset, limit)
                    .then(function (response) {
                        var data = response.data;
                        vm.blogs = data.blogs;
                        if(isNew) {
                            setPage(data.count, vm.blogs.length, vm.paging.limit)  
                        }
                        resolve(vm.blogs);
                    }).catch(function (err) {
                        console.log(err);
                        reject(err);
                    });
            });
        };

        function loadBlogsByType(type, offset, limit, isNew) {
            return new Promise((resolve, reject) => {
                BlogService.getBlogsByType(type, offset, limit)
                    .then(function (response) {
                        var data = response.data;
                        vm.blogs = data.rows;
                        if(isNew) {
                            setPage(data.count, vm.blogs.length, vm.paging.limit)  
                        }
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

        function setPage(total, dataLength, limit, currentPage) {
            vm.currentPage = currentPage || 1;
            vm.pageTotal = Math.ceil(total / dataLength);
            for (let i = 1; i <= vm.pageTotal; i++) {
                let pageObj = {
                    offset: (i - 1) * limit,
                    limit: limit,
                    page: i
                };
                vm.pageArray.push(pageObj);
            };
            // flag = true;
        };

        function changePage(offset, limit, currentPage) {
            vm.currentPage = currentPage;
            change(offset, limit);
            async function change(offset, limit) {
                if(blogType) {
                    await loadBlogsByType(blogType, offset, limit);
                } else {
                    await loadBlogs(offset, limit);
                }
            };
        };

    }
})();