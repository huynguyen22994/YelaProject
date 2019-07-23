(function() {
    'use strict';

    angular
        .module('YelaApplication.Statistic')
        .controller('StatisticBillController', ControllerController);

    ControllerController.$inject = ['$scope', 'toastr', '$rootScope', '$timeout', 'StatisticService'];
    function ControllerController($scope, toastr, $rootScope, $timeout, StatisticService) {
        var vm = this;
        // var percent = 100000;
        var percent = 30000;
        vm.showChart = false;
        vm.billList = [];
        vm.lineChartData = [];
        vm.lineChartConfig = {
            svgWidth: 1100
        };
        vm.configTable = {
            arrayColumnLabel: ['Ngày', 'Doanh Thu', ''],
            arrayColumnContent: [
                {
                    formatterBase: function(item) {
                        var keys = Object.keys(item);
                        return keys[0];
                    }
                },  {
                    formatterBase: function(item) {
                        var total = item['totalMoney'];
                        return parseCerrency(total);
                    }
                }],
            trClick: function (item) {
                //getDetail(item);
            }
        };
        vm.configButtonHeader = {
            arrayButton: [
                {
                    buttonName: 'button_refresh',
                    className: 'btn btn-default pull-left',
                    iconClass: 'fa fa-refresh',
                    tooltipTitle: 'tooltip_refresh',
                    action() {
                        getAllBillDays();
                    }
                }
            ],
            arrayInput: [
                // {
                //     className: 'form-control',
                //     modelName: 'searchText',
                //     modelOptions: { debounce: 500},
                //     placeholder: 'button_search',
                //     tooltipTitle: 'tooltip_search_song',
                //     change(Input) {
                //         search(Input);
                //     }
                // }
            ]
        };
        vm.configButtonHeaderLineChart = {
            arrayButton: [
                {
                    buttonName: 'button_refresh',
                    className: 'btn btn-default pull-left',
                    iconClass: 'fa fa-bar-chart-o fa-fw',
                    tooltipTitle: 'Xem Biểu Đồ',
                    action() {
                        vm.showChart = !vm.showChart;
                    }
                },
                {
                    buttonName: 'button_refresh',
                    className: 'btn btn-default pull-left',
                    iconClass: 'fa fa-refresh',
                    tooltipTitle: 'tooltip_refresh',
                    action() {
                        vm.showChart = false;
                        vm.lineChartData.length = 0;
                        getAllBillDays().then(function() {
                            vm.showChart = true;
                        })
                    }
                }
            ],
            arrayInput: [
                // {
                //     className: 'form-control',
                //     modelName: 'searchText',
                //     modelOptions: { debounce: 500},
                //     placeholder: 'button_search',
                //     tooltipTitle: 'tooltip_search_song',
                //     change(Input) {
                //         search(Input);
                //     }
                // }
            ]
        };
        vm.hasResult = hasResult;
        vm.getTotalRevenue = getTotalRevenue;

        initialize();
        ////////////////////////
        function initialize() {
            getAllBillDays();
        }

        function getAllBillDays() {
            return StatisticService.api.getAllBillDays()
                .then(function(response) {
                    var billList = _.get(response, 'data.billList');
                    vm.billList = billList;
                    assignTotalBill(vm.billList);
                    vm.billList = _.sortBy(vm.billList, [function(o) { return Object.keys(o)[0]; }]);
                }, function(error) {
                }).finally(function() {
                    formatLineChartData(vm.billList);
                })
        }

        function assignTotalBill(billList) {
            angular.forEach(billList, function(billDay, index) {
                var totalMoney = 0;
                angular.forEach(billDay, function(billInDayObj, key) {
                    angular.forEach(billInDayObj, function(bill, key) {
                        var list = _.get(bill, 'list');
                        var total = getTotalBill(list) || 0;
                        totalMoney = totalMoney + total;
                    })
                })
                billDay['totalMoney'] = totalMoney;
            })
        }

        function hasResult() {
            return vm.billList.length > 0;
        }

        function getDiscount20Percent(product) {
            if(product['productStatus'] === 'bestseller') {
                return product.price * 0.8; 
            }
            return product.price;
        };

        function getTotalBill(list) {
            var total = 0;
            angular.forEach(list, function(product) {
                var price = product['price'];
                if(product['productStatus'] === 'bestseller') {
                    price = getDiscount20Percent(product);
                }
                var priceOfProduct = product['selectedQuantity'] * price;
                total = total + priceOfProduct;
                if((product['name'] === 'Mì Tỏi' || product['name'] === 'Cơm Vò') && !product._hightLight) {
                    if(vm.takingPrice) {
                        total = total + (vm.takingPrice * product['selectedQuantity']);
                    }
                } else if(product['name'] === 'Combo 1') {
                    if(vm.takingPrice) {
                        total = total + (3000 * product['selectedQuantity']);
                    }
                } else if(product['name'] === 'Combo 2') {
                    if(vm.takingPrice) {
                        total = total + (6000 * product['selectedQuantity']);
                    }
                } else if(product['name'] === 'Combo 3') {
                    if(vm.takingPrice) {
                        total = total + (9000 * product['selectedQuantity']);
                    }
                }
            });
            return total;
        }

        function parseCerrency(price) {
            return parseInt(price).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
        }

        function getTotalRevenue(billList) {
            var total = 0;
            angular.forEach(billList, function(bill) {
                total = total + bill['totalMoney'];
            })
            return parseCerrency(total);
        }

        function formatLineChartData(billList) {
            angular.forEach(billList, function(billData) {
                vm.lineChartData.push({
                    name : Object.keys(billData)[0],
                    value : billData['totalMoney']/percent,
                    color : "#ef4e3a",
                    label: Object.keys(billData)[0]
                });
            })
            vm.lineChartData = _.sortBy(vm.lineChartData, [function(o) { return o.name; }]);
        }
    }
})();