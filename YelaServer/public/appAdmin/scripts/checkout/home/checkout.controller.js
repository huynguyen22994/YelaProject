(function() {
    'use strict';

    angular
        .module('YelaApplication.CheckoutMgmt')
        .controller('CheckoutController', ControllerController);

    ControllerController.$inject = ['$scope', 'ProductService', 'checkoutService', 'toastr', '$rootScope', '$timeout'];
    function ControllerController($scope, ProductService, checkoutService, toastr, $rootScope, $timeout) {
        var vm = this;
        vm.classForTable = 'full-width';
        vm.classForDetail = '';
        vm.products = [];
        vm.productsForGilfs = [];
        vm.billData = [];
        vm.billByDayDataList = [];
        vm.ticketNumber = null;
        vm.taking = 'noTake';
        vm.takingPrice = 0;
        vm.configButtonHeader = {
            arrayButton: [
                {
                    buttonName: 'Xem Danh Sách Đơn Hàng ',
                    className: 'btn btn-default pull-left',
                    iconClass: 'fa fa-list',
                    tooltipTitle: 'Xem Danh Sách Đơn Hàng',
                    action() {
                        viewCheckoutList();
                    }
                }
            ],
            arrayInput: [
                {
                    className: 'form-control',
                    modelName: 'searchText',
                    modelOptions: { debounce: 500},
                    placeholder: 'Tìm Sản Phẩm',
                    tooltipTitle: 'Tìm Sản Phẩm',
                    change(Input) {
                        //search(Input);
                    }
                }
            ]
        };
        vm.configButtonHeaderCheckout = {
            arrayButton: [
                {
                    buttonName: 'Làm Mới',
                    className: 'btn btn-default pull-left',
                    iconClass: 'fa fa-refresh',
                    tooltipTitle: 'Làm Mới',
                    action() {
                        refresh();
                    }
                },
                {
                    buttonName: 'Thanh Toán',
                    className: 'btn btn-primary pull-right',
                    iconClass: 'fa fa-check',
                    tooltipTitle: 'Thanh Toán',
                    action() {
                        checkout();
                    }
                }
            ],
            arrayInput: [
                {
                    className: 'form-control',
                    modelName: 'searchText',
                    modelOptions: { debounce: 500},
                    placeholder: 'Số Phiếu Chờ',
                    tooltipTitle: 'Số Phiếu Chờ',
                    change(number) {
                        vm.ticketNumber = number;
                    }
                }
            ]
        };
        vm.configTable = {
            arrayColumnLabel: ['Sản Phẩm', 'SL', 'Giá', 'Mang Đi', 'Ưu Đãi', ''],
            arrayColumnContent: ['name', 'selectedQuantity', {
                formatterBase: function(item) {
                    var price = item['selectedQuantity'] * item['price'];
                    return parseCerrency(price);
                }
            },
            {
                formatterBase: function(product) {
                    // if((product['name'] === 'Mì Tỏi' || product['name'] === 'Cơm Vò') && !product._hightLight) {
                    //     if(vm.takingPrice) {
                    //         var priceFormated = vm.takingPrice * product['selectedQuantity'];
                    //         return parseCerrency(priceFormated);
                    //     } else {
                    //         return parseCerrency(0);
                    //     }
                    // } else if(product['name'] === 'Combo 1') {
                    //     if(vm.takingPrice) { 
                    //         return parseCerrency(3000 * product['selectedQuantity']);
                    //     } else {
                    //         return parseCerrency(0);
                    //     }
                    // } else if(product['name'] === 'Combo 2') {
                    //     if(vm.takingPrice) { 
                    //         return parseCerrency(6000 * product['selectedQuantity']);
                    //     } else {
                    //         return parseCerrency(0);
                    //     }
                    // } else if(product['name'] === 'Combo 3') {
                    //     if(vm.takingPrice) { 
                    //         return parseCerrency(9000 * product['selectedQuantity']);
                    //     } else {
                    //         return parseCerrency(0);
                    //     }
                    // } else {
                    //     return parseCerrency(0);
                    // }
                    if(product['takeAway'] === true) {
                        var price = product['selectedQuantity'] * 3000;
                        return parseCerrency(price);
                    } else {
                        return parseCerrency(0);
                    }
                }
            },
            {
                formatterBase: function(product) {
                    var item = angular.copy(product);
                    // if(item['productStatus'] === 'bestseller') {
                    //     var productPrice = getDiscount20Percent(item);
                    //     var price = item['selectedQuantity'] * productPrice;
                    //     return '-20%:' + parseCerrency(price);
                    // } else if ((item.name === 'Mì Tỏi' || item.name === 'Cơm Vò') && !item['_hightLight']) {
                    //     return 'Ưu Đãi';
                    // } else if(item['_hightLight']) {
                    //     return 'Tặng';
                    // }
                    if(item['_hightLight']) {
                        return 'Tặng';
                    }
                }
            }],
            arrayActions: [
                {
                    buttonName: 'Thêm',
                    className: 'btn btn-default',
                    iconClass: 'fa fa-plus',
                    tooltipTitle: 'Thêm',
                    action(item) {
                        increase(item);
                    }
                },
                {
                    buttonName: 'Giảm',
                    className: 'btn btn-default',
                    iconClass: 'fa fa-minus',
                    tooltipTitle: 'Giảm',
                    action(item, ev) {
                        reduction(item);
                    }
                },
                // {
                //     buttonName: 'Ưu Đãi',
                //     className: 'btn btn-success',
                //     iconClass: 'fa fa-gift',
                //     tooltipTitle: 'Ưu Đãi',
                //     disabled(item) {
                //         if((item.name === 'Mì Tỏi' || item.name === 'Cơm Vò') &&  !item._hightLight) {
                //             return false;
                //         } else {
                //             return true;
                //         }
                //     },
                //     action(item, ev) {
                //         takeGift(item);
                //     }
                // }
                {
                    buttonName: 'Mang Đi',
                    className: 'btn btn-success',
                    iconClass: 'fa fa-shopping-bag',
                    tooltipTitle: 'Mang Đi',
                    disabled(item) {
                        // if((item.name === 'Mì Tỏi' || item.name === 'Cơm Vò') &&  !item._hightLight) {
                        //     return false;
                        // } else {
                        //     return true;
                        // }
                        return false;
                    },
                    action(item, ev) {
                        item['takeAway'] = !item['takeAway'];
                    }
                }
            ],
            trClick: function (item) {
                //getDetail(item);
            }
        };
        vm.configBillListTable = {
            arrayColumnLabel: ['Số chờ', 'Mang Đi', 'Giờ Đặt', 'Thanh Toán', 'Tổng', 'Hành Động'],
            arrayColumnContent: ['number', 'takeAway', 'id', 'status', {
                formatterBase: function(item) {
                    var price = getTotalViewBill(item.list);
                    return parseCerrency(price);
                }
            }],
            arrayActions: [
                {
                    buttonName: 'Xong',
                    className: 'btn btn-primary',
                    iconClass: 'fa fa-check-circle',
                    tooltipTitle: 'Xong',
                    action(item) {
                        doneBill(item);
                    }
                },
                {
                    buttonName: 'Hủy',
                    className: 'btn btn-danger',
                    iconClass: 'fa fa-remove',
                    tooltipTitle: 'Hủy',
                    action(item, ev) {
                        cancelBill(item);
                    }
                }
            ],
            trClick: function (item) {
                vm.billSelected = item;
                showDetail();
                console.log(item);
            }
        };
        vm.configTableForViewBill = {
            arrayColumnLabel: ['Sản Phẩm', 'Số Lượng', 'Giá', 'Ưu Đãi', ''],
            arrayColumnContent: ['name', 'selectedQuantity', {
                formatterBase: function(item) {
                    var price = item['selectedQuantity'] * item['price'];
                    return parseCerrency(price);
                }
            },
            {
                formatterBase: function(product) {
                    var item = angular.copy(product);
                    // if(item['productStatus'] === 'bestseller') {
                    //     var productPrice = getDiscount20Percent(item);
                    //     var price = item['selectedQuantity'] * productPrice;
                    //     return '-20%:' + parseCerrency(price);
                    // } else if ((item.name === 'Mì Tỏi' || item.name === 'Cơm Vò') && !item['_hightLight']) {
                    //     return 'Ưu Đãi';
                    // } else if(item['_hightLight']) {
                    //     return 'Tặng';
                    // }
                    if(item['_hightLight']) {
                        return 'Tặng';
                    }
                }
            }]
        };

        vm.parseCerrency = parseCerrency;
        vm.addToBill = addToBill;
        vm.hasResult = hasResult;
        vm.hasListBillResult = hasListBillResult;
        vm.getTotal = getTotal;
        vm.isShowDetail = isShowDetail;
        vm.addToGift = addToGift;
        vm.getTotalViewBill = getTotalViewBill;

        activate();

        ////////////////

        function activate() {
            getAllFoods();
            $timeout(function() {
                $rootScope.hideNavBar(); 
            })
        }

        function getAllFoods() {
            return ProductService.getAllProducts()
                .then(function (response) {
                    var data = response.data;
                    vm.count = data.count;
                    vm.products = data.products;
                    angular.forEach(vm.products, function(item) {
                        var itemCopy = angular.copy(item);
                        if(itemCopy['productStatus'] === 'prominentest') {
                            vm.productsForGilfs.push(itemCopy);
                        }
                    })
                }, function (error) {
                    console.log(error)
                })
        }

        function parseCerrency(price) {
            return parseInt(price).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
        }

        function addToBill(product) {
            var existingList = false;
            angular.forEach(vm.billData, function(item) {
                if(item.productId === product.productId) {
                    item.selectedQuantity = item.selectedQuantity + 1;
                    existingList = true;
                }
            })
            if(!existingList) {
                product.selectedQuantity = 1;
                vm.billData.push(angular.copy(product));
            }
        }

        function hasResult() {
            return !!vm.billData.length > 0;
        }

        function hasListBillResult() {
            return !!vm.billByDayDataList.length > 0;
        }

        function getTotal() {
            var total = 0;
            angular.forEach(vm.billData, function(product) {
                var price = product['price'];
                // if(product['productStatus'] === 'bestseller') {
                //     price = getDiscount20Percent(product);
                // }
                var priceOfProduct = product['selectedQuantity'] * price;
                if(product['takeAway']) {
                    priceOfProduct = priceOfProduct + (product['selectedQuantity'] * 3000);
                }
                total = total + priceOfProduct;
                // if((product['name'] === 'Mì Tỏi' || product['name'] === 'Cơm Vò') && !product._hightLight) {
                //     if(vm.takingPrice) {
                //         total = total + (vm.takingPrice * product['selectedQuantity']);
                //     }
                // } else if(product['name'] === 'Combo 1') {
                //     if(vm.takingPrice) {
                //         total = total + (3000 * product['selectedQuantity']);
                //     }
                // } else if(product['name'] === 'Combo 2') {
                //     if(vm.takingPrice) {
                //         total = total + (6000 * product['selectedQuantity']);
                //     }
                // } else if(product['name'] === 'Combo 3') {
                //     if(vm.takingPrice) {
                //         total = total + (9000 * product['selectedQuantity']);
                //     }
                // }
            });
            return parseCerrency(total);
        }

        function refresh() {
            vm.billData.length = 0;
            vm.configButtonHeaderCheckout.arrayModel['searchText'] = '';
            vm.taking = 'noTake';
            vm.takingPrice = 0;
        }

        function increase(item) {
            addToBill(item);
        }

        function reduction(product) {
            angular.forEach(vm.billData, function(item, index) {
                if(item.productId === product.productId) {
                    if(item.selectedQuantity > 0) {
                        item.selectedQuantity = item.selectedQuantity - 1;
                    } else {
                        vm.billData.splice(index, 1); 
                    }
                }
            })
        }

        function checkout() {
            if(vm.ticketNumber) {
                var requestBody = checkoutService.parserAddData(vm.ticketNumber, vm.billData, vm.taking);
                checkoutService.addBillInDay(requestBody)
                    .then(function(response) {
                        var data = response.data;
                        if(data.status === 'success') {
                            toastr.success('Thêm đơn hàng thành công');
                            refresh();
                        } else {
                            toastr.error('Thêm đơn hàng thất bại.');
                        }
                    }, function(error) {
                        console.log(error);
                        toastr.error('Thêm đơn hàng thất bại.');
                    }).finally(function() {
    
                    })
            } else {
                toastr.info('Vui lòng nhập phiếu chờ.');
            }
        }

        function viewCheckoutList() {
            var today = new Date();
            var date = today.toISOString().slice(0, 10);
            checkoutService.getBillByday(date)
                .then(function(response) {
                    var data = response.data;
                    var indexItem = 0;
                    if(data.status === 'success') {
                        vm.billByDayData = data.data;
                        vm.billByDayDataList = [];
                        angular.forEach(vm.billByDayData, function(value, key) {
                            indexItem = indexItem + 1;
                            value.numberIndex = indexItem
                            vm.billByDayDataList.push(value);
                        });
                        vm.billByDayDataList.reverse();
                        hideDetail();
                        $('#view-checkout-list').modal('show');
                    } else {
                        toastr.error('Lấy dữ liệu thất bại.');
                    }
                }, function(error) {
                    toastr.error('Lấy dữ liệu thất bại.');
                })
        }

        function isShowDetail() {
            return (vm.classForDetail !== '') ? true : false;
        };

        function showDetail () {
            vm.classForTable = 'width-70';
            vm.classForDetail = 'width-30';
        };

        function hideDetail() {
            vm.classForTable = 'full-width';
            vm.classForDetail = '';
        };

        function takeGift(product){
            $('#select-gift ').modal('show');
        };

        function getDiscount20Percent(product) {
            if(product['productStatus'] === 'bestseller') {
                return product.price * 0.8; 
            }
            return product.price;
        };

        function addToGift(product) {
            var today = new Date();
            var date = today.toISOString().slice(0, 10);
            var time = today.getHours() + "h-" + today.getMinutes() + "m-" + today.getSeconds() + 's';
            var cloneProduct = angular.copy(product);
            cloneProduct.productId = date + time; 
            cloneProduct.price = 0;
            cloneProduct.selectedQuantity = 1;
            cloneProduct._hightLight = true;
            vm.billData.push(cloneProduct);
            $('#select-gift ').modal('hide');
        };

        function doneBill(bill) {
            var requestBody = checkoutService.parseDataUpdateBill(bill, 'Done');
            checkoutService.updateBillInDayStatus(requestBody)
                .then(function(response) {
                    var data = response.data;
                    if(data.status === 'success') {
                        toastr.success('Cập nhật thành công.');
                    } else {
                        toastr.error('Cập nhật thất bại.');
                    }
                }, function(error) {
                    console.log(error);
                    toastr.error('Cập nhật thất bại.');
                })
        }

        function cancelBill(bill) {

        }

        function getTotalViewBill(list) {
            var total = 0;
            angular.forEach(list, function(product) {
                var price = product['price'];
                // if(product['productStatus'] === 'bestseller') {
                //     price = getDiscount20Percent(product);
                // }
                var priceOfProduct = product['selectedQuantity'] * price;
                if(product['takeAway']) {
                    priceOfProduct = priceOfProduct + (product['selectedQuantity'] * 3000);
                }
                total = total + priceOfProduct;
                // if((product['name'] === 'Mì Tỏi' || product['name'] === 'Cơm Vò') && !product._hightLight) {
                //     if(vm.takingPrice) {
                //         total = total + (vm.takingPrice * product['selectedQuantity']);
                //     }
                // } else if(product['name'] === 'Combo 1') {
                //     if(vm.takingPrice) {
                //         total = total + (3000 * product['selectedQuantity']);
                //     }
                // } else if(product['name'] === 'Combo 2') {
                //     if(vm.takingPrice) {
                //         total = total + (6000 * product['selectedQuantity']);
                //     }
                // } else if(product['name'] === 'Combo 3') {
                //     if(vm.takingPrice) {
                //         total = total + (9000 * product['selectedQuantity']);
                //     }
                // }
            });
            return parseCerrency(total);
        }

        $scope.$watch('vm.taking', function(newValue, oldValue) {
            if(newValue === 'noTake') {
                vm.takingPrice = 0;
            } else {
                vm.takingPrice = 3000; // Phí phụ thu
            }
        });

        $scope.$on("$destroy", function() {
            $timeout(function() {
                $rootScope.showNavBar();
            })
        });

    }
})();