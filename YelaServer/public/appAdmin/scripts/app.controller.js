(function() {
    'use strict';

    angular
        .module('YelaApplication')
        .controller('IndexController', ControllerController);

    ControllerController.$inject = ['ylConstant', 'adminInfo', '$rootScope', 'socket', 'ylBillNotice', 'BillService', '$http', 'NotifyPackage', 'Notify', 'LetterNotify', 'MailService'];
    function ControllerController(ylConstant, adminInfo, $rootScope, socket, ylBillNotice, BillService, $http, NotifyPackage, Notify, LetterNotify, MailService) {
        var vm = this;
        vm.navBarConfig = {
            appTitle: ylConstant.appTitle,
            menus: ylConstant.ylAppMenu,
            setting: [
                
            ]
        };
        $rootScope.mailModal = {
            headerTitle: '',
            contentMsg: '',
            email: '',
            phone: '',
            show: function() {
                angular.element('#mailModal').modal('show');
            },
            hide: function() {
                angular.element('#mailModal').modal('hide');
            },
            toggle: function() {
                angular.element('#mailModal').modal('toggle');
            },
            closeCallback: function() {
                $location.path('/');
            }
        };

        vm.adminInfo = adminInfo;
        vm.logout = logout;
        vm.viewLetter = viewLetter;

        activate();

        ////////////////

        function activate() { 
            $rootScope.NewBills = new ylBillNotice();
            $rootScope.LetterNotify = new LetterNotify();
            vm.spinnerHide = true;  
            $rootScope.adminInfo = adminInfo;  
            loadNewBill();
            exeGetCustomerOnl();
            exeGetLetterNotify();
            setInterval(function() {
                exeGetCustomerOnl();
            }, 5000);
        }

        function logout() {
            $http({
                url: '/api/administrator/logout',
                method: 'GET'
            }).then(function (res) {
                window.localStorage.clear(); 
                var data = res.data;
                if(data.logout) {
                    window.location.href = '/login.html';
                }
            }).catch(function (err) {
                console.log(err);
            });
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

        function exeGetLetterNotify() {
            getLetterNotify().then(function(response) {
                var letterNotifyData = response.data || {};
                if(letterNotifyData.count > 0) {
                    $rootScope.LetterNotify.updateCount(letterNotifyData.count);
                    $rootScope.LetterNotify.updateLetters(letterNotifyData.rows);
                } else {
                    $rootScope.LetterNotify.updateCount(0);
                    $rootScope.LetterNotify.updateLetters([]);
                }
            })
        }

        function getLetterNotify() {
            return $http({
                url: '/api/letter/notify',
                method: 'GET'
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        }

        function viewLetter(item) {
            $rootScope.mailModal.headerTitle = item.name;
            $rootScope.mailModal.contentMsg = item.message;
            $rootScope.mailModal.email = item.email;
            $rootScope.mailModal.phone = item.phone;
            $rootScope.mailModal.show();
            if(item.status === 'unreaded') {
                var requestBody = MailService.helper.parseReadLetterBody(item);
                MailService.readMail(requestBody)
                    .then(function(response) {
                        var data = response.data;
                        if(data.isSuccess) {
                            $rootScope.$emit('updateLetterNotify');
                        }
                    }, function(error) {
                        console.log(error);
                    });
            }
        };

        $rootScope.$on('updateLetterNotify', function() {
            exeGetLetterNotify();
        });

    }
})();