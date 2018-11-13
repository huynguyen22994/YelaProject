(function() {
    'use strict';

    angular
        .module('Tab', [])
        .directive('tab', Directive);

    Directive.$inject = [];
    function Directive() {
        var directive = {
            controller: ControllerController,
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
            },
            templateUrl: 'scripts/clientComponents/tab/tab.directive.html'
        };
        return directive;
        
    }
    /* @ngInject */
    function ControllerController ($scope, $http, $location) {
        var vm = this;
        vm.tabMenuConfig = {
            tabs: [
                {
                    id: '#posts',
                    label: 'posts',
                    isChoosen: true,
                    items: [
                        // {
                        //     label: 'Easy Polo Black Edition',
                        //     image: 'images/home/gallery1.jpg'
                        // }
                    ]
                },
                {
                    id: '#newPosts',
                    label: 'newPosts',
                    isChoosen: false,
                    items: [
                        {
                            label: 'Easy Polo Black Edition',
                            image: 'images/home/gallery2.jpg'
                        }
                    ]
                }
            ]
        };

        vm.onChooseTab = onChooseTab;
        vm.view = view;

        active();
        //////////////////////////////
        function active() {
            getAllBlog();
        }

        function getAllBlog() {
            getBlogs().then(function(response) {
                console.log(response);
                var data = response.data;
                var listBog = parseBlog(data.blogs);
                vm.tabMenuConfig.tabs[0].items = listBog;
            }).catch(function(error) {
                console.log(error);
            });
        }

        function onChooseTab(key) {
            angular.forEach(vm.tabMenuConfig.tabs, function(tab) {
                if(tab.id === key) {
                    tab.isChoosen = true;
                } else {
                    tab.isChoosen = false;
                }
            })
        }

        function getBlogs() {
            return $http({
                url: '/api/blog',
                method: 'GET'
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

        function parseBlog(listBlog) {
            var result = [];
            angular.forEach(listBlog, function(blog) {
                result.push({
                    id: blog.blogId,
                    label: blog.title,
                    image: blog.imageLink
                });
            })
            return result;
        }

        function view(contentId, tabId) {
            console.log(contentId);
            $location.path(`/blog/${contentId}`);
        }
    }
})();