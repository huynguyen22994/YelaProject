(function() {
    'use strict';

    angular
        .module('YelaApplication')
        .controller('IndexController', ControllerController);

    ControllerController.$inject = ['ylConstant', 'adminInfo', '$rootScope', 'socket', 'ylBillNotice', 'BillService', '$http'];
    function ControllerController(ylConstant, adminInfo, $rootScope, socket, ylBillNotice, BillService, $http) {
        var vm = this;
        vm.navBarConfig = {
            appTitle: ylConstant.appTitle,
            menus: ylConstant.ylAppMenu,
            setting: [
                
            ]
        };
        vm.adminInfo = adminInfo;
        vm.logout = logout;

        activate();

        ////////////////

        function activate() { 
            $rootScope.NewBills = new ylBillNotice();
            vm.spinnerHide = true;  
            $rootScope.adminInfo = adminInfo;  
            loadNewBill();
            exeGetCustomerOnl();
            setInterval(function() {
                exeGetCustomerOnl();
            }, 5000);
        }

        function logout() {
            window.localStorage.clear(); 
            window.location.href = '/login.html';
        }

        function loadNewBill() {
            BillService.getBillWithStatus('new')
            .then(function (res) {
                $rootScope.NewBills.concatBill(res.data.bills);
            }).catch(function (err) {
                console.log(err);
            });
        }

        socket.on('onNewBill', function(newBill) {
            $rootScope.NewBills.addBill(newBill);
        })

        function exeGetCustomerOnl() {
            getCustomerOnl().then(function(response) {
                $rootScope.customerAccessNumber = response.data.countOnline;
            }).finally(function() {

            });
        }

        function getCustomerOnl() {
            return $http({
                url: 'api/user/online',
                method: 'GET'
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        }

    }
})();