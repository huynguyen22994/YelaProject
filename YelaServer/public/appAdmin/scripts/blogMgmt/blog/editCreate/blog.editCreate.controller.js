(function() {
    'use strict';

    angular
        .module('YelaApplication.BlogMgmt')
        .controller('BlogCreateController', ControllerController);

    ControllerController.$inject = ['BlogService', '$scope', '$window', '$location', '$route', 'toastr', 'Upload', '$q', 'ylConstant'];
    function ControllerController(BlogService, $scope, $window, $location, $route, toastr, Upload, $q, ylConstant) {
        var vm = this;
        vm.Blog = {};
        vm.options = {
            language: 'en',
            allowedContent: true,
            entities: false,
            filebrowserImageUploadUrl: '/api/blog/upload',
            filebrowserBrowseUrl: '/upload/images/blogs',
            filebrowserUploadUrl: '/upload/images/blogs',
            extraPlugins: 'uploadimage'
            // extraPlugins: 'imagebrowser'
        };
        vm.typeObj = {};
        vm.croppedDataUrl = '';
        vm.types = [
            {
                id: 'food',
                name: 'Món Ăn'
            },
            {
                id: 'nutrition',
                name: 'Dinh Dưỡng'
            },
            {
                id: 'lowcarb',
                name: 'Low Carb'
            },
            {
                id: 'discover',
                name: 'Khám Phá'
            }
        ]

        vm.cancel = cancel;
        vm.onReady = onReady;
        vm.isCreate = isCreate;
        vm.isEdit = isEdit;
        vm.create = create;
        vm.edit = edit;

        active();
        //////////////////////////////////
        function active() {
            if (isEdit()) {
                let id = _.get($route, 'current.params.id');
                loadBlogEdit(id);
            }
        }

        function cancel() {
            $location.path('/blogMgmt/blogs');
        }

        function onReady() {

        }

        function isCreate() {
            return (_.get($route, 'current.$$route.routeId') === 'create') ? true : false;
        };

        function isEdit() {
            return (_.get($route, 'current.$$route.routeId') === 'edit') ? true : false;
        };

        function create(dataUrl, name) {
            let result = {
                imgPath: null
            };
            let blogObj = {
                title: vm.Blog.title,
                imageLink: vm.Blog.linkImg,
                description: vm.Blog.description,
                summary: vm.Blog.summary,
                type: vm.typeObj.id,
                urlKey: vm.Blog.urlKey
            };

            if (name) {
                let promise = uploadImg(dataUrl, name);

                promise.then(function (resObj) {
                    blogObj.imageLink = resObj.imgPath;
                    BlogService.createBlog(blogObj)
                        .then(function (res) {
                            toastr.success('Tạo mới bài viết thành công');
                            $location.path('/blogMgmt/blogs');
                        }).catch(function (err) {
                            toastr.error('Tạo mới bài viết thất bại');
                        });
                }, function (err) {
                    
                });
            } else {
                BlogService.createBlog(productObj)
                    .then(function (res) {
                        toastr.success('Tạo mới bài viết thành công');
                        $location.path('/blogMgmt/blogs');
                    }).catch(function (err) {
                        toastr.error('Tạo mới bài viết thất bại');
                    });
            }
        };

        function uploadImg(data, name) {
            let promiseUploadImage = $q(function (resolve, reject) {
                let imgPath = null;
                let originalName = null;
                Upload.upload({
                    url: '/api/product/upload',
                    data: {
                        file: Upload.dataUrltoBlob(data, name)
                    },
                }).then(function (response) {
                    let resObj = {
                        imgPath: response.data.path,
                        originalName: response.data.originalname
                    };
                    resolve(resObj);
                }, function (response) {
                    if (response.status > 0) $scope.errorMsg = response.status
                        + ': ' + response.data;
                    reject(response);
                });
            });
            return promiseUploadImage;
        };

        function loadBlogEdit(id) {
            BlogService.getBlogById(id)
                .then(function (res) {
                    vm.Blog = res.data;
                    vm.croppedDataUrl = `${ylConstant.serverUrl}/${res.data.imageLink}`;
                    vm.typeObj = _.find(vm.types, function(type) {
                        return type.id === vm.Blog.type;
                    });
            }).catch(function (err) {
                console.log(err);
                toastr.error('Xảy ra lỗi khi tải bài viết!');
            });
        }

        function edit(dataUrl, name) {
            let blogObj = {
                blogId: vm.Blog.blogId,
                title: vm.Blog.title,
                description: vm.Blog.description,
                imageLink: vm.Blog.linkImg,
                summary: vm.Blog.summary,
                type: vm.typeObj.id,
                urlKey: vm.Blog.urlKey
            };
            if (name) {
                 let promise = uploadImg(dataUrl, name);

                promise.then(function (resObj) {
                    blogObj.imageLink = resObj.imgPath;
                    BlogService.updateBlog(blogObj)
                        .then(function (res) {
                            toastr.success('Tạo mới thành công');
                            $location.path('/blogMgmt/blogs');
                        }).catch(function (err) {
                            toastr.error('Tạo mới thất bại');
                        });
                }, function (err) {
                    
                });
            } else {
                BlogService.updateBlog(blogObj)
                    .then(function (res) {
                        toastr.success('Cập nhật thành công');
                        $location.path('/blogMgmt/blogs');
                    }).catch(function (err) {
                        toastr.error('Cập nhật thất bại');
                    });
            };      
        }

    }
})();